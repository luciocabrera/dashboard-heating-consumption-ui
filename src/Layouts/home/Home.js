// React
import * as React from 'react';
// Components
import { RouterLink, LayoutWrapper } from '../../components';
import { Menu } from 'antd';
// Icons
import {
  ControlOutlined,
  DatabaseOutlined,
  UserOutlined,
} from '@ant-design/icons';

const Home = (props) => {
  props.getDevices();

  const HomeMenu = () => (
    <Menu theme='dark' mode='horizontal'>
      <Menu.Item key='menuDevices' icon={<ControlOutlined />}>
        <RouterLink key={`router-link-devices`} href='/devices'>
          Devices
        </RouterLink>
      </Menu.Item>
      <Menu.Item key='menuLogs' icon={<DatabaseOutlined />}>
        Logs
      </Menu.Item>
      <Menu.Item key='menuUsers' icon={<UserOutlined />}>
        Users
      </Menu.Item>
    </Menu>
  );

  return <LayoutWrapper menu={<HomeMenu />} />;
};

export default Home;
