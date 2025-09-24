import React, { useState, useRef } from 'react';
import { Avatar, Card, Typography, Button } from 'antd';
import { DownloadOutlined, PlayCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import MessageContextMenu from './MessageContextMenu';
import './ChatMessage.scss';
import { useRemoveReaction, useDeleteMessage } from 'libs/hooks/api/useChat';

const { Text } = Typography;

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
  reactions?: Array<{
    emoji_name: string;
    emoji_code: string;
    reaction_type: string;
    user_id: number;
  }>;
}

interface ChatMessageProps {
  message: ChatMessageData;
  currentUserId?: number;
  onDownloadAttachment?: (attachment: MessageAttachment) => void;
  onPlayAudio?: (attachment: MessageAttachment) => void;
  onEmojiReaction?: (messageId: string, emoji: string) => void;
  onRemoveReaction?: (messageId: string, emoji: string) => void;
  onMessageAction?: (messageId: string, action: string) => void;
  onDeleteMessage?: (messageId: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  currentUserId,
  onDownloadAttachment,
  onPlayAudio,
  onEmojiReaction,
  onRemoveReaction,
  onMessageAction,
  onDeleteMessage,
}) => {
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const messageRef = useRef<HTMLDivElement>(null);
  const removeReactionMutation = useRemoveReaction();
  const deleteMessageMutation = useDeleteMessage();

  // Context menu handlers
  const handleMessageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const rect = messageRef.current?.getBoundingClientRect();
    if (rect) {
      setContextMenuPosition({
        x: e.clientX,
        y: e.clientY
      });
      setContextMenuVisible(true);
    }
  };

  const handleContextMenuClose = () => {
    setContextMenuVisible(false);
  };

  const handleEmojiReaction = (emoji: string) => {
    if (onEmojiReaction) {
      onEmojiReaction(message.id, emoji);
    }
  };

  const handleRemoveReaction = (emoji: string) => {
    if (onRemoveReaction) {
      onRemoveReaction(message.id, emoji);
    }
  };

  const handleMessageAction = (action: string) => {
    if (action === 'delete') {
      // Handle delete message
      const messageIdAsNumber = parseInt(message.id);
      if (!isNaN(messageIdAsNumber)) {
        deleteMessageMutation.mutate(messageIdAsNumber);
      }
      if (onDeleteMessage) {
        onDeleteMessage(message.id);
      }
    } else if (onMessageAction) {
      onMessageAction(message.id, action);
    }
    setContextMenuVisible(false);
  };

  // Click vào emoji pill bên dưới -> gọi API DELETE reaction
  const handleReactionPillClick = (emojiName: string) => {
    // Tìm reaction của chính user để lấy emoji_code & reaction_type (nếu có)
    const userReaction = message.reactions?.find(
      (r) => r.emoji_name === emojiName && r.user_id === currentUserId
    );

    removeReactionMutation.mutate({
      messageId: parseInt(message.id),
      reactionData: {
        emoji_name: emojiName,
        emoji_code: userReaction?.emoji_code,
        reaction_type: userReaction?.reaction_type as
          | 'unicode_emoji'
          | 'realm_emoji'
          | 'zulip_extra_emoji'
          | undefined,
      },
    });

    if (onRemoveReaction) onRemoveReaction(message.id, emojiName);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Function to sanitize and render HTML content
  const renderMessageContent = (content: string) => {
    // Basic HTML sanitization - remove dangerous tags and attributes
    const sanitizedContent = content
      // Remove script tags
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      // Remove event handlers
      .replace(/on\w+="[^"]*"/g, '')
      .replace(/on\w+='[^']*'/g, '')
      // Remove javascript: links
      .replace(/javascript:/gi, '')
      // Remove form and input tags for security
      .replace(/<\/?(?:form|input|textarea|select|button)[^>]*>/gi, '')
      // Convert line breaks to proper HTML
      .replace(/\n/g, '<br/>');
     
    return { __html: sanitizedContent };
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
    <>
      <div 
        ref={messageRef}
        className={`chat-message ${message.isOwn ? 'own-message' : 'other-message'}`}
        onClick={handleMessageClick}
      >
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
            <div 
              className="message-text" 
              style={{ marginBottom: 0 }}
              dangerouslySetInnerHTML={renderMessageContent(message.content)}
            />
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

        {/* Reactions Section */}
        {(() => {
          
          return null;
        })()}
        {message.reactions && message.reactions.length > 0 && (
          <div className="message-reactions">
            {Object.entries(
              message.reactions.reduce((acc, reaction) => {
                const key = `${reaction.emoji_name}_${reaction.emoji_code}`;
                if (!acc[key]) {
                  acc[key] = {
                    emoji_name: reaction.emoji_name,
                    emoji_code: reaction.emoji_code,
                    reaction_type: reaction.reaction_type,
                    count: 0,
                    users: []
                  };
                }
                acc[key].count++;
                acc[key].users.push(reaction.user_id);
                return acc;
              }, {} as Record<string, any>)
            ).map(([key, reaction]: [string, any]) => (
              <div
                key={key}
                className="reaction-item"
                onClick={() => handleReactionPillClick(reaction.emoji_name)}
              >
                <span className="reaction-emoji">
                  {reaction.emoji_name === 'heart' && '❤️'}
                  {reaction.emoji_name === 'joy' && '😂'}
                  {reaction.emoji_name === 'disappointed' && '😥'}
                  {reaction.emoji_name === 'sob' && '😭'}
                  {reaction.emoji_name === 'thumbs_up' && '👍'}
                  {reaction.emoji_name === 'thumbs_down' && '👎'}
                </span>
                <span className="reaction-count">{reaction.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>

      <MessageContextMenu
        visible={contextMenuVisible}
        position={contextMenuPosition}
        messageId={parseInt(message.id)}
        currentReactions={message.reactions}
        currentUserId={currentUserId}
        onClose={handleContextMenuClose}
        onEmojiReaction={handleEmojiReaction}
        onRemoveReaction={handleRemoveReaction}
        onMessageAction={handleMessageAction}
      />
    </>
  );
};

export default ChatMessage;
