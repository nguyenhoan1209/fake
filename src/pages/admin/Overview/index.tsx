import type { FC } from 'react';
import { useState } from 'react';
import { useFetchStreams } from 'libs/hooks';
import { useFetchTopics } from 'libs/hooks';
import { Col, List, Typography, Spin, Empty, Row, message } from 'antd';
import { Chat, type ChatMessageData } from 'components/Chat';
import './index.scss';

const { Title } = Typography;

interface Stream {
  stream_id: string;
  name: string;
}

const OverviewPage: FC = () => {
  const [streamId, setStreamId] = useState<number | null>(null); // No initial API call
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: topics, isLoading: topicLoad, refetch } = useFetchTopics(streamId); // Only fetch when streamId is not null
  const { data: streams, isLoading } = useFetchStreams();
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<any | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessageData[]>([
    {
      id: '1',
      content: 'Welcome to the chat! How can I help you today?',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      sender: {
        id: 'system',
        name: 'System',
        avatar: undefined,
      },
    },
    {
      id: '2',
      content: 'Hello! I need help with my account setup.',
      timestamp: new Date(Date.now() - 1000 * 60 * 3), // 3 minutes ago
      sender: {
        id: 'current-user',
        name: 'You',
      },
    },
  ]);

  const handleSendMessage = (messageContent: string, attachments?: File[]) => {
    const newMessage: ChatMessageData = {
      id: Date.now().toString(),
      content: messageContent,
      timestamp: new Date(),
      sender: {
        id: 'current-user',
        name: 'You',
      },
      attachments: attachments?.map((file, index) => ({
        id: `${Date.now()}-${index}`,
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : 'file',
        url: URL.createObjectURL(file),
        size: file.size,
      })),
    };

    setChatMessages((prev) => [...prev, newMessage]);

    // Simulate response after a delay
    setTimeout(() => {
      const responseMessage: ChatMessageData = {
        id: (Date.now() + 1).toString(),
        content: `Thanks for your message: "${messageContent}". How else can I assist you?`,
        timestamp: new Date(),
        sender: {
          id: 'assistant',
          name: 'Assistant',
          avatar: undefined,
        },
      };
      setChatMessages((prev) => [...prev, responseMessage]);
    }, 1000);
  };

  const handleSendVoiceMessage = (audioBlob: Blob) => {
    const audioUrl = URL.createObjectURL(audioBlob);
    const voiceMessage: ChatMessageData = {
      id: Date.now().toString(),
      content: '',
      timestamp: new Date(),
      sender: {
        id: 'current-user',
        name: 'You',
      },
      attachments: [
        {
          id: `voice-${Date.now()}`,
          name: 'Voice Message',
          type: 'audio',
          url: audioUrl,
          size: audioBlob.size,
        },
      ],
    };

    setChatMessages((prev) => [...prev, voiceMessage]);
    message.success('Voice message sent!');
  };

  const handleStreamSelect = (stream: Stream) => {
    setSelectedStream(stream);
    setStreamId(Number(stream.stream_id));
    
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
          <Title level={3} style={{ marginTop: 16 }} >Topic</Title>
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
            messages={chatMessages}
            onSendMessage={handleSendMessage}
            onSendVoiceMessage={handleSendVoiceMessage}
            currentUserId="current-user"
          />
        </Col>
      </Row>
    </>
  );
};

export default OverviewPage;
