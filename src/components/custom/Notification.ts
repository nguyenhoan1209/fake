import { notification } from 'antd';
import { t } from 'i18next';
import { ReactNode } from 'react';

const notifySuccess = (message: ReactNode = t('success'), description?: ReactNode, duration?: number) =>
  notification.success({
    message,
    description,
    duration,
  });

const notifyError = (message: ReactNode, description?: ReactNode, duration?: number) =>
  notification.error({
    message,
    description,
    duration,
  });

export { notifyError, notifySuccess };
