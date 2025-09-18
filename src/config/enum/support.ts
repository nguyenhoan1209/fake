import type { Namespace, TFunction } from 'i18next';

export enum SupportStatus {
  WAITING,
  PROCESSING,
  DONE,
}

export const convertSupportStatusToName = (key: SupportStatus): string => {
  switch (key) {
    case SupportStatus.WAITING:
      return 'WAITING';

    case SupportStatus.PROCESSING:
      return 'PROCESSING';

    case SupportStatus.DONE:
      return 'DONE';

    default:
      return '';
  }
};

export const convertSupportStatusToText = (key: SupportStatus, t: TFunction<Namespace>): string => {
  switch (key) {
    case SupportStatus.WAITING:
      return t('support_status.waiting');

    case SupportStatus.PROCESSING:
      return t('support_status.processing');

    case SupportStatus.DONE:
      return t('support_status.done');

    default:
      return '';
  }
};
