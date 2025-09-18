export type ErrorResponse = {
  data: {
    message: string;
  };
  status?: number;
  statusText?: string;
};

export type ErrorMessage = {
  message: string;
  statusCode: number;
};

export type BaseResponse<T> = {
  data?: T;
  message: string;
  totalRecord?: number;
};

export type IdRequest = {
  id: number;
};

export type IdsRequest = {
  ids: number[];
};
