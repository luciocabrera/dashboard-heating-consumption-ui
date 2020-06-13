// React
import React, { useEffect, useState } from 'react';
// Components
import { RouterLink, LayoutWrapper } from '../../components';
import { List, Avatar, Card, Menu, notification, Popconfirm, Row, Col } from 'antd';
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
import Text from 'antd/lib/typography/Text';

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

  const onConfirmDelete = async (deviceId) => {
    await deviceService.deleteDevice(deviceId);
    notification.success({
      message: 'Device deleted!!!',
      description: 'The Device has been successfully deleted.',
    });
    const devices = await deviceService.getDevices();
    setDevices(devices);
  };

  const listData = [];

  devices.forEach((device, i) => {
    listData.push({
      type: 'card',
      href: 'https://ant.design',
      code: device.code,
      id: device.id,
      avatar: device_list_avatar,
      name: device.name,
      description: device.description,
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
              <RouterLink
                key={`router-link-edit-devices-${item.id}`}
                href={`/devices/${item.id}`}
              >
                <EditOutlined key="edit" />
              </RouterLink>,
              <Popconfirm
                title={`Are you sure you want to delete the selected Device ?`}
                onConfirm={() => onConfirmDelete(item.id)}
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined key="delete" />
              </Popconfirm>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar src={device_list_avatar} />}
              title={<div>
                <Row >
                  <div style={{ color: 'darkorange' }}>{item.code}</div>
                </Row>
                <Row >
                  <div style={{ color: 'darkblue' }}>{item.name}</div>
                </Row>
              </div>
              }
              description={item.description}
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
