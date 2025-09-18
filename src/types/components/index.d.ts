import type { ButtonProps, SelectProps } from 'antd';
import type { Key, MouseEvent, ReactNode } from 'react';

import { FormItemProps } from 'antd/lib';
import type { ERoleType, RoleActionGroup, RoleActionKey, RoleUserClient } from 'config/enum';
import type { CompanyResponse } from 'types/api/company';
import type { IncentiveResponse } from 'types/api/incentive';
import type { PackageResponse } from 'types/api/package';
import type { Role, UserResponse } from 'types/api/user';

export type ModalDefaultProps = {
  isOpen?: boolean;
  onCancel?: () => void;
};

export type AuthenticationProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export type ModalChangeProfileProps = ModalDefaultProps & {
  isShowProfile?: boolean;
};

export type ModalImportProps = ModalDefaultProps & {
  title?: string;
  roleActionGroup?: RoleActionGroup | RoleActionGroup[];
  roleActionKey?: RoleActionKey;
  roleActionType?: ERoleType | ERoleType[];
  defaultURIDownload?: string;
  onConfirmImport?: (file: File) => void;
  pending?: boolean;
};

export type SidebarProps = {
  onToggleCollapsed: () => void;
  isCollapsed: boolean;
};

export type ButtonCustomProps = ButtonProps & {
  roleActionGroup?: RoleActionGroup | RoleActionGroup[];
  roleActionKey?: RoleActionKey;
  roleActionType?: ERoleType | ERoleType[];
  isBtnDelete?: boolean;
  isBtnEdit?: boolean;
};

export type ModalAddEditBusinessProps = ModalDefaultProps & {
  recordCompany?: CompanyResponse;
};

export type SwitchCustomProps = {
  id: number;
  isChecked: boolean;
  onChange: (checked: boolean, id: number) => void;
};

export type SelectActionProps = SelectProps & {
  roleActionGroup?: RoleActionGroup | RoleActionGroup[];
  roleActionType?: ERoleType | ERoleType[];
};

export type NumberSelectionProps = {
  selectedRowKeys: Key[] | Key[][];
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  className?: string;
};

export type UserListUIProps = {
  roleId?: RoleUserClient;
  roleType?: ERoleType;
};

export type ModalAddAndEditUserProps = ModalDefaultProps & {
  recordUser?: UserResponse;
  roleId?: number;
  roleType?: ERoleType;
};

export type ModalResetUserPasswordProps = ModalAddAndEditUserProps & {
  recordUser?: UserResponse;
};

export type ModalAddAndEditUserRoleProps = ModalDefaultProps & {
  recordRoleUser?: Role;
};

export type SelectUserProps = SelectProps & {
  bonusOptions?: UserResponse[];
  isNotCallApiWhenMounted?: boolean;
  initialOptions?: DefaultOptionType[];
};

export type SelectPromotionProps = SelectProps & {
  bonusOptions?: IncentiveResponse[];
  isNotCallApiWhenMounted?: boolean;
  initialOptions?: DefaultOptionType[];
};

export type SelectCompanyProps = SelectProps & {
  bonusOptions?: CompanyResponse[];
  isNotCallApiWhenMounted?: boolean;
  initialOptions?: DefaultOptionType[];
};

export type SelectPackageProps = SelectProps & {
  bonusOptions?: PackageResponse[];
  initialOptions?: DefaultOptionType[];
};

export type ModalChangePasswordProps = ModalDefaultProps;

export interface IFormBoxItem<T extends object> extends FormItemProps {
  span?: number;
  isFormItem?: boolean;
  name?: keyof T | undefined; // pass undefined when isFormItem = true
}

export type KpiCardProps = {
  icon?: ReactNode;
  value?: string;
  description?: string;
  className?: string;
};

export type AddAdminRequest = {
  email: string;
  name: string;
  phone: string;
  permission?: string;
  address?: string;
  password?: string;
  confirmPassword?: string;
  status?: number | undefined;
  roleId?: number | undefined;
};

export type UpdateAdminRequest = {
  id?: number | undefined;
  roleId?: number;
  status?: number;
  email?: string;
  phone?: string;
  name?: string;
  address?: string;
  birthday?: string;
  gender?: number;
  avatarId?: number;
};
