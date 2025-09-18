import React from 'react';
import { Avatar, Card, Typography, Button } from 'antd';
import { DownloadOutlined, PlayCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import './ChatMessage.scss';

const { Text, Paragraph } = Typography;

export interface MessageAttachment {
  id: string;
  name: string;
  type: 'image' | 'file' | 'audio';
  url: string;
  size?: number;
}

export interface ChatMessageData {
  id: string;
  content: string;
  timestamp: Date;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  attachments?: MessageAttachment[];
  isOwn?: boolean;
}

interface ChatMessageProps {
  message: ChatMessageData;
  onDownloadAttachment?: (attachment: MessageAttachment) => void;
  onPlayAudio?: (attachment: MessageAttachment) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onDownloadAttachment, onPlayAudio }) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderAttachment = (attachment: MessageAttachment) => {
    switch (attachment.type) {
      case 'image':
        return (
          <div key={attachment.id} className="attachment-image">
            <img
              src={attachment.url}
              alt={attachment.name}
              style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '8px' }}
            />
          </div>
        );

      case 'audio':
        return (
          <div key={attachment.id} className="attachment-audio">
            <Card size="small">
              <div className="audio-controls">
                <Button type="text" icon={<PlayCircleOutlined />} onClick={() => onPlayAudio?.(attachment)} />
                <span className="audio-name">{attachment.name}</span>
                <Button type="text" icon={<DownloadOutlined />} onClick={() => onDownloadAttachment?.(attachment)} />
              </div>
            </Card>
          </div>
        );

      case 'file':
      default:
        return (
          <div key={attachment.id} className="attachment-file">
            <Card size="small">
              <div className="file-info">
                <span className="file-name">{attachment.name}</span>
                {attachment.size && (
                  <Text type="secondary" className="file-size">
                    {formatFileSize(attachment.size)}
                  </Text>
                )}
                <Button type="text" icon={<DownloadOutlined />} onClick={() => onDownloadAttachment?.(attachment)} />
              </div>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className={`chat-message ${message.isOwn ? 'own-message' : 'other-message'}`}>
      {!message.isOwn && (
        <Avatar src={message.sender.avatar} className="message-avatar">
          {message.sender.name.charAt(0).toUpperCase()}
        </Avatar>
      )}

      <div className="message-content">
        {!message.isOwn && (
          <div className="message-header">
            <Text strong className="sender-name">
              {message.sender.name}
            </Text>
            <Text type="secondary" className="message-time">
              {dayjs(message.timestamp).format('HH:mm')}
            </Text>
          </div>
        )}

        <div className={`message-bubble ${message.isOwn ? 'own-bubble' : 'other-bubble'}`}>
          {message.content && (
            <Paragraph className="message-text" style={{ marginBottom: 0 }}>
              {message.content}
            </Paragraph>
          )}

          {message.attachments && message.attachments.length > 0 && (
            <div className="message-attachments">{message.attachments.map(renderAttachment)}</div>
          )}
        </div>

        {message.isOwn && (
          <div className="message-time-own">
            <Text type="secondary" className="message-time">
              {dayjs(message.timestamp).format('HH:mm')}
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
