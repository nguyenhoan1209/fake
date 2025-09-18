export enum RoleActionGroup {
  SYSTEM_ADMIN,
  DASHBOARD,
  MANAGE_ACCOUNT,
  SUPPORT,
  PACKAGE,
  NEWS,
  DOCUMENT,
  LICENSE,
  AUTHLOG,
  PROMOTION,
  ORDER,
  COMPANY,
  CATEGORY,
  CRITERIA,
  CRITERIA_GROUP,
  AUDIO,
  CALL,
  KEYWORD,
  CONFIGURATION,
}
export enum RoleActionKey {
  ADMIN,
  READ,
  CREATE,
  UPDATE,
  DELETE,
}

export enum ERoleType {
  SYSTEM,
  COMPANY,
}

export enum RoleUserClient {
  END_USER,
  USER_ADMIN,
  USER_CHANNEL_LEADER,
  USER_BRANCH,
  USER_AGENT,
  MEMBER_AGENT,
}

export enum RoleTeam {
  MEMBER,
  ADMIN,
}

export const convertRoleTypeFromValueToText = (key: number): string => {
  switch (key) {
    case ERoleType.SYSTEM:
      return 'Hệ thống';

    case ERoleType.COMPANY:
      return 'Doanh nghiệp';

    default:
      return '';
  }
};

export const convertRoleTypeFromValueToName = (key: number): string => {
  switch (key) {
    case ERoleType.SYSTEM:
      return 'SYSTEM';

    case ERoleType.COMPANY:
      return 'COMPANY';

    default:
      return '';
  }
};

export const convertRoleTeamFromValueToText = (key: number): string => {
  switch (key) {
    case RoleTeam.ADMIN:
      return 'Admin';

    case RoleTeam.MEMBER:
      return 'Thành viên';

    default:
      return '';
  }
};
