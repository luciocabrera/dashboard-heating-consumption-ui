// React
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// Components
import { Spin, RouterLink, LayoutWrapper } from '../../components';
import { List, Avatar, Card, Menu, notification, Popconfirm, Row } from 'antd';
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

const Styles = styled.div`
  .ant-card,
  .ant-card-bordered {
    min-width: 200px !important;
    max-width: 348px !important;
    width: 348px !important;
    border-radius: 15px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  }

  .ant-card-hoverable:hover {
    transform: scale(1.057);
    cursor: pointer;
    transition: transform 0.2s;
    will-change: transform;
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16),
      0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09) !important;
  }

  .ant-card-actions {
    border-radius: 15px;
  }

  .ant-card-body {
    min-height: 134px !important;
    max-height: 134px !important;
  }

  .ant-col {
    min-width: 200px !important;
    max-width: 348px !important;
    width: 348px !important;
    margin-right: 20px !important;
  }

  .ant-layout-content {
    padding: 30px !important;
    margin-top: 15px !important;
    height: calc(100vh - 123px) !important;
    overflow-x: auto !important;
  }
`;

const DevicesList = (props) => {
  const [devices, setDevices] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const devices = await deviceService.getDevices();
      setDevices(devices);
    };

    fetchData();
  }, []);

  if (!devices || devices.length === 0) return <Spin tip='Loading...' />;

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
    <Menu theme='dark' mode='horizontal'>
      <Menu.Item key='menuHome' icon={<HomeOutlined />}>
        <RouterLink key={`router-link-devices`} href='/'>
          Home
        </RouterLink>
      </Menu.Item>
      <Menu.Item key='menuNew' icon={<ControlOutlined />}>
        <RouterLink key={`router-link-devices`} href='/devices/create'>
          New Device
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
      itemLayout='vertical'
      size='large'
      dataSource={listData}
      renderItem={(item) => (
        <List.Item key={item.title}>
          <Card
            hoverable
            actions={[
              <RouterLink
                key={`router-link-logs-devices-${item.id}`}
                href={`/devices/${item.id}/logs`}
              >
                <ReadOutlined key='logs' />
              </RouterLink>,
              <RouterLink
                key={`router-link-edit-devices-${item.id}`}
                href={`/devices/${item.id}`}
              >
                <EditOutlined key='edit' />
              </RouterLink>,
              <Popconfirm
                title={`Are you sure you want to delete the selected Device ?`}
                onConfirm={() => onConfirmDelete(item.id)}
                okText='Yes'
                cancelText='No'
              >
                <DeleteOutlined key='delete' />
              </Popconfirm>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar src={device_list_avatar} />}
              title={
                <div>
                  <Row>
                    <div style={{ color: 'darkorange' }}>{item.code}</div>
                  </Row>
                  <Row>
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
    <Styles>
      <LayoutWrapper
        menu={<DevicesListMenu />}
        content={<DevicesListContent />}
      />
    </Styles>
  );
};

export default DevicesList;
