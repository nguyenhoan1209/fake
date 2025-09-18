import React, { useState, useRef } from 'react';
import { Input, Button, Upload, Space, Tooltip } from 'antd';
import { SendOutlined, PaperClipOutlined, AudioOutlined, StopOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import './ChatInput.scss';

const { TextArea } = Input;

interface ChatInputProps {
  onSendMessage: (message: string, attachments?: File[]) => void;
  onSendVoiceMessage?: (audioBlob: Blob) => void;
  disabled?: boolean;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onSendVoiceMessage,
  disabled = false,
  placeholder = 'Type a message...',
}) => {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleSend = () => {
    if (message.trim() || attachments.length > 0) {
      onSendMessage(message.trim(), attachments);
      setMessage('');
      setAttachments([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const uploadProps: UploadProps = {
    multiple: true,
    beforeUpload: (file) => {
      // Check file size (max 10MB)
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        return false;
      }

      setAttachments((prev) => [...prev, file]);
      return false; // Prevent auto upload
    },
    onRemove: (file) => {
      const fileName = file.name || '';
      setAttachments((prev) => prev.filter((f) => f.name !== fileName));
    },
    fileList: attachments.map((file, index) => ({
      uid: `${index}`,
      name: file.name,
      status: 'done' as const,
    })),
    showUploadList: {
      showPreviewIcon: false,
      showRemoveIcon: true,
    },
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        if (onSendVoiceMessage) {
          onSendVoiceMessage(audioBlob);
        }
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      intervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setRecordingTime(0);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="chat-input-container">
      {attachments.length > 0 && (
        <div className="attachments-preview">
          <Upload {...uploadProps}>
            <div className="attachment-list">
              {attachments.map((file, index) => (
                <div key={index} className="attachment-item">
                  <span>{file.name}</span>
                </div>
              ))}
            </div>
          </Upload>
        </div>
      )}

      <div className="chat-input-wrapper">
        <Space.Compact style={{ width: '100%' }}>
          <Upload {...uploadProps} showUploadList={false}>
            <Tooltip title="Attach file">
              <Button icon={<PaperClipOutlined />} disabled={disabled} type="text" />
            </Tooltip>
          </Upload>

          <TextArea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onPressEnter={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            autoSize={{ minRows: 1, maxRows: 4 }}
            style={{ flex: 1 }}
          />

          {isRecording ? (
            <Tooltip title={`Recording: ${formatTime(recordingTime)}`}>
              <Button icon={<StopOutlined />} onClick={stopRecording} type="primary" danger className="recording-btn" />
            </Tooltip>
          ) : (
            <Tooltip title="Record voice message">
              <Button icon={<AudioOutlined />} onClick={startRecording} disabled={disabled} type="text" />
            </Tooltip>
          )}

          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            disabled={disabled || (!message.trim() && attachments.length === 0)}
          />
        </Space.Compact>
      </div>

      {isRecording && (
        <div className="recording-indicator">
          <div className="recording-dot" />
          <span>Recording... {formatTime(recordingTime)}</span>
        </div>
      )}
    </div>
  );
};

export default ChatInput;
