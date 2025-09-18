import { Button } from 'antd';
import { ButtonProps } from 'antd/lib';
import { t } from 'i18next';
import { EButtonPattern } from 'types';

const renderClass = (pattern?: EButtonPattern): string | undefined => {
  switch (pattern) {
    case EButtonPattern.ADD:
      return 'bg-white hover:opacity-80 text-slate-900 hover:bg-slate-200 active:bg-slate-300';
    case EButtonPattern.UPDATE:
      return 'bg-primary text-white';
    case EButtonPattern.DELETE:
      return 'text-white bg-red-500 !hover:bg-red-500 !active:bg-red-600';
    case EButtonPattern.FOOTER:
      return 'w-full bg-primary mt-2';
    case EButtonPattern.SEARCH:
      return 'text-white bg-green-400 hover:bg-green-500 active:bg-green-600';
    case EButtonPattern.PRIMARY:
    default:
      return 'text-blue-400 bg-white !hover:bg-blue-400 hover:text-white';
  }
};

const renderType = (pattern?: EButtonPattern): 'link' | 'text' | 'default' | 'primary' | 'dashed' | undefined => {
  switch (pattern) {
    case EButtonPattern.ADD:
      return 'default';
    case EButtonPattern.UPDATE:
      return 'default';
    case EButtonPattern.DELETE:
      return 'text';
    case EButtonPattern.FOOTER:
      return 'default';
    case EButtonPattern.SEARCH:
      return 'default';
    case EButtonPattern.PRIMARY:
    default:
      return 'primary';
  }
};

const ButtonGlobal = ({
  title,
  pattern = EButtonPattern.PRIMARY,
  className,
  icon,
  type,
  ...props
}: ButtonProps & { pattern?: EButtonPattern }) => {
  return (
    <Button
      className={`${renderClass(
        pattern,
      )} flex w-fit min-w-[100px] items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 py-1 font-semibold shadow-md ${className}`}
      type={type ?? renderType(pattern)}
      {...props}
    >
      {title}
      {icon}
    </Button>
  );
};

ButtonGlobal.Add = (props: ButtonProps & { pattern?: EButtonPattern }) => (
  <ButtonGlobal pattern={EButtonPattern.ADD} title={t('add')} {...props} />
);
ButtonGlobal.Update = (props: ButtonProps & { pattern?: EButtonPattern }) => (
  <ButtonGlobal pattern={EButtonPattern.ADD} title={t('update')} {...props} />
);
ButtonGlobal.Delete = (props: ButtonProps & { pattern?: EButtonPattern }) => (
  <ButtonGlobal pattern={EButtonPattern.DELETE} title={t('delete')} {...props} />
);
ButtonGlobal.Search = (props: ButtonProps & { pattern?: EButtonPattern }) => (
  <ButtonGlobal pattern={EButtonPattern.SEARCH} title={t('search')} {...props} />
);
ButtonGlobal.Footer = (props: ButtonProps & { pattern?: EButtonPattern; isUpdate: boolean }) =>
  props.isUpdate ? (
    <ButtonGlobal pattern={EButtonPattern.FOOTER} title={t('update')} {...props} />
  ) : (
    <ButtonGlobal pattern={EButtonPattern.FOOTER} title={t('create')} {...props} />
  );

export const HeaderTable = ({
  title,
  onCreate,
  onBulkDelete,
}: {
  title?: string;
  onCreate: () => void;
  onBulkDelete: () => void;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className={`text-xl font-bold`}>
        <span>{title}</span>
      </div>
      <div className="flex justify-between gap-2">
        <ButtonGlobal.Add onClick={() => onCreate()} />
        <ButtonGlobal.Delete onClick={() => onBulkDelete()} />
      </div>
    </div>
  );
};

export default ButtonGlobal;
