import type { MenuProps } from 'antd';
import { Dropdown, Image,Input,Form,Button,Space } from 'antd';
import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useBoolean } from 'hooks';
import { logoutUser } from 'store/slices/userSlice';
import { useUpdateProfile } from 'libs/hooks/api/useAuth';
import defaultAvatar from '/images/default-avatar-bpthumb.png';
import { clearModal } from 'store/slices/modalSlice';
import { useSelector } from 'react-redux';
import { navigateToPublicRoute } from 'routes';
import { RootState } from 'types/store';
import { openModal } from 'store/slices/modalSlice';


export const KEY_LIST_CUSTOMER = 'KEY_LIST_CUSTOMER';
export const KEY_UPDATE_LIST_CUSTOMER = 'KEY_UPDATE_LIST_CUSTOMER';

const AppHeader = memo(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [key, setKey] = useState('');
  const [form] = Form.useForm();
  const updateProfile = useUpdateProfile();
  
  

  const currentUser = useSelector((state: RootState) => state.user);
  const isModalUserChangeProfile = useBoolean(false);

  const handleSelectMenu: MenuProps['onClick'] = ({ key, domEvent }): void => {
    document.head.title = (domEvent.target as HTMLElement).textContent as string;
    setKey(key);
    navigate(key);
  };

  const handleAuthLogout = (): void => {
    logoutUser();
    navigate(navigateToPublicRoute());
  };
  const handleUpdateProfile = async (values: {full_name?:string}) => {
    try {
      const formData = new FormData();
      formData.append('full_name', values.full_name || '');
      await updateProfile.mutateAsync(formData).then(() => {
        clearModal();
      });
    }catch (error) {
      console.log('Failed to update profile:', error);
    }
  }


  const itemsMenuDropdown = useMemo((): MenuProps['items'] => {
    const items: MenuProps['items'] = [
      {
        key: '1',
        label: t('personal_information'),
        onClick: () => openModal({
          content: (
            <div className="p-4">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleUpdateProfile}
                initialValues={{
                  full_name: currentUser?.profile?.full_name || '',
                }}
              >
                <Form.Item
                  label="User Name"
                  name="full_name"
                  rules={[
                    { required: true, message: 'Vui lòng nhập họ và tên!' },
                    { min: 2, message: 'Tối thiểu 2 ký tự' },
                  ]}
                >
                  <Input 
                    placeholder="Nhập họ và tên"
                    size="large"
                  />
                </Form.Item>

                <Form.Item className="mb-0">
                  <Space className="w-full justify-end">
                    <Button size="large">
                      Hủy
                    </Button>
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      size="large"
                    >
                      Lưu
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </div>
          ),
          options: {
            title: t('personal_information'),
            width: 300,
            destroyOnClose: true,
          }
        }),
      },
      {
        key: '2',
        label: t('change_password'),
      },
      {
        key: '3',
        label: t('log_out'),
        onClick: handleAuthLogout,
      },
    ];
    return items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <div className="flex h-full w-full items-center justify-end px-8">
      <Dropdown menu={{ items: itemsMenuDropdown }} placement="bottom" className="h-full">
        <div>
          <div className="flex h-full items-center justify-between">
            <div className="flex h-full w-10 items-center overflow-hidden">
              <Image
                src={currentUser?.profile?.avatar_url || defaultAvatar}
                alt={'avatar'}
                preview={false}
                className="flex w-full cursor-pointer items-center overflow-hidden rounded-full object-cover"
                title={'avatar'}
                width={38}
                height={38}
                fallback={defaultAvatar}                                                      
              />
            </div>
            <div className="ms-2 cursor-pointer leading-none">
              <p className="truncate text-sm font-medium">{currentUser?.profile?.full_name || currentUser?.login?.email}</p>
            </div>
          </div>
        </div>
      </Dropdown>
    </div>
  );
});

export default AppHeader;
