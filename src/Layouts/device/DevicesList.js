// React
import React, { useEffect, useState } from 'react';
// Components
import { RouterLink, LayoutWrapper } from '../../components';
import { List, Avatar, Card, Menu } from 'antd';
// Icons
import {
  EditOutlined,
  DeleteOutlined,
  ReadOutlined,
  ControlOutlined,
  DatabaseOutlined,
  UserOutlined,
  HomeOutlined,
} from '@ant-design/icons';
/// Assets
import device_list_avatar from '../../assets/img/device_list_avatar.jpg';
// Services
import * as deviceService from '../../services/deviceService';

const DevicesList = (props) => {
  const [devices, setDevices] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const devices = await deviceService.getDevices();
      setDevices(devices);
    };

    fetchData();
  }, []);

  if (!devices || devices.length === 0) return <div>nothing loaded</div>;

  const listData = [];

  devices.forEach((device, i) => {
    listData.push({
      type: 'card',
      href: 'https://ant.design',
      title: device.code,
      avatar: device_list_avatar,
      description: device.name,
      content: device.description,
    });
  });

  const DevicesListMenu = () => (
    <Menu theme="dark" mode="horizontal">
      <Menu.Item key="menuHome" icon={<HomeOutlined />}>
        <RouterLink key={`router-link-devices`} href="/">
          Home
        </RouterLink>
      </Menu.Item>
      <Menu.Item key="menuNew" icon={<ControlOutlined />}>
        <RouterLink key={`router-link-devices`} href="/devices/create">
          New Device
        </RouterLink>
      </Menu.Item>
      <Menu.Item key="menuLogs" icon={<DatabaseOutlined />}>
        Logs
      </Menu.Item>
      <Menu.Item key="menuUsers" icon={<UserOutlined />}>
        Users
      </Menu.Item>
    </Menu>
  );

  const DevicesListContent = () => (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3,
      }}
      itemLayout="vertical"
      size="large"
      dataSource={listData}
      renderItem={(item) => (
        <List.Item key={item.title}>
          <Card
            hoverable
            actions={[
              <ReadOutlined key="logs" />,
              <EditOutlined key="edit" />,
              <DeleteOutlined key="delete" />,
            ]}
          >
            <Card.Meta
              avatar={<Avatar src={device_list_avatar} />}
              title={item.title}
              description={item.content}
            />
          </Card>
        </List.Item>
      )}
    />
  );

  return (
    <LayoutWrapper
      menu={<DevicesListMenu />}
      content={<DevicesListContent />}
    />
  );
};

export default DevicesList;
