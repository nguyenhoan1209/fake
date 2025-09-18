export interface UploadFileResponse {
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  id: number;
  originUrl: string;
  thumbUrl: string;
  type: number;
  width: number;
  height: number;
  size: number;
}

export type UploadFileInitialState = {
  pendingUpload?: boolean;
  error?: boolean;
  responseUploadFile?: UploadFileResponse;
};
