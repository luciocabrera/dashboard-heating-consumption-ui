// React
import React, { useEffect } from 'react';
// Components
import { LayoutWrapper, FormBase } from '../../index';
import { Menu, Form as AntdForm, Modal } from 'antd';
// Icons
import {
  SaveOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

const FormCreate = (props) => {
  const [form] = AntdForm.useForm();

  useEffect(() => {
    form.setFieldsValue(props.initialValues);
  }, [form, props.initialValues]);

  const onConfirmCancel = () => {
    Modal.confirm({
      title: 'Cancel action',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to cancel?',
      onOk: () => props.onConfirmCancel(),
    });
  };

  const onConfirmSave = () => {
    Modal.confirm({
      title: 'Save Entry Log',
      icon: <ExclamationCircleOutlined />,
      content: 'Do you want to create the current Entry Log?',
      onOk: () =>
        form
          .validateFields()
          .then(async (values) => {
            props.onConfirmSave(values);
          })
          .catch((errorInfo) => {}),
    });
  };

  const FormMenu = () => (
    <Menu theme='dark' mode='horizontal'>
      <Menu.Item key='menuLogs' icon={<SaveOutlined />} onClick={onConfirmSave}>
        Accept
      </Menu.Item>
      <Menu.Item
        key='menuUsers'
        icon={<CloseCircleOutlined />}
        onClick={onConfirmCancel}
      >
        Cancel
      </Menu.Item>
    </Menu>
  );

  return (
    <LayoutWrapper
      menu={<FormMenu />}
      content={<FormBase form={form} formItems={props.formItems} />}
    />
  );
};

export default FormCreate;
