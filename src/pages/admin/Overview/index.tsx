import type { FC } from 'react';
import { useState, useEffect } from 'react';
import {
  useFetchStreams,
  useFetchTopics,
  useFetchMessages,
  useSendMessage,
  useFetchRegisterData,
  usePollingEvent,
} from 'libs/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { Col, List, Typography, Spin, Empty, Row } from 'antd';
import { Chat } from 'components/Chat';
import './index.scss';
import { useAppSelector } from 'hooks/useAppSelector';

const { Title } = Typography;

interface Stream {
  stream_id: string;
  name: string;
}

interface Topic {
  max_id: string;
  name: string;
}

const OverviewPage: FC = () => {
  const queryClient = useQueryClient();
  const [streamId, setStreamId] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: topics, isLoading: topicLoad } = useFetchTopics(streamId); // Only fetch when streamId is not null
  const { data: streams, isLoading } = useFetchStreams();
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const { data: initialMessages = [], isLoading: messageLoad } = useFetchMessages(
    streamId || undefined,
    selectedTopic?.name,
  );
  const [messages, setMessages] = useState(initialMessages);
  const { mutateAsync: sendMessage } = useSendMessage();
  const currentUserId = useAppSelector((state) => state.user.profile?.user_id?.toString?.()) as string | undefined;
  const { data: registerData } = useFetchRegisterData();
  const { data: events } = usePollingEvent(-1, registerData?.queue_id);

  // Update local messages when initial messages change
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  // Handle incoming message events
  useEffect(() => {
    if (events?.events && Array.isArray(events.events)) {
      events.events.forEach((event) => {
        if (event.type === 'message' && event.message) {
          const newMessage = event.message ;

          // Check if the message belongs to the current stream and topic
          const isCurrentStream = selectedStream && newMessage.stream_id === Number(selectedStream.stream_id);
          const isCurrentTopic = selectedTopic && newMessage.subject === selectedTopic.name;

          if (isCurrentStream && isCurrentTopic) {
            // Transform the message to ChatMessageData format
            const chatMessage: ChatMessageData = {
              id: newMessage.id.toString(),
              content: newMessage.content,
              timestamp: new Date(newMessage.timestamp * 1000),
              sender: {
                id: newMessage.sender_id.toString(),
                name: newMessage.sender_full_name,
                avatar: newMessage.avatar_url,
              },
              attachments: [],
            };

            // Add the new message to the list if it doesn't already exist
            setMessages((prevMessages) => {
              const messageExists = prevMessages.some((msg) => msg.id === chatMessage.id);
              if (!messageExists) {
                return [...prevMessages, chatMessage];
              }
              return prevMessages;
            });
          }
        }
      });
    }
  }, [events, selectedStream, selectedTopic]);

  const handleStreamSelect = (stream: Stream) => {
    setSelectedStream(stream);
    setStreamId(Number(stream.stream_id));
    setSelectedTopic(null);
  };

  const handleSendMessage = async (new_message: string) => {
    if (!new_message || !selectedTopic) return;
    try {
      const formData = new FormData();
      formData.append('type', 'stream');
      formData.append('content', new_message);
      formData.append('to', selectedStream?.stream_id || '');
      formData.append('topic', selectedTopic.name);
      // Call the sendMessage mutation
      await sendMessage(formData);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleEmojiReaction = (messageId: string, emoji: string) => {
    console.log(`Emoji reaction: ${emoji} on message ${messageId}`);
    console.log('Current messages:', messages);
    // Refresh messages after reaction
    queryClient.invalidateQueries({ queryKey: ['messages', streamId, selectedTopic?.name] });
  };

  const handleRemoveReaction = (messageId: string, emoji: string) => {
    console.log(`Remove reaction: ${emoji} from message ${messageId}`);
    // Refresh messages after removing reaction
    queryClient.invalidateQueries({ queryKey: ['messages', streamId, selectedTopic?.name] });
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
              className="streams-list"
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
                  renderItem={(topic: Topic) => (
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
            currentUserId={currentUserId || 'current-user'}
            onSendMessage={(message) => handleSendMessage(message)}
            onEmojiReaction={handleEmojiReaction}
            onRemoveReaction={handleRemoveReaction}
          />
        </Col>
      </Row>
    </>
  );
};

export default OverviewPage;
