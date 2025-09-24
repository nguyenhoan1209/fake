import type { FC } from 'react';
import React, { useState, useEffect, useMemo } from 'react';
import {
  useFetchStreams,
  useFetchTopics,
  useFetchMessages,
  useSendMessage,
  useFetchRegisterData,
  usePollingEvent,
  usePinTopic,
  useUnpinTopic,
} from 'libs/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { Col, List, Typography, Spin, Empty, Row, Button } from 'antd';
import { Pin, PinOff } from 'lucide-react';
import { Chat } from 'components/Chat';
import { ChatMessageData } from 'components/Chat/ChatMessage';
import './index.scss';
import { useAppSelector } from 'hooks/useAppSelector';

const { Title } = Typography;

interface Stream {
  stream_id: string;
  name: string;
}

interface StreamsResponse {
  streams: Stream[];
}

interface Topic {
  max_id: string;
  name: string;
  is_pinned?: boolean;
  pin_order?: number | null;
  pinned_at?: string | null;
}

const OverviewPage: FC = () => {
  const queryClient = useQueryClient();
  const [streamId, setStreamId] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: topics, isLoading: topicLoad } = useFetchTopics(streamId); // Only fetch when streamId is not null
  const { data: streams, isLoading } = useFetchStreams();
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const { data: initialMessages, isLoading: messageLoad } = useFetchMessages(
    streamId || undefined,
    selectedTopic?.name,
  );
  const [messages, setMessages] = useState(initialMessages);
  const { mutateAsync: sendMessage } = useSendMessage();
  const currentUserId = useAppSelector((state) => state.user.profile?.user_id?.toString?.()) as string | undefined;
  const { mutateAsync: pinTopic } = usePinTopic();
  const { mutateAsync: unpinTopic } = useUnpinTopic();
  
  // Temporary local state for UI (until backend is ready)
  const [pinnedTopics, setPinnedTopics] = useState<Set<string>>(new Set());
  const [pinOrder, setPinOrder] = useState<string[]>([]);
  const { data: registerData } = useFetchRegisterData();
  const { data: events } = usePollingEvent(-1, registerData?.queue_id);

  // Update local messages when initial messages change
  useEffect(() => {
    setMessages(initialMessages);
  }, [JSON.stringify(initialMessages)]);

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
              if (!prevMessages) return [chatMessage];
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

  const handleTogglePin = async (topic: Topic) => {
    // TODO: When backend is ready, use API calls
    // For now, use local state for UI demo
    
    setPinnedTopics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(topic.max_id)) {
        newSet.delete(topic.max_id);
      } else {
        newSet.add(topic.max_id);
      }
      return newSet;
    });

    // Update pin order
    setPinOrder(prev => {
      if (pinnedTopics.has(topic.max_id)) {
        // Unpin: remove from order
        return prev.filter(id => id !== topic.max_id);
      } else {
        // Pin: add to end of list
        return [...prev, topic.max_id];
      }
    });

    // TODO: Uncomment when backend is ready
    /*
    if (!streamId) return;
    
    try {
      if (topic.is_pinned) {
        await unpinTopic({ topicId: topic.max_id, streamId });
      } else {
        await pinTopic({ topicId: topic.max_id, streamId });
      }
    } catch (error) {
      console.error('Failed to toggle pin:', error);
    }
    */
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

  const handleDeleteMessage = (messageId: string) => {
    console.log(`🗑️ Delete message requested for ID: ${messageId}`);
    // The actual API call is handled by ChatMessage component via useDeleteMessage hook
    // We just need to refresh the messages list after deletion
    queryClient.invalidateQueries({ queryKey: ['messages', streamId, selectedTopic?.name] });
  };



  // Sắp xếp topics: pinned topics ở đầu theo thứ tự pin, unpinned topics ở sau
  const sortedTopics = useMemo(() => {
    if (!topics?.topics) return [];
    
    const topicList = [...topics.topics];
    
    return topicList.sort((a, b) => {
      // Use local state for now (TODO: use API data when backend is ready)
      const aIsPinned = pinnedTopics.has(a.max_id);
      const bIsPinned = pinnedTopics.has(b.max_id);
      
      // Nếu cả hai đều pinned hoặc cả hai đều không pinned
      if (aIsPinned === bIsPinned) {
        if (aIsPinned) {
          // Cả hai đều pinned: sắp xếp theo pin order (pin trước lên trên)
          const aIndex = pinOrder.indexOf(a.max_id);
          const bIndex = pinOrder.indexOf(b.max_id);
          return aIndex - bIndex;
        } else {
          // Cả hai đều không pinned: giữ thứ tự ban đầu từ API
          return 0;
        }
      }
      
      // Một cái pinned, một cái không: pinned lên trên
      return aIsPinned ? -1 : 1;
    });
  }, [topics?.topics, pinnedTopics, pinOrder]);

  return (
    <>
      <Title level={3}>Chat</Title>
      <Row gutter={16}>
        <Col span={5}>
          {isLoading ? (
            <Spin />
          ) : (streams as StreamsResponse)?.streams?.length ? (
            <List
              bordered
              dataSource={(streams as StreamsResponse).streams}
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
              ) : sortedTopics.length ? (
                <List
                  bordered
                  dataSource={sortedTopics}
                  renderItem={(topic: Topic) => {
                    const isTopicPinned = pinnedTopics.has(topic.max_id);
                    return (
                      <List.Item
                        key={topic.max_id}
                        className={selectedTopic?.max_id === topic.max_id ? 'selected' : ''}
                        style={{ cursor: 'pointer' }}
                        actions={[
                          <Button
                            key="pin"
                            type="text"
                            size="small"
                            icon={isTopicPinned ? <Pin size={16} /> : <PinOff size={16} />}
                            onClick={(e: React.MouseEvent) => {
                              e.stopPropagation(); // Prevent topic selection
                              handleTogglePin(topic);
                            }}
                            title={isTopicPinned ? 'Unpin topic' : 'Pin topic'}
                            style={{ 
                              color: isTopicPinned ? '#1890ff' : '#8c8c8c',
                              padding: '4px'
                            }}
                          />
                        ]}
                        onClick={() => setSelectedTopic(topic)}
                      >
                        <span>{topic.name}</span>
                      </List.Item>
                    );
                  }}
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
            onDeleteMessage={handleDeleteMessage}
          />
        </Col>
      </Row>
    </>
  );
};

export default OverviewPage;
