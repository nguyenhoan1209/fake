/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AddUserBaseReq {
  name: string;
  phone?: string;
  email: string;
  password: string;
  confirmPassword: string;
  /** @format int32 */
  roleId: number;
  valid?: boolean;
}

export interface BaseResponseUser {
  /** @format int32 */
  code?: number;
  data?: User;
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
}

export interface User {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  deleted?: boolean;
  code?: string;
  phone?: string;
  email?: string;
  name?: string;
  address?: string;
  /** @format date-time */
  birthday?: string;
  /** Giới tính: 0 - Nam, 1 - Nữ, 2 - Khác */
  gender?: '0' | '1' | '2';
  /** @format int32 */
  companyId?: number;
  /** @format int32 */
  roleId?: number;
  /** @format int32 */
  avatarId?: number;
  /** Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE */
  status?: '0' | '1';
}

export interface Permission {
  /** @format int32 */
  id: number;
  view?: boolean;
  approval?: boolean;
  write?: boolean;
  decision?: boolean;
}

export interface UpdateRoleReq {
  name: string;
  note?: string;
  /** Loại quyền hạn của người dùng: 0 - ADMIN, 1 - AGENCY, 2 -SERVICE_PROVIDER */
  type: '0' | '1' | '2';
  /** Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE */
  status: '0' | '1';
  /**
   * @maxItems 2147483647
   * @minItems 1
   */
  permissions: Permission[];
  /** @format int32 */
  id: number;
}

export interface BaseResponseObject {
  /** @format int32 */
  code?: number;
  data?: object;
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
}

export interface IdsRequest {
  /**
   * @maxItems 2147483647
   * @minItems 1
   */
  ids: number[];
}

export interface AddRoleReq {
  name: string;
  note?: string;
  /** Loại quyền hạn của người dùng: 0 - ADMIN, 1 - AGENCY, 2 -SERVICE_PROVIDER */
  type: '0' | '1' | '2';
  /** Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE */
  status: '0' | '1';
  /**
   * @maxItems 2147483647
   * @minItems 1
   */
  permissions: Permission[];
}

export interface VerifySessionReq {
  client_id: string;
  redirect_uri: string;
  code: string;
  client_secret: string;
}

export interface BaseResponseUserTokenRes {
  /** @format int32 */
  code?: number;
  data?: UserTokenRes;
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
}

export interface UserTokenRes {
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
  session_state?: string;
  /** @format int64 */
  expires_in?: number;
  /** @format int64 */
  refresh_expires_in?: number;
}

export interface RefreshTokenReq {
  client_id: string;
  client_secret: string;
  refresh_token: string;
}

export interface BaseResponseUploadFile {
  /** @format int32 */
  code?: number;
  data?: UploadFile;
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
}

export interface UploadFile {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  deleted?: boolean;
  originFilePath?: string;
  thumbFilePath?: string;
  originUrl?: string;
  thumbUrl?: string;
  /** Kiểu file upload: 0 - IMAGE, 1 - VIDEO_YOUTUBE, 2 - PDF */
  type?: '0' | '1' | '2';
  /** @format int32 */
  width?: number;
  /** @format int32 */
  height?: number;
  /** @format int32 */
  duration?: number;
  /** @format int64 */
  size?: number;
}

export interface UpdateLicenseReq {
  /** @format int32 */
  id: number;
  name?: string;
  whitelistIp?: string;
  redirectUri?: string;
  /** @format date-time */
  expireAt?: string;
  status?: '0' | '1';
}

export interface BaseResponseLicense {
  /** @format int32 */
  code?: number;
  data?: License;
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
}

export interface License {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  deleted?: boolean;
  /** @format int32 */
  userId?: number;
  /** @format int32 */
  companyId?: number;
  name?: string;
  licenseCode?: string;
  secretCode?: string;
  whitelistIp?: string;
  redirectUri?: string;
  /** @format date-time */
  expireAt?: string;
  status?: '0' | '1';
}

export interface BaseResponseListInteger {
  /** @format int32 */
  code?: number;
  data?: number[];
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
}

export interface AddLicenseReq {
  name?: string;
  whitelistIp?: string;
  redirectUri?: string;
  /** @format date-time */
  expireAt?: string;
}

export interface SendOtpReq {
  phone?: string;
  email?: string;
  /** Hình thức gửi tin: 0 - ZNS, 1 - EMAIL, 2 - SMS */
  type: '0' | '1' | '2';
  /** Mục đích gửi OTP: 0 - PASSWORD_RESET, 1 - REGISTRATION */
  purpose: '0' | '1';
  valid?: boolean;
}

export interface BaseResponseSendOtp {
  /** @format int32 */
  code?: number;
  data?: SendOtp;
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
}

export interface SendOtp {
  /** @format int32 */
  id?: number;
  email?: string;
  phone?: string;
  otp?: string;
}

export interface RegisterUser {
  /** @format int32 */
  logoId?: number;
  nameBusiness: string;
  taxCode?: string;
  address?: string;
  /** @format int32 */
  agencyId?: number;
  name: string;
  phone?: string;
  email: string;
  password: string;
  confirmPassword: string;
  /** @format int32 */
  codeId: number;
  code: string;
  valid?: boolean;
}

export interface BaseResponseUserLoginRes {
  /** @format int32 */
  code?: number;
  data?: UserLoginRes;
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
}

export interface PermissionRes {
  /** @format int32 */
  id?: number;
  title?: string;
  permission?:
    | 'ADMIN_DASHBOARD'
    | 'ADMIN_AGENCY'
    | 'ADMIN_BUSINESS'
    | 'ADMIN_HELP'
    | 'ADMIN_ROLE'
    | 'ADMIN_ACCOUNT'
    | 'ADMIN_DOCUMENT'
    | 'USER_DASHBOARD'
    | 'USER_LOG'
    | 'USER_CONVERSION_METRIC'
    | 'USER_BUSINESS'
    | 'USER_CONFIG_SERVICE'
    | 'USER_ROLE'
    | 'USER_ACCOUNT';
  parentPermission?: 'STATISTIC' | 'AGENCY' | 'BUSINESS' | 'UTILITIES' | 'ACCOUNT';
  isView?: boolean;
  isWrite?: boolean;
  isApproval?: boolean;
  isDecision?: boolean;
}

export interface UserLoginRes {
  /** @format int32 */
  id?: number;
  code?: string;
  name?: string;
  phone?: string;
  email?: string;
  /** @format int32 */
  roleId?: number;
  accessToken?: string;
  address?: string;
  /** @format date-time */
  birthday?: string;
  /** Giới tính: 0 - Nam, 1 - Nữ, 2 - Khác */
  gender?: '0' | '1' | '2';
  /** @format int32 */
  companyId?: number;
  companyName?: string;
  avatar?: UploadFile;
  permissions?: PermissionRes[];
}

export interface UserLoginReq {
  email: string;
  password: string;
}

export interface ForgotPasswordReq {
  /** @format int32 */
  codeId: number;
  code: string;
  newPassword: string;
  confirmNewPassword: string;
  valid?: boolean;
}

export interface BaseResponseString {
  /** @format int32 */
  code?: number;
  data?: string;
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
}

export interface BaseResponseListRoleRes {
  /** @format int32 */
  code?: number;
  data?: RoleRes[];
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
}

export interface RoleRes {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  objectId?: number;
  name?: string;
  note?: string;
  /** Loại quyền hạn của người dùng: 0 - ADMIN, 1 - AGENCY, 2 -SERVICE_PROVIDER */
  type?: '0' | '1' | '2';
  /** Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE */
  status?: '0' | '1';
  permissions?: PermissionRes[];
}

export interface BaseResponseListPermissionRes {
  /** @format int32 */
  code?: number;
  data?: PermissionRes[];
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
}

export interface BaseResponseRoleRes {
  /** @format int32 */
  code?: number;
  data?: RoleRes;
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
}

export interface BaseResponseUserInfoRes {
  /** @format int32 */
  code?: number;
  data?: UserInfoRes;
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
}

export interface UserInfoRes {
  sub?: string;
  msisdn?: string;
  verify?: boolean;
  message?: string;
  mobile_id?: string;
}

export interface BaseResponseListLicense {
  /** @format int32 */
  code?: number;
  data?: License[];
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from 'axios';
import axios from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || 'http://210.211.97.224:8082' });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title API MYID GATEWAY
 * @version 1.0
 * @license License of API (https://interits.com/)
 * @baseUrl http://210.211.97.224:8082
 * @contact ITS <info@its.com> (https://interits.com/)
 *
 * Api mobile_id gateway
 */
export class SwaggerTypeUser<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  api = {
    /**
     * No description
     *
     * @tags user-controller
     * @name AddUser
     * @summary Business add new account
     * @request POST:/api/v1/user/add-user
     * @secure
     * @response `200` `BaseResponseUser` OK
     */
    addUser: (data: AddUserBaseReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseUser, any>({
        path: `/api/v1/user/add-user`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags role-controller
     * @name UpdateRole
     * @summary Update role for company
     * @request POST:/api/v1/role/update-role
     * @secure
     * @response `200` `BaseResponseObject` OK
     */
    updateRole: (data: UpdateRoleReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseObject, any>({
        path: `/api/v1/role/update-role`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags role-controller
     * @name DeleteRoles
     * @summary Delete roles in the company
     * @request POST:/api/v1/role/delete-roles
     * @secure
     * @response `200` `BaseResponseObject` OK
     */
    deleteRoles: (data: IdsRequest, params: RequestParams = {}) =>
      this.http.request<BaseResponseObject, any>({
        path: `/api/v1/role/delete-roles`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags role-controller
     * @name AddRole
     * @summary Add role for company
     * @request POST:/api/v1/role/add-role
     * @secure
     * @response `200` `BaseResponseObject` OK
     */
    addRole: (data: AddRoleReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseObject, any>({
        path: `/api/v1/role/add-role`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags mobile-id-controller
     * @name VerifySessionCode
     * @summary Verify the authentication code
     * @request POST:/api/v1/mobile-id/verify-session-code
     * @secure
     * @response `200` `BaseResponseUserTokenRes` OK
     */
    verifySessionCode: (data: VerifySessionReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseUserTokenRes, any>({
        path: `/api/v1/mobile-id/verify-session-code`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags mobile-id-controller
     * @name Oauth
     * @summary The Client sends an authentication request
     * @request GET:/api/v1/mobile-id/oauth
     * @secure
     * @response `200` `object` OK
     */
    oauth: (
      query: {
        client_id: string;
        state?: string;
        redirect_uri: string;
        msisdn: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<object, any>({
        path: `/api/v1/mobile-id/oauth`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags mobile-id-controller
     * @name RefreshToken
     * @summary Get accessToken from refreshToken
     * @request POST:/api/v1/mobile-id/oauth
     * @secure
     * @response `200` `object` OK
     */
    refreshToken: (data: RefreshTokenReq, params: RequestParams = {}) =>
      this.http.request<object, any>({
        path: `/api/v1/mobile-id/oauth`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags file-controller
     * @name UploadImage
     * @request POST:/api/v1/media/upload-image
     * @secure
     * @response `200` `BaseResponseUploadFile` OK
     */
    uploadImage: (
      data: {
        /** @format binary */
        file: File;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<BaseResponseUploadFile, any>({
        path: `/api/v1/media/upload-image`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags license-controller
     * @name UpdateLicense
     * @summary Business update license
     * @request POST:/api/v1/license/update-license
     * @secure
     * @response `200` `BaseResponseLicense` OK
     */
    updateLicense: (data: UpdateLicenseReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseLicense, any>({
        path: `/api/v1/license/update-license`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags license-controller
     * @name DeleteLicense
     * @summary Business delete licenses
     * @request POST:/api/v1/license/delete-licenses
     * @secure
     * @response `200` `BaseResponseListInteger` OK
     */
    deleteLicense: (data: IdsRequest, params: RequestParams = {}) =>
      this.http.request<BaseResponseListInteger, any>({
        path: `/api/v1/license/delete-licenses`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags license-controller
     * @name AddLicense
     * @summary Business add new license
     * @request POST:/api/v1/license/add-license
     * @secure
     * @response `200` `BaseResponseLicense` OK
     */
    addLicense: (data: AddLicenseReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseLicense, any>({
        path: `/api/v1/license/add-license`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth-controller
     * @name SendOtpUser
     * @summary Send OTP forgot password Business
     * @request POST:/api/v1/auth/send-otp
     * @secure
     * @response `200` `BaseResponseSendOtp` OK
     */
    sendOtpUser: (data: SendOtpReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseSendOtp, any>({
        path: `/api/v1/auth/send-otp`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth-controller
     * @name RegisterUser
     * @summary Business register
     * @request POST:/api/v1/auth/register
     * @secure
     * @response `200` `BaseResponseUserLoginRes` OK
     */
    registerUser: (data: RegisterUser, params: RequestParams = {}) =>
      this.http.request<BaseResponseUserLoginRes, any>({
        path: `/api/v1/auth/register`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth-controller
     * @name LoginUser
     * @summary Business login
     * @request POST:/api/v1/auth/login
     * @secure
     * @response `200` `BaseResponseUserLoginRes` OK
     */
    loginUser: (data: UserLoginReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseUserLoginRes, any>({
        path: `/api/v1/auth/login`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth-controller
     * @name ForgotPassword
     * @summary Business forgot password
     * @request POST:/api/v1/auth/forgot-password
     * @secure
     * @response `200` `BaseResponseString` OK
     */
    forgotPassword: (data: ForgotPasswordReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseString, any>({
        path: `/api/v1/auth/forgot-password`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user-controller
     * @name GetMyProfile
     * @summary Get my profile
     * @request GET:/api/v1/user/get-my-profile
     * @secure
     * @response `200` `BaseResponseUserLoginRes` OK
     */
    getMyProfile: (params: RequestParams = {}) =>
      this.http.request<BaseResponseUserLoginRes, any>({
        path: `/api/v1/user/get-my-profile`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags role-controller
     * @name GetRoleList
     * @summary Get role
     * @request GET:/api/v1/role/get-roles
     * @secure
     * @response `200` `BaseResponseListRoleRes` OK
     */
    getRoleList: (
      query: {
        /** @format int32 */
        page: number;
        /** Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE */
        status?: '0' | '1';
        /** [name] */
        searchKeyword?: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<BaseResponseListRoleRes, any>({
        path: `/api/v1/role/get-roles`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags role-controller
     * @name GetPermissions
     * @summary Get permissions
     * @request GET:/api/v1/role/get-permissions
     * @secure
     * @response `200` `BaseResponseListPermissionRes` OK
     */
    getPermissions: (params: RequestParams = {}) =>
      this.http.request<BaseResponseListPermissionRes, any>({
        path: `/api/v1/role/get-permissions`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags role-controller
     * @name GetDetailRole
     * @summary Get detail role
     * @request GET:/api/v1/role/get-detail-role
     * @secure
     * @response `200` `BaseResponseRoleRes` OK
     */
    getDetailRole: (
      query: {
        /** @format int32 */
        role_id: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<BaseResponseRoleRes, any>({
        path: `/api/v1/role/get-detail-role`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags mobile-id-controller
     * @name OauthCallBack
     * @request GET:/api/v1/mobile-id/oauth/callback
     * @secure
     * @response `200` `object` OK
     */
    oauthCallBack: (
      query?: {
        state?: string;
        error?: string;
        description?: string;
        auth_session?: string;
        session_state?: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<object, any>({
        path: `/api/v1/mobile-id/oauth/callback`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags mobile-id-controller
     * @name GetInfo
     * @summary Get info
     * @request GET:/api/v1/mobile-id/get-info
     * @secure
     * @response `200` `BaseResponseUserInfoRes` OK
     */
    getInfo: (
      query: {
        accessToken: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<BaseResponseUserInfoRes, any>({
        path: `/api/v1/mobile-id/get-info`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags mobile-id-controller
     * @name CheckAvailable
     * @summary Check your phone is available before entering oauth
     * @request GET:/api/v1/mobile-id/check-available
     * @secure
     * @response `200` `BaseResponseObject` OK
     */
    checkAvailable: (
      query: {
        client_id: string;
        msisdn: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<BaseResponseObject, any>({
        path: `/api/v1/mobile-id/check-available`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags license-controller
     * @name SearchLicense
     * @summary Business search licenses
     * @request GET:/api/v1/license/get-licenses
     * @secure
     * @response `200` `BaseResponseListLicense` OK
     */
    searchLicense: (
      query: {
        /** @format int32 */
        page: number;
        status?: '0' | '1';
        /** [name, licenseCode] */
        searchKeyword?: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<BaseResponseListLicense, any>({
        path: `/api/v1/license/get-licenses`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),
  };
}
