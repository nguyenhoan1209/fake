import React from 'react';
import { 
  UndoOutlined, 
  PushpinOutlined, 
  CopyOutlined, 
  SendOutlined, 
  DeleteOutlined, 
  CheckSquareOutlined,
  DownOutlined
} from '@ant-design/icons';
import { useAddReaction, useRemoveReaction } from 'libs/hooks/api/useChat';
import './MessageContextMenu.scss';

export interface MessageAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export interface EmojiReaction {
  emoji: string;
  label: string;
  onClick: () => void;
}

interface MessageContextMenuProps {
  visible: boolean;
  position: { x: number; y: number };
  messageId: number;
  currentReactions?: Array<{
    emoji_name: string;
    emoji_code: string;
    reaction_type: string;
    user_id: number;
  }>;
  currentUserId?: number;
  onClose: () => void;
  onEmojiReaction: (emoji: string) => void;
  onRemoveReaction?: (emoji: string) => void;
  onMessageAction: (action: string) => void;
}

const MessageContextMenu: React.FC<MessageContextMenuProps> = ({
  visible,
  position,
  messageId,
  currentReactions = [],
  currentUserId,
  onClose,
  onEmojiReaction,
  onMessageAction
}) => {
  const addReactionMutation = useAddReaction();
  const removeReactionMutation = useRemoveReaction();

  if (!visible) return null;

  // Kiểm tra xem user hiện tại đã reaction emoji nào chưa
  const getUserReactions = (emojiName: string) => {
    return currentReactions.filter(
      reaction => reaction.emoji_name === emojiName && reaction.user_id === currentUserId
    );
  };

  // Handler cho emoji reaction
  const handleEmojiClick = (emojiName: string) => {
    const userReactions = getUserReactions(emojiName);
    
    if (userReactions.length > 0) {
      // User đã reaction rồi, xóa reaction
      const reaction = userReactions[0];
      removeReactionMutation.mutate({
        messageId,
        reactionData: {
          emoji_name: emojiName,
          emoji_code: reaction.emoji_code,
          reaction_type: reaction.reaction_type as 'unicode_emoji' | 'realm_emoji' | 'zulip_extra_emoji'
        }
      });
      onEmojiReaction(emojiName);
    } else {
      // User chưa reaction, thêm reaction
      addReactionMutation.mutate({
        messageId,
        reactionData: {
          emoji_name: emojiName,
          reaction_type: 'unicode_emoji'
        }
      });
      onEmojiReaction(emojiName);
    }
  };

  // Danh sách emoji reactions với tên emoji theo Zulip format
  const emojiReactions: EmojiReaction[] = [
    { emoji: '❤️', label: 'Love', onClick: () => handleEmojiClick('heart') },
    { emoji: '😂', label: 'Laugh', onClick: () => handleEmojiClick('joy') },
    { emoji: '😥', label: 'Sad', onClick: () => handleEmojiClick('disappointed') },
    { emoji: '😭', label: 'Cry', onClick: () => handleEmojiClick('sob') },
    { emoji: '👍', label: 'Like', onClick: () => handleEmojiClick('thumbs_up') },
    { emoji: '👎', label: 'Dislike', onClick: () => handleEmojiClick('thumbs_down') },
  ];

  // Danh sách message actions
  const messageActions: MessageAction[] = [
    {
      id: 'reply',
      label: 'Reply',
      icon: <UndoOutlined />,
      onClick: () => onMessageAction('reply')
    },
    {
      id: 'pin',
      label: 'Pin',
      icon: <PushpinOutlined />,
      onClick: () => onMessageAction('pin')
    },
    {
      id: 'copy',
      label: 'Copy Text',
      icon: <CopyOutlined />,
      onClick: () => onMessageAction('copy')
    },
    {
      id: 'forward',
      label: 'Forward',
      icon: <SendOutlined />,
      onClick: () => onMessageAction('forward')
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: <DeleteOutlined />,
      onClick: () => onMessageAction('delete')
    },
    {
      id: 'select',
      label: 'Select',
      icon: <CheckSquareOutlined />,
      onClick: () => onMessageAction('select')
    }
  ];



 

  return (
    <div className="message-context-menu-overlay" onClick={onClose}>
      <div 
        className="message-context-menu"
        style={{
          left: position.x,
          top: position.y,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Emoji Reactions Section */}
        <div className="emoji-reactions-section">
          <div className="emoji-reactions-container">
            {emojiReactions.map((reaction, index) => {
              // Map emoji names correctly
              const emojiNameMap: Record<string, string> = {
                'Love': 'heart',
                'Laugh': 'joy', 
                'Sad': 'disappointed',
                'Cry': 'sob',
                'Like': 'thumbs_up',
                'Dislike': 'thumbs_down'
              };
              const emojiName = emojiNameMap[reaction.label];
              const userReactions = getUserReactions(emojiName);
              const isReacted = userReactions.length > 0;
              
              return (
                <button
                  key={index}
                  className={`emoji-reaction-btn ${isReacted ? 'reacted' : ''}`}
                  onClick={reaction.onClick}
                  title={reaction.label}
                >
                  {reaction.emoji}
                </button>
              );
            })}
            <button className="emoji-more-btn" title="More emojis">
              <DownOutlined />
            </button>
          </div>
        </div>

        {/* Message Actions Section */}
        <div className="message-actions-section">
          {messageActions.map((action) => (
            <button
              key={action.id}
              className="message-action-btn"
              onClick={() => action.onClick()}
              disabled={action.disabled}
            >
              <span className="action-icon">{action.icon}</span>
              <span className="action-label">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageContextMenu;
