export const PUBLIC_ROUTERS = {
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  CHECK_OTP: '/check-otp',
  VERIFY_ACCOUNT: '/verify-account',
  REGISTER: '/register',
  ADMIN_LOGIN: '/ams/login',
  ADMIN_FORGOT_PASSWORD: '/ams/forgot-password',
} as const;

export const PRIVATE_ROUTERS = {
  BASE: '/',
  HOME: '/home',
  ACCOUNT_MANAGEMENT: '/account-management',
  CONFIGURATION: {
    INDEX: '/configuration',
  },

  ADMIN: {
    OVERVIEW: '/ams/overview',
    AGENT: '/ams/agent',
    COMPANY: '/ams/company',
    SUPPORT: '/ams/support',
    SETUP: {
      INDEX: '/ams/setup',
      AUTHORIZATION_CONFIG: '/ams/setup/config-authorization',
      ACCESS_ACCOUNT: '/ams/setup/access-account',
      DOC_MANAGEMENT: '/ams/setup/doc-management',
      ACCOUNT_MANAGEMENT: '/ams/setup/account-management',
    },
  },

  BUSSINESS: {
    OVERVIEW: '/overview',
    DIARY: '/diary',
    CONVERSION_METRICS: '/conversion-metrics',
    SETUP: {
      INDEX: '/setup',
      ENTERPRISE_INFO: '/setup/enterprise-info',
      SERVICE_CONFIG: '/setup/service-config',
      AUTHORIZATION_CONFIG: '/setuporization-config',
      ACCESS_ACCOUNT: '/setup/access-account',
    },
  },
} as const;
