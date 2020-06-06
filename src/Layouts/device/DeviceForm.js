// React
import React from 'react';
// Router
import { useHistory } from 'react-router-dom';
// Components
import { LayoutWrapper, Form } from '../../components';
import { Popconfirm, Menu,  Form as AntdForm } from 'antd';
// Icons
import { SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';
// Services
import * as deviceService from '../../services/deviceService';

const formItems = [
  {
    name: 'code',
    label: 'Code',
    rules: [
      {
        required: true,
        message: 'Please enter the Code!',
      },
      { min: 3, message: 'The Code must be of at least 3 characters' },
      { max: 24, message: 'The Code must be of maximum 24 characters' },
    ],
  },
  {
    name: 'name',
    label: 'Name',
    rules: [
      {
        required: true,
        message: 'Please enter the Name!',
      },
      { min: 3, message: 'The Code must be of at least 3 characters' },
      { max: 64, message: 'The Code must be of maximum 64 characters' },
    ],
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textArea',
    rules: [
      { min: 3, message: 'The Code must be of at least 3 characters' },
      { max: 128, message: 'The Code must be of maximum 128 characters' },
    ],
  },
];

const DeviceForm = (props) => {
  const history = useHistory();
  const [form] = AntdForm.useForm();

  const onConfirmSave = () => {
    form
      .validateFields()
      .then(async (values) => {
        const response = await deviceService.createDevice(values);
        if (response.status === 201) history.push('/devices');
      })
      .catch((errorInfo) => {});
  };

  const onConfirmCancel = () => {
    history.push('/devices');
  };

  const DevicesFormMenu = () => (
    <Menu theme="dark" mode="horizontal">
      <Menu.Item key="menuLogs" icon={<SaveOutlined />}>
        <Popconfirm
          title="do you want to create the current Device ?"
          onConfirm={onConfirmSave}
          okText="Yes"
          cancelText="No"
        >
          Accept
        </Popconfirm>
      </Menu.Item>
      <Menu.Item key="menuUsers" icon={<CloseCircleOutlined />}>
        <Popconfirm
          title="Are you sure you want to cancel?"
          onConfirm={onConfirmCancel}
          okText="Yes"
          cancelText="No"
        >
          Cancel
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  return (
    <LayoutWrapper
      menu={<DevicesFormMenu />}
      content={<Form formItems={formItems} form={form} />}
    />
  );
};

export default DeviceForm;
