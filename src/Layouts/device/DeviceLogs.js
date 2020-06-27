// React
import React, { useEffect, useState } from 'react';
// Components
import { RouterLink, LayoutWrapper } from '../../components';
import {  Menu} from 'antd';
// Icons
import {
  ControlOutlined,
  DatabaseOutlined,
  UserOutlined,
  HomeOutlined,
} from '@ant-design/icons';

// Services
import * as logService from '../../services/logService';
import InfiniteTable from '../../components/table/InfiniteTable';

const DeviceLogs = (props) => {
  const [deviceLogs, setDeviceLogs] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const logs = await logService.getLogs('byDeviceId', props.deviceId);
      setDeviceLogs(logs);
    };

    fetchData();
  }, [props.deviceId]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
          },
          {
            Header: 'Visits',
            accessor: 'visits',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
          },
        ],
      },
    ],
    []
  )

  // We'll start our table without any data
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [pageCount, setPageCount] = React.useState(0)
  const fetchIdRef = React.useRef(0)

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    // This will get called when the table needs new data
    // You could fetch your data from literally anywhere,
    // even a server. But for this example, we'll just fake it.

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current

    // Set the loading state
    setLoading(true)

    // We'll even set a delay to simulate a server here
    setTimeout(() => {
      // Only update the data if this is the latest fetch
      if (fetchId === fetchIdRef.current) {
        const startRow = pageSize * pageIndex
        const endRow = startRow + pageSize
        setData(deviceLogs.slice(startRow, endRow))

        // Your server could send back total page count.
        // For now we'll just fake it, too
        setPageCount(Math.ceil(deviceLogs.length / pageSize))

        setLoading(false)
      }
    }, 1000)
  }, [])

  if (!deviceLogs || deviceLogs.length === 0) return <div>nothing loaded</div>;

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
    <Styles>
      <Table
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
      />
    </Styles>
  );

  return (
    <LayoutWrapper
      menu={<DevicesListMenu />}
      content={<DevicesListContent />}
    />
  );
};

export default DeviceLogs;
