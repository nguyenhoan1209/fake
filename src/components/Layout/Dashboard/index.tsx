import type { FC } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import classes from './Dashboard.module.scss';
import AppSider from './AppSider';
import AppHeader from './AppHeader';

const SIDER_WIDTH = 80; // px, adjust if your sider is wider

const DashboardLayout: FC = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }} className={classes.dashboard}>
      <div
        style={{ width: SIDER_WIDTH, height: '100vh', position: 'fixed', left: 0, top: 0, zIndex: 100 }}
        className="!bg-white !shadow-md"
      >
        <AppSider />
      </div>
      <div style={{ flex: 1, marginLeft: SIDER_WIDTH }}>
        <Layout style={{ minHeight: '100vh', background: 'white' }}>
          <Layout.Header
            className="bg-white"
            style={{
              paddingLeft: 24,
              paddingRight: 24,
              paddingTop: 0,
              paddingBottom: 0,
              height: 44,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <AppHeader />
          </Layout.Header>
          <Layout.Content className="bg-white px-4 pb-2 pt-2">
            <Outlet />
          </Layout.Content>
        </Layout>
      </div>
    </div>
  );
};

export default DashboardLayout;
