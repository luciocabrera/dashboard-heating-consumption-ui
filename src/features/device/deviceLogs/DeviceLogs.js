// React
import React, { useEffect, useState, useMemo } from 'react';
// Component Styles wrapper
import DeviceLogsStyled from './DeviceLogsStyled';
// Router
import { withRouter } from 'react-router-dom';
import useWindowSize from '../../../hooks/useWindowSize/useWindowSize';
import { Avatar, Card, Menu, Row, Col, Statistic } from 'antd';
// Components
import {
  RouterLink,
  LayoutWrapper,
  Spin,
  LineChart,
} from '../../../components';
import Table from '../../../components/table/Table';
// Icons
import {
  EditOutlined,
  ReadOutlined,
  ControlOutlined,
  DatabaseOutlined,
  UserOutlined,
  HomeOutlined,
} from '@ant-design/icons';
/// Assets
import device_list_avatar from '../../../assets/img/device_list_avatar.jpg';
// Services
import * as logService from '../../../services/logService';
// import StatisticCard from '../../../components/statistic/StatisticCard';
// import sta from '../../../components/statistic/sta.svg';
// import styled from 'styled-components';

// const Wrap = styled.div`
//   background-image: url(${sta});
// `;

const DeviceLogs = (props) => {
  const size = useWindowSize();
  console.log(size);
  const pageSize = Math.round((size.height - 218) / 27);

  const [deviceLogs, setDeviceLogs] = useState([]);
  // const pageCount =
  //   deviceLogs.logs && deviceLogs.logs.length > 0
  //     ? Math.round(deviceLogs.logs.length / pageSize)
  //     : 1;
  // We'll start our table without any data
  //  const [data, setData] = React.useState([])
  const [isBusy, setIsBusy] = useState(false);
  // const [pageCount, setPageCount] = React.useState(0)
  // const fetchIdRef = React.useRef(0)

  useEffect(() => {
    const fetchData = async () => {
      setIsBusy(true);
      const response = await logService.getLogs(
        'byDeviceId',
        props.match.params.deviceId
      );
      setDeviceLogs(response);
      setIsBusy(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(
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
      {
        width: 300,
        Header: '',
        accessor: 'actions',
        Cell: ({ cell }) => (
          <button value={cell.row.values.name} onClick={props.handleClickGroup}>
            delete
          </button>
        ),
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
                key={`router-link-edit-devices-${props.match.params.deviceId}`}
                href={`/devices/${props.match.params.deviceId}`}
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
          <div
            style={{ position: 'relative' }}
          >
            <svg
              viewBox='0 0 500 150'
              preserveAspectRatio='none'
              className='patterns-content'
              style={{ height: '70px', width: '100%' }}
            >
              <path
                d='M0.00,92.27 C216.83,192.92 304.30,8.39 500.00,109.03 L500.00,0.00 L0.00,0.00 Z'
                style={{ stroke: 'none', fill: '#e1efe3' }}
              ></path>
            </svg>
            <Card hoverable>
              <Statistic
                title='First Reading B'
                value={deviceLogs.logs[deviceLogs.logs.length - 1].readingB}
                prefix={<ReadOutlined />}
                valueStyle={{ color: 'darkblue' }}
              />
            </Card>
          </div>
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
    return <Spin isBusy={true} />;

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
      loading={isBusy}
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
    <DeviceLogsStyled>
      <Spin isBusy={isBusy} />
      <LayoutWrapper
        menu={<DevicesListMenu />}
        content={<DeviceLogsContent />}
      />
    </DeviceLogsStyled>
  );
};

export default withRouter(DeviceLogs);
