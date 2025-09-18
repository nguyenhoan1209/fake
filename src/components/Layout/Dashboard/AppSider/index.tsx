import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Divider } from 'antd';
import { memo, useState, useEffect } from 'react';
import { Bell, FileCheck, FolderOpenDot, House, LayoutGrid, MessageCircleMore, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { PRIVATE_ROUTERS } from 'config/constants';

const AppSider = memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(location.pathname);

  const handleSelectMenu: MenuProps['onClick'] = ({ key, domEvent }) => {
    document.title = (domEvent.target as HTMLElement).textContent || '';
    setSelectedKey(key);
    navigate(key);
  };

  // Update selectedKey when route changes
  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const menuItems: MenuProps['items'] = [
    {
      key: PRIVATE_ROUTERS.HOME,
      label: (
        <div className="mt-2 flex flex-col items-center justify-center gap-1">
          <House strokeWidth={1.25} />
          <span className="text-xs">{t('overview')}</span>
        </div>
      ),
      title: '',
    },
    {
      key: '1',
      label: (
        <div className="mt-2 flex flex-col items-center justify-center gap-1">
          <MessageCircleMore strokeWidth={1.25} />
          <span className="text-xs">{t('users')}</span>
        </div>
      ),
      title: '',
    },
    {
      key: '2',
      label: (
        <div className="mt-2 flex flex-col items-center justify-center gap-1">
          <FileCheck strokeWidth={1.25} />
          <span className="text-xs">{t('users')}</span>
        </div>
      ),
      title: '',
    },
    {
      key: '3',
      label: (
        <div className="mt-2 flex flex-col items-center justify-center gap-1">
          <FolderOpenDot strokeWidth={1.25} />
          <span className="text-xs">{t('users')}</span>
        </div>
      ),
      title: '',
    },
    {
      key: '4',
      label: (
        <div className="mt-2 flex flex-col items-center justify-center gap-1">
          <Bell strokeWidth={1.25} />
          <span className="text-xs">{t('users')}</span>
        </div>
      ),
      title: '',
    },
    {
      key: '5',
      label: (
        <div className="mt-2 flex flex-col items-center justify-center gap-1">
          <Sparkles strokeWidth={1.25} />
          <span className="text-xs">{t('users')}</span>
        </div>
      ),
      title: '',
    },
  ];

  return (
    <div className="flex h-full w-20 flex-col bg-white shadow-md">
      <div className="flex h-10 w-full items-center justify-center">
        <LayoutGrid strokeWidth={1.25} />
      </div>
      <Divider className="my-1" />
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems}
        onClick={handleSelectMenu}
        className="border-0 bg-transparent text-sm font-medium [&_.ant-menu-item]:!flex [&_.ant-menu-item]:!justify-center"
        inlineCollapsed
      />
    </div>
  );
});

export default AppSider;
