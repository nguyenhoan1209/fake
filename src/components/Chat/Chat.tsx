import React, { useState, useRef, useEffect } from 'react';
import { Card, Typography, Empty, Spin, Divider } from 'antd';
import ChatInput from './ChatInput';
import ChatMessage, { type ChatMessageData, type MessageAttachment } from './ChatMessage';
import './Chat.scss';

const { Title } = Typography;

interface ChatProps {
  title?: string;
  messages?: ChatMessageData[];
  loading?: boolean;
  onSendMessage?: (message: string, attachments?: File[]) => void;
  onSendVoiceMessage?: (audioBlob: Blob) => void;
  onDownloadAttachment?: (attachment: MessageAttachment) => void;
  currentUserId?: string;
}

const Chat: React.FC<ChatProps> = ({
  title = 'Chat',
  messages = [],
  loading = false,
  onSendMessage,
  onSendVoiceMessage,
  onDownloadAttachment,
  currentUserId = 'current-user',
}) => {
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (message: string, attachments?: File[]) => {
    if (onSendMessage) {
      onSendMessage(message, attachments);
    }
  };

  const handleSendVoiceMessage = (audioBlob: Blob) => {
    if (onSendVoiceMessage) {
      onSendVoiceMessage(audioBlob);
    }
  };

  const handlePlayAudio = (attachment: MessageAttachment) => {
    // Stop any currently playing audio
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }

    // Create new audio element and play
    const audio = new Audio(attachment.url);
    audio.play().catch(console.error);
    setAudioElement(audio);

    // Clean up when audio ends
    audio.onended = () => {
      setAudioElement(null);
    };
  };

  const handleDownloadAttachment = (attachment: MessageAttachment) => {
    if (onDownloadAttachment) {
      onDownloadAttachment(attachment);
    } else {
      // Default download behavior
      const link = document.createElement('a');
      link.href = attachment.url;
      link.download = attachment.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Process messages to add isOwn property

  const processedMessages = messages.map((message) => ({
    ...message,
    isOwn: message.isOwn ?? (message.sender.id === currentUserId),
  }));

  return (
    <div className="chat-container">
      <Card className="chat-card">
        <div className="chat-header">
          <Title level={4} style={{ margin: 0 }}>
            {title}
          </Title>
        </div>

        <Divider style={{ margin: '12px 0' }} />

        <div className="chat-messages">
          {loading ? (
            <div className="chat-loading">
              <Spin size="large" />
            </div>
          ) : processedMessages.length === 0 ? (
            <Empty description="No messages yet" style={{ padding: '40px 0' }} />
          ) : (
            <div className="messages-list">
              {processedMessages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  onDownloadAttachment={handleDownloadAttachment}
                  onPlayAudio={handlePlayAudio}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <ChatInput
          onSendMessage={handleSendMessage}
          onSendVoiceMessage={handleSendVoiceMessage}
          disabled={loading}
          placeholder="Type your message..."
        />
      </Card>
    </div>
  );
};

export default Chat;
