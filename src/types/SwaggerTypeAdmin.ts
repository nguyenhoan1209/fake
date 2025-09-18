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

export interface AddUserReq {
  name: string;
  phone?: string;
  email: string;
  password: string;
  confirmPassword: string;
  /** @format int32 */
  roleId: number;
  /** @format int32 */
  companyId?: number;
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
  /**
   * Giới tính: 0 - Nam, 1 - Nữ, 2 - Khác
   * @format int32
   */
  gender?: number;
  /** @format int32 */
  companyId?: number;
  /** @format int32 */
  roleId?: number;
  /** @format int32 */
  avatarId?: number;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
}

export interface UpdateAdminReq {
  /** @format int32 */
  id: number;
  /** @format int32 */
  roleId?: number;
  /**
   * Trạng thái của tài khoản admin: 0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
  email?: string;
  phone?: string;
  name?: string;
  address?: string;
  /** @format date-time */
  birthday?: string;
  /**
   * Giới tính: 0 - Nam, 1 - Nữ, 2 - Khác
   * @format int32
   */
  gender?: number;
  /** @format int32 */
  avatarId?: number;
}

export interface Admin {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  code?: string;
  email?: string;
  phone?: string;
  name?: string;
  address?: string;
  /** @format int32 */
  roleId?: number;
  /** @format date-time */
  birthday?: string;
  /**
   * Giới tính: 0 - Nam, 1 - Nữ, 2 - Khác
   * @format int32
   */
  gender?: number;
  /** @format int32 */
  agencyId?: number;
  /** @format int32 */
  avatarId?: number;
  /**
   * Trạng thái của tài khoản admin: 0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
}

export interface BaseResponseAdmin {
  /** @format int32 */
  code?: number;
  data?: Admin;
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
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
  /**
   * Loại quyền hạn của người dùng: 0 - ADMIN, 1 - AGENCY, 2 -SERVICE_PROVIDER
   * @format int32
   */
  type: number;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status: number;
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
  /**
   * Loại quyền hạn của người dùng: 0 - ADMIN, 1 - AGENCY, 2 -SERVICE_PROVIDER
   * @format int32
   */
  type: number;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status: number;
  /**
   * @maxItems 2147483647
   * @minItems 1
   */
  permissions: Permission[];
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

export interface AddLicenseByAdminReq {
  name?: string;
  whitelistIp?: string;
  redirectUri?: string;
  /** @format date-time */
  expireAt?: string;
  /** @format int32 */
  companyId?: number;
}

export interface EditProfile {
  name: string;
  /**
   * Trạng thái của tài khoản admin: 0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
  phone?: string;
  address?: string;
  /** @format date-time */
  birthday?: string;
  /**
   * Giới tính: 0 - Nam, 1 - Nữ, 2 - Khác
   * @format int32
   */
  gender?: number;
  /** @format int32 */
  avatarId?: number;
}

export interface UpdateCompanyReq {
  /** @format int32 */
  id: number;
  code?: string;
  /** @format int32 */
  agencyId?: number;
  name?: string;
  email?: string;
  address?: string;
  /** @format int32 */
  logoId?: number;
  taxCode?: string;
  hotline?: string;
  description?: string;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
}

export interface AddCompanyReq {
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
  valid?: boolean;
}

export interface BaseResponseCompany {
  /** @format int32 */
  code?: number;
  data?: Company;
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
}

export interface Company {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  code?: string;
  /** @format int32 */
  agencyId?: number;
  name?: string;
  email?: string;
  address?: string;
  /** @format int32 */
  logoId?: number;
  taxCode?: string;
  hotline?: string;
  description?: string;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
}

export interface SendOtpReq {
  phone?: string;
  email?: string;
  /** Hình thức gửi tin: 0 - ZNS, 1 - EMAIL, 2 - SMS */
  type: '0' | '1' | '2';
  /**
   * Mục đích gửi OTP: 0 - PASSWORD_RESET, 1 - REGISTRATION
   * @format int32
   */
  purpose: number;
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

export interface AdminLoginReq {
  email: string;
  password: string;
}

export interface AdminLoginRes {
  /** @format int32 */
  id?: number;
  code?: string;
  name?: string;
  email?: string;
  phone?: string;
  /** @format int32 */
  roleId?: number;
  accessToken?: string;
  address?: string;
  /** @format date-time */
  birthday?: string;
  /**
   * Giới tính: 0 - Nam, 1 - Nữ, 2 - Khác
   * @format int32
   */
  gender?: number;
  /** @format int32 */
  agencyId?: number;
  agencyName?: string;
  avatar?: UploadFile;
  permissions?: PermissionRes[];
}

export interface BaseResponseAdminLoginRes {
  /** @format int32 */
  code?: number;
  data?: AdminLoginRes;
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
  /**
   * Kiểu file upload: 0 - IMAGE, 1 - VIDEO_YOUTUBE, 2 - PDF
   * @format int32
   */
  type?: number;
  /** @format int32 */
  width?: number;
  /** @format int32 */
  height?: number;
  /** @format int32 */
  duration?: number;
  /** @format int64 */
  size?: number;
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

export interface UpdateAgencyReq {
  /** @format int32 */
  id: number;
  name?: string;
  phone?: string;
  email: string;
  address?: string;
  taxCode?: string;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status: number;
}

export interface AddAgencyReq {
  agencyName: string;
  taxCode?: string;
  phone?: string;
  address?: string;
  accountName: string;
  email: string;
  password: string;
  confirmPassword: string;
  valid?: boolean;
}

export interface AddAdminReq {
  email: string;
  name: string;
  password: string;
  /** @format int32 */
  roleId: number;
  /**
   * Trạng thái của tài khoản admin: 0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status: number;
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
  /**
   * Loại quyền hạn của người dùng: 0 - ADMIN, 1 - AGENCY, 2 -SERVICE_PROVIDER
   * @format int32
   */
  type?: number;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
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

export interface BaseResponseListLicense {
  /** @format int32 */
  code?: number;
  data?: License[];
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
}

export interface AdminRes {
  /** @format int32 */
  id?: number;
  name?: string;
  email?: string;
  /**
   * Trạng thái của tài khoản admin: 0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
  /** @format int32 */
  roleId?: number;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface BaseResponseListAdminRes {
  /** @format int32 */
  code?: number;
  data?: AdminRes[];
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
}

export interface BaseResponseListCompany {
  /** @format int32 */
  code?: number;
  data?: Company[];
  message?: string;
  errors?: Record<string, object>;
  /** @format int64 */
  total_record?: number;
}

export interface AgencyRes {
  /** @format int32 */
  id?: number;
  code?: string;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  taxCode?: string;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
  /** @format date-time */
  createAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface BaseResponseListAgencyRes {
  /** @format int32 */
  code?: number;
  data?: AgencyRes[];
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
export class SwaggerTypeAdmin<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  api = {
    /**
     * No description
     *
     * @tags user-controller
     * @name AddUserForAdmin
     * @summary Admin add new account for business
     * @request POST:/api/admin/v1/user/add-user
     * @secure
     * @response `200` `BaseResponseUser` OK
     */
    addUserForAdmin: (data: AddUserReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseUser, any>({
        path: `/api/admin/v1/user/add-user`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-controller
     * @name UpdateAdmin
     * @summary Update account information
     * @request POST:/api/admin/v1/update-admin
     * @secure
     * @response `200` `BaseResponseAdmin` OK
     */
    updateAdmin: (data: UpdateAdminReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseAdmin, any>({
        path: `/api/admin/v1/update-admin`,
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
     * @name UpdateRoleForAdmin
     * @summary Update role for Admin
     * @request POST:/api/admin/v1/role/update-role
     * @secure
     * @response `200` `BaseResponseObject` OK
     */
    updateRoleForAdmin: (data: UpdateRoleReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseObject, any>({
        path: `/api/admin/v1/role/update-role`,
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
     * @name DeleteRolesForAdmin
     * @summary Delete roles in the Admin
     * @request POST:/api/admin/v1/role/delete-roles
     * @secure
     * @response `200` `BaseResponseObject` OK
     */
    deleteRolesForAdmin: (data: IdsRequest, params: RequestParams = {}) =>
      this.http.request<BaseResponseObject, any>({
        path: `/api/admin/v1/role/delete-roles`,
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
     * @name AddRoleForAdmin
     * @summary Add role for Admin
     * @request POST:/api/admin/v1/role/add-role
     * @secure
     * @response `200` `BaseResponseObject` OK
     */
    addRoleForAdmin: (data: AddRoleReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseObject, any>({
        path: `/api/admin/v1/role/add-role`,
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
     * @name UpdateLicenseByAdmin
     * @summary Admin update license for business
     * @request POST:/api/admin/v1/license/update-license
     * @secure
     * @response `200` `BaseResponseLicense` OK
     */
    updateLicenseByAdmin: (data: UpdateLicenseReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseLicense, any>({
        path: `/api/admin/v1/license/update-license`,
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
     * @name DeleteLicenseByAdmin
     * @summary Admin delete licenses for business
     * @request POST:/api/admin/v1/license/delete-licenses
     * @secure
     * @response `200` `BaseResponseListInteger` OK
     */
    deleteLicenseByAdmin: (data: IdsRequest, params: RequestParams = {}) =>
      this.http.request<BaseResponseListInteger, any>({
        path: `/api/admin/v1/license/delete-licenses`,
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
     * @name AddLicenseByAdmin
     * @summary Admin add new license for business
     * @request POST:/api/admin/v1/license/add-license
     * @secure
     * @response `200` `BaseResponseLicense` OK
     */
    addLicenseByAdmin: (data: AddLicenseByAdminReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseLicense, any>({
        path: `/api/admin/v1/license/add-license`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-controller
     * @name ChangePassWord
     * @summary Edit account profile
     * @request POST:/api/admin/v1/edit-profile
     * @secure
     * @response `200` `BaseResponseAdmin` OK
     */
    changePassWord: (data: EditProfile, params: RequestParams = {}) =>
      this.http.request<BaseResponseAdmin, any>({
        path: `/api/admin/v1/edit-profile`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-controller
     * @name DeleteAdmins
     * @summary Delete account admins
     * @request POST:/api/admin/v1/delete-admins
     * @secure
     * @response `200` `BaseResponseListInteger` OK
     */
    deleteAdmins: (data: IdsRequest, params: RequestParams = {}) =>
      this.http.request<BaseResponseListInteger, any>({
        path: `/api/admin/v1/delete-admins`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags company-controller
     * @name UpdateCompany
     * @summary Update company
     * @request POST:/api/admin/v1/company/update-company
     * @secure
     * @response `200` `BaseResponseObject` OK
     */
    updateCompany: (data: UpdateCompanyReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseObject, any>({
        path: `/api/admin/v1/company/update-company`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags company-controller
     * @name DeleteCompany
     * @summary Delete company
     * @request POST:/api/admin/v1/company/delete-company
     * @secure
     * @response `200` `BaseResponseObject` OK
     */
    deleteCompany: (data: IdsRequest, params: RequestParams = {}) =>
      this.http.request<BaseResponseObject, any>({
        path: `/api/admin/v1/company/delete-company`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags company-controller
     * @name AddUser
     * @summary Admin add new business
     * @request POST:/api/admin/v1/company/add-company
     * @secure
     * @response `200` `BaseResponseCompany` OK
     */
    addUser: (data: AddCompanyReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseCompany, any>({
        path: `/api/admin/v1/company/add-company`,
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
     * @name SendOtpAdmin
     * @summary Send OTP forgot password Admin
     * @request POST:/api/admin/v1/auth/send-otp
     * @secure
     * @response `200` `BaseResponseSendOtp` OK
     */
    sendOtpAdmin: (data: SendOtpReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseSendOtp, any>({
        path: `/api/admin/v1/auth/send-otp`,
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
     * @name LoginAdmin
     * @summary Admin login
     * @request POST:/api/admin/v1/auth/login
     * @secure
     * @response `200` `BaseResponseAdminLoginRes` OK
     */
    loginAdmin: (data: AdminLoginReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseAdminLoginRes, any>({
        path: `/api/admin/v1/auth/login`,
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
     * @name ForgotPasswordAdmin
     * @summary Admin forgot password
     * @request POST:/api/admin/v1/auth/forgot-password
     * @secure
     * @response `200` `BaseResponseString` OK
     */
    forgotPasswordAdmin: (data: ForgotPasswordReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseString, any>({
        path: `/api/admin/v1/auth/forgot-password`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags agency-controller
     * @name UpdateAgency
     * @summary Update Agency
     * @request POST:/api/admin/v1/agency/update-agency
     * @secure
     * @response `200` `BaseResponseObject` OK
     */
    updateAgency: (data: UpdateAgencyReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseObject, any>({
        path: `/api/admin/v1/agency/update-agency`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags agency-controller
     * @name DeleteAgencies
     * @summary Delete agencies
     * @request POST:/api/admin/v1/agency/delete-agencies
     * @secure
     * @response `200` `BaseResponseObject` OK
     */
    deleteAgencies: (data: IdsRequest, params: RequestParams = {}) =>
      this.http.request<BaseResponseObject, any>({
        path: `/api/admin/v1/agency/delete-agencies`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags agency-controller
     * @name AddAgency
     * @summary Add new Agency
     * @request POST:/api/admin/v1/agency/add-agency
     * @secure
     * @response `200` `BaseResponseObject` OK
     */
    addAgency: (data: AddAgencyReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseObject, any>({
        path: `/api/admin/v1/agency/add-agency`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-controller
     * @name AddAdmin
     * @summary Add admin member
     * @request POST:/api/admin/v1/add-admin
     * @secure
     * @response `200` `BaseResponseAdmin` OK
     */
    addAdmin: (data: AddAdminReq, params: RequestParams = {}) =>
      this.http.request<BaseResponseAdmin, any>({
        path: `/api/admin/v1/add-admin`,
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
     * @name GetRolesForAdmin
     * @summary Get role
     * @request GET:/api/admin/v1/role/get-roles
     * @secure
     * @response `200` `BaseResponseListRoleRes` OK
     */
    getRolesForAdmin: (
      query: {
        /** @format int32 */
        page: number;
        /**
         * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
         * @format int32
         */
        status?: number;
        /** [name] */
        searchKeyword?: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<BaseResponseListRoleRes, any>({
        path: `/api/admin/v1/role/get-roles`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags role-controller
     * @name GetPermissionsForAdmin
     * @summary Get permissions
     * @request GET:/api/admin/v1/role/get-permissions
     * @secure
     * @response `200` `BaseResponseListPermissionRes` OK
     */
    getPermissionsForAdmin: (params: RequestParams = {}) =>
      this.http.request<BaseResponseListPermissionRes, any>({
        path: `/api/admin/v1/role/get-permissions`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags role-controller
     * @name GetDetailRoleForAdmin
     * @summary Get detail role
     * @request GET:/api/admin/v1/role/get-detail-role
     * @secure
     * @response `200` `BaseResponseRoleRes` OK
     */
    getDetailRoleForAdmin: (
      query: {
        /** @format int32 */
        role_id: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<BaseResponseRoleRes, any>({
        path: `/api/admin/v1/role/get-detail-role`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags license-controller
     * @name SearchLicenseByAdmin
     * @summary Admin search licenses of business
     * @request GET:/api/admin/v1/license/get-licenses
     * @secure
     * @response `200` `BaseResponseListLicense` OK
     */
    searchLicenseByAdmin: (
      query: {
        /** @format int32 */
        page: number;
        /** @format int32 */
        companyId?: number;
        status?: '0' | '1';
        /** [name, licenseCode] */
        searchKeyword?: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<BaseResponseListLicense, any>({
        path: `/api/admin/v1/license/get-licenses`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-controller
     * @name GetMyProfile
     * @summary Get my profile
     * @request GET:/api/admin/v1/get-my-profile
     * @secure
     * @response `200` `BaseResponseAdminLoginRes` OK
     */
    getMyProfile: (params: RequestParams = {}) =>
      this.http.request<BaseResponseAdminLoginRes, any>({
        path: `/api/admin/v1/get-my-profile`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-controller
     * @name GetAdmin
     * @summary Get admin list
     * @request GET:/api/admin/v1/get-admins
     * @secure
     * @response `200` `BaseResponseListAdminRes` OK
     */
    getAdmin: (
      query: {
        /** @format int32 */
        page: number;
        /**
         * Trạng thái của tài khoản admin: 0 - INACTIVE, 1 - ACTIVE
         * @format int32
         */
        status?: number;
        /** @format int32 */
        roleId?: number;
        /** [name, email] */
        searchKeyword?: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<BaseResponseListAdminRes, any>({
        path: `/api/admin/v1/get-admins`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags company-controller
     * @name GetCompanyList
     * @summary Get company with filter
     * @request GET:/api/admin/v1/company/get-companies
     * @secure
     * @response `200` `BaseResponseListCompany` OK
     */
    getCompanyList: (
      query: {
        /** @format int32 */
        page: number;
        /** [name, email, code, hotline] */
        searchKeyword?: string;
        /**
         * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
         * @format int32
         */
        status?: number;
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<BaseResponseListCompany, any>({
        path: `/api/admin/v1/company/get-companies`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags agency-controller
     * @name GetAgencyList
     * @summary Get agency list
     * @request GET:/api/admin/v1/agency/get-agencies
     * @secure
     * @response `200` `BaseResponseListAgencyRes` OK
     */
    getAgencyList: (
      query: {
        /** @format int32 */
        page: number;
        /**
         * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
         * @format int32
         */
        status?: number;
        /** [name, email, code, taxCode] */
        searchKeyword?: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<BaseResponseListAgencyRes, any>({
        path: `/api/admin/v1/agency/get-agencies`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),
  };
}
