import type { FC } from 'react';
import { useState } from 'react';
import { useFetchStreams, useFetchTopics, useFetchMessages } from 'libs/hooks';
import { Col, List, Typography, Spin, Empty, Row } from 'antd';
import { Chat } from 'components/Chat';
import './index.scss';

const { Title } = Typography;

interface Stream {
  stream_id: string;
  name: string;
}

const OverviewPage: FC = () => {
  const [streamId, setStreamId] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: topics, isLoading: topicLoad } = useFetchTopics(streamId); // Only fetch when streamId is not null
  const { data: streams, isLoading } = useFetchStreams();
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<any | null>(null);
  const { data: messages = [], isLoading: messageLoad } = useFetchMessages(streamId || undefined, selectedTopic?.name); // Fetch messages based on selected stream and topic

  const handleStreamSelect = (stream: Stream) => {
    setSelectedStream(stream);
    setStreamId(Number(stream.stream_id));
    setSelectedTopic(null);
  };

  return (
    <>
      <Title level={3}>Chat</Title>
      <Row gutter={16}>
        <Col span={5}>
          {isLoading ? (
            <Spin />
          ) : streams?.streams?.length ? (
            <List
              bordered
              dataSource={streams.streams}
              renderItem={(stream: Stream) => (
                <List.Item
                  key={stream.stream_id}
                  onClick={() => handleStreamSelect(stream)}
                  style={{ cursor: 'pointer' }}
                  className={selectedStream?.stream_id === stream.stream_id ? 'selected' : ''}
                >
                  {stream.name}
                </List.Item>
              )}
            />
          ) : (
            <Empty description="No streams available" />
          )}
          <Title level={3} style={{ marginTop: 16 }}>
            Topic
          </Title>
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={18}>
              {topicLoad ? (
                <Spin />
              ) : topics?.topics?.length ? (
                <List
                  bordered
                  dataSource={topics?.topics}
                  renderItem={(topic: any) => (
                    <List.Item
                      key={topic.max_id}
                      className={selectedTopic?.max_id === topic.max_id ? 'selected' : ''}
                      onClick={() => setSelectedTopic(topic)}
                      style={{ cursor: 'pointer' }}
                    >
                      {topic.name}
                    </List.Item>
                  )}
                />
              ) : (
                <Empty description="No Topics available" />
              )}
            </Col>
          </Row>
        </Col>

        <Col span={16}>
          <Chat
            title={
              selectedTopic
                ? `Topic: ${selectedTopic.name}`
                : selectedStream
                  ? `Chat: ${selectedStream.name}`
                  : 'Select a stream to start chatting'
            }
            messages={messages}
            loading={messageLoad}
            currentUserId="current-user"
            onSendMessage={(message, attachments) => {
              console.log('Sending message:', message, attachments);
              // TODO: Implement send message API
            }}
            onSendVoiceMessage={(audioBlob) => {
              console.log('Sending voice message:', audioBlob);
              // TODO: Implement send voice message API
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default OverviewPage;
