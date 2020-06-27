// React
import React, { useEffect, useState } from 'react';
// Components
import { RouterLink, LayoutWrapper } from '../../components';
import { Menu } from 'antd';
// Icons
import {
    ControlOutlined,
    DatabaseOutlined,
    UserOutlined,
    HomeOutlined,
} from '@ant-design/icons';

// Services
import * as logService from '../../services/logService';
import Table from '../../components/table/Table';

const DeviceLogs = (props) => {
    const [deviceLogs, setDeviceLogs] = useState([]);
    // We'll start our table without any data
  //  const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    // const [pageCount, setPageCount] = React.useState(0)
    // const fetchIdRef = React.useRef(0)


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const response = await logService.getLogs('byDeviceId', props.deviceId);
            setDeviceLogs(response.logs);
            setLoading(false)
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
        ],
        []
    )

//     const fetchData = ({ pageSize, pageIndex }) => {
//         // This will get called when the table needs new data

// console.log({ pageSize:pageSize, pageIndex: pageIndex });
//         // Give this fetch an ID
//         const fetchId = ++fetchIdRef.current

//         // Set the loading state
//         setLoading(true)


//         // Only update the data if this is the latest fetch
//         if (fetchId === fetchIdRef.current) {
//             const startRow = pageSize * pageIndex
//             const endRow = startRow + pageSize

//             // const fetchData = async () => {
//             //     const response = await logService.getLogs('byDeviceId', props.deviceId);
//             //     setDeviceLogs(response.logs);
//             // };

//             // fetchData();
//             const xx = [...deviceLogs]
//             setData(xx.slice(startRow, endRow))

//             // Your server could send back total page count.
//             // For now we'll just fake it, too
//             setPageCount(Math.ceil(deviceLogs.length / pageSize))

//             setLoading(false)
//         }

//     }



    // const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    //     // This will get called when the table needs new data


    //     // Give this fetch an ID
    //     const fetchId = ++fetchIdRef.current

    //     // Set the loading state
    //     setLoading(true)


    //     // Only update the data if this is the latest fetch
    //     if (fetchId === fetchIdRef.current) {
    //         const startRow = pageSize * pageIndex
    //         const endRow = startRow + pageSize

    //         // const fetchData = async () => {
    //         //     const response = await logService.getLogs('byDeviceId', props.deviceId);
    //         //     setDeviceLogs(response.logs);
    //         // };

    //         // fetchData();
    //         const xx = [...deviceLogs]
    //         setData(xx.slice(startRow, endRow))

    //         // Your server could send back total page count.
    //         // For now we'll just fake it, too
    //         setPageCount(Math.ceil(deviceLogs.length / pageSize))

    //         setLoading(false)
    //     }

    // }, [deviceLogs])

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
        // <Styles>
        <Table
            columns={columns}
            data={deviceLogs}
          //  fetchData={fetchData}
            loading={loading}
            pageCount={6}
        />
        // </Styles>
    );

    return (
        <LayoutWrapper
            menu={<DevicesListMenu />}
            content={<DevicesListContent />}
        />
    );
};

export default DeviceLogs;
