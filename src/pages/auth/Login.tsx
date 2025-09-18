import type { FC } from 'react';

import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

import { PUBLIC_ROUTERS, REGEX } from 'config/constants';

import FormBoxItem from 'components/custom/Form/FormBoxItem';
import { AppAuthentication } from 'components/Layout/Auth/AppAuthentication';
import classes from 'components/Layout/Auth/AppAuthentication/AppAuthentication.module.scss';
import { TFunction } from 'i18next';
import { useLogin, useValidation } from 'libs/hooks';
import { useTranslation } from 'react-i18next';
import { IFormBoxItem } from 'types/components';
import { z } from 'zod';

const schema = (t: TFunction) =>
  z.object({
    email: z
      .string({
        required_error: t('error_message.please_enter_field', { field: t('auth.email') }),
      })
      .regex(REGEX.EMAIL, t('error_message.field_invalid', { field: t('auth.email') })),
    password: z
      .string({ required_error: t('error_message.please_enter_field', { field: t('auth.password') }) })
      .min(1, t('error_message.min_length_field', { field: t('auth.password'), length: 6 })),
  });

type FormSchema = z.infer<ReturnType<typeof schema>>;

export const LoginPage: FC = () => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(schema(t));

  const { mutateAsync: login } = useLogin();

  const handleSubmitForm = (values: FormSchema): void => {
    const formData = new FormData();
    formData.append('username', values.email.trim());
    formData.append('password', values.password.trim());
    login(formData);
  };


  const formListItems: IFormBoxItem<FormSchema>[] = [
    {
      name: 'email',
      label: t('auth.email'),
      children: (
        <Input
          placeholder={t('placeholder.enter_field', { field: t('auth.email') })}
        />
      ),
    },
    {
      name: 'password',
      label: t('auth.password'),
      children: (
        <div className="relative">
          <Input.Password
            placeholder={t('placeholder.enter_field', { field: t('auth.password') })}
          />
          <Link
            to={PUBLIC_ROUTERS.FORGOT_PASSWORD}
            className="absolute right-0 top-[-28px] text-sm text-primary no-underline"
          >
            <span>{t('auth.forgot_password')}</span>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <AppAuthentication title={t('auth.login')} description={t('auth.paragraph.login_description')}>
      <Form
        layout="vertical"
        form={form}
        autoComplete="off"
        onFinish={handleSubmitForm}
        className={classes['authentication_form']}
        validateTrigger={['onBlur', 'onSubmit']}
      >
        <FormBoxItem listItems={formListItems} defaultSpan={24} columnGap={[20, 20]} rule={rule} />
        <div className={classes['login_button']}>
          <Button
            htmlType="submit"
            type="primary"
            block
            className="mt-10 flex items-center justify-center font-semibold"
          >
            {t('auth.login')}
          </Button>

          <div className="mt-4 text-center italic">
            {t('auth.not_account')}.
            <Link to={PUBLIC_ROUTERS.REGISTER} className="ml-2 cursor-pointer font-semibold text-primary">
              {t('auth.register')}
            </Link>
          </div>
        </div>
      </Form>
    </AppAuthentication>
  );
};
