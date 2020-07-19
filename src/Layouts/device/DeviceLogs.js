/* eslint-disable no-unused-vars */
// React
import React, { useEffect, useState } from 'react';
import useWindowSize from '../../hooks/useWindowSize/useWindowSize';
import styled from 'styled-components';
import {
  List,
  Avatar,
  Card,
  Menu,
  notification,
  Popconfirm,
  Row,
  Col,
  Statistic,
} from 'antd';
// Components
import { RouterLink, LayoutWrapper } from '../../components';
// Icons
import {
  EditOutlined,
  ReadOutlined,
  ControlOutlined,
  DatabaseOutlined,
  UserOutlined,
  HomeOutlined,
  FileOutlined,
} from '@ant-design/icons';
/// Assets
import device_list_avatar from '../../assets/img/device_list_avatar.jpg';

// Services
import * as logService from '../../services/logService';
import Table from '../../components/table/Table';
import LineChart from '../../components/chart/LineChart/LineChart';

const testPadding = `8px`;

const Styles = styled.div`
  .ant-row {
    flex-flow: nowrap;
    margin: 0px !important;
  }

  .ant-col-12 {
    max-width: 50% !important;
    width: 50% !important;
    overflow: hidden;
  }

  .statistic-col {
    max-width: 33% !important;
    min-width: 33% !important;
    width: 33% !important;
    padding: ${testPadding} !important;
  }

  .col-total-logs {
    max-width: 33% !important;
    min-width: 33% !important;
    width: 33% !important;
    padding-top: 0px !important;
    padding-left: 8px !important;
  }

  .col-main-card {
    padding-left: 8px !important;
    width: 66%;
  }

  .chart-sum {
    width: 97% !important;
    height: 142px !important;
  }
`;

const DeviceLogs = (props) => {
  const size = useWindowSize();
  console.log(size);
  const pageSize = Math.round((size.height - 218) / 27);

  const [deviceLogs, setDeviceLogs] = useState([]);
  const pageCount =
    deviceLogs.logs && deviceLogs.logs.length > 0
      ? Math.round(deviceLogs.logs.length / pageSize)
      : 1;
  // We'll start our table without any data
  //  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false);
  // const [pageCount, setPageCount] = React.useState(0)
  // const fetchIdRef = React.useRef(0)

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true)
      const response = await logService.getLogs('byDeviceId', props.deviceId);
      setDeviceLogs(response);
      // setLoading(false)
    };

    fetchData();
  }, [props.deviceId]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Reading A',
        accessor: 'readingA',
      },
      {
        Header: 'Reading B',
        accessor: 'readingB',
      },
      {
        Header: 'Diff',
        accessor: 'dif',
      },
      {
        Header: 'Comment',
        accessor: 'comment',
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const DeviceDetails = () => (
    <>
      <Row gutter={16}>
        <Col className='col-main-card'>
          <Card
            hoverable
            actions={[
              <RouterLink
                key={`router-link-logs-devices-${deviceLogs.device.id}`}
                href={`/devices/${deviceLogs.device.id}/logs`}
              >
                <ReadOutlined key='logs' />
              </RouterLink>,
              <RouterLink
                key={`router-link-edit-devices-${deviceLogs.device.id}`}
                href={`/devices/${deviceLogs.device.id}`}
              >
                <EditOutlined key='edit' />
              </RouterLink>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar src={device_list_avatar} />}
              title={
                <div>
                  <Row>
                    <div style={{ color: 'darkorange' }}>
                      {deviceLogs.device.code}
                    </div>
                  </Row>
                  <Row>
                    <div style={{ color: 'darkblue' }}>
                      {deviceLogs.device.name}
                    </div>
                  </Row>
                </div>
              }
              description={deviceLogs.device.description}
            />
          </Card>
        </Col>
        <Col className='col-total-logs'>
          <Card hoverable>
            <Statistic
              title='Total Logs'
              value={deviceLogs.totalCount}
              prefix={<DatabaseOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8} className='statistic-col'>
          <Card hoverable>
            <Statistic
              title='First Reading A'
              value={deviceLogs.logs[deviceLogs.logs.length - 1].readingA}
              prefix={<ReadOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={8} className='statistic-col'>
          <Card hoverable>
            <Statistic
              title='Last Reading A'
              value={deviceLogs.logs[0].readingA}
              prefix={<ReadOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={8} className='statistic-col'>
          <Card hoverable>
            <Statistic
              title='Diff A'
              value={
                deviceLogs.logs[0].readingA -
                deviceLogs.logs[deviceLogs.logs.length - 1].readingA
              }
              prefix={<ReadOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8} className='statistic-col'>
          <Card hoverable>
            <Statistic
              title='First Reading B'
              value={deviceLogs.logs[deviceLogs.logs.length - 1].readingB}
              prefix={<ReadOutlined />}
              valueStyle={{ color: 'darkblue' }}
            />
          </Card>
        </Col>
        <Col span={8} className='statistic-col'>
          <Card hoverable>
            <Statistic
              title='Last Reading B'
              value={deviceLogs.logs[0].readingB}
              prefix={<ReadOutlined />}
              valueStyle={{ color: 'darkblue' }}
            />
          </Card>
        </Col>
        <Col span={8} className='statistic-col'>
          <Card hoverable>
            <Statistic
              title='Diff B'
              value={
                deviceLogs.logs[0].readingB -
                deviceLogs.logs[deviceLogs.logs.length - 1].readingB
              }
              prefix={<ReadOutlined />}
              valueStyle={{ color: 'darkblue' }}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} className='chart-sum'>
        <LineChart data={deviceLogs.chartData} />
      </Row>
    </>
  );
  if (!deviceLogs.logs || deviceLogs.logs.length === 0)
    return <div>nothing loaded</div>;

  //   const onConfirmDelete = async (logId) => {
  //     await deviceLogs.deleteLog(logId);
  //     notification.success({
  //       message: 'Log entry deleted!!!',
  //       description: 'The Log entry has been successfully deleted.',
  //     });
  //     const logs = await logService.getLogs('byDeviceId', props.deviceId);
  //     setDeviceLogs(logs);
  //   };

  const DevicesListMenu = () => (
    <Menu theme='dark' mode='horizontal'>
      <Menu.Item key='menuHome' icon={<HomeOutlined />}>
        <RouterLink key={`router-link-devices`} href='/'>
          Home
        </RouterLink>
      </Menu.Item>
      <Menu.Item key='menuDevices' icon={<ControlOutlined />}>
        <RouterLink key={`router-link-devices`} href={`/devices`}>
          Devices
        </RouterLink>
      </Menu.Item>
      <Menu.SubMenu icon={<ControlOutlined />} title='New Log'>
        <Menu.Item key='menuNewSingleLog' icon={<ControlOutlined />}>
          <RouterLink
            key={`router-link-new-log`}
            href={`/devices/${props.deviceId}/logs/create`}
          >
            Single Entry
          </RouterLink>
        </Menu.Item>
        <Menu.Item key='menuNewMultipleLog' icon={<ControlOutlined />}>
          <RouterLink
            key={`router-link-new-log`}
            href={`/devices/${props.deviceId}/logs/createrange`}
          >
            Multiple Entries
          </RouterLink>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key='menuUsers' icon={<UserOutlined />}>
        Users
      </Menu.Item>
    </Menu>
  );

  const LogsTable = () => (
    <Table
      columns={columns}
      data={deviceLogs.logs}
      //  fetchData={fetchData}
      loading={loading}
      pageSize={pageSize}
    />
  );

  const DeviceLogsContent = () => (
    <Row gutter={[32, 32]}>
      <Col span={12}>
        <DeviceDetails />
      </Col>
      <Col span={12}>
        <LogsTable />
      </Col>
    </Row>
  );

  return (
    <Styles>
      <LayoutWrapper
        menu={<DevicesListMenu />}
        content={<DeviceLogsContent />}
      />
    </Styles>
  );
};

export default DeviceLogs;
