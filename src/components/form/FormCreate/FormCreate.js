// React
import React from 'react';
// Components
import { LayoutWrapper, FormBase } from '../../index';
import { Popconfirm, Menu, Form as AntdForm, Modal } from 'antd';
// Icons
import {
  SaveOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

const FormCreate = (props) => {
  const [form] = AntdForm.useForm();

  React.useEffect(() => {
    form.setFieldsValue(props.initialValues);
  }, [form, props.initialValues]);

  // const onConfirmSave = () => {
  //   form
  //     .validateFields()
  //     .then(async (values) => {
  //       props.onConfirmSave(values);
  //     })
  //     .catch((errorInfo) => {});
  // };

  const onConfirmCancel = () => {
    Modal.confirm({
      title: 'Save Entry Log',
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
        {/* <Popconfirm
          title={`do you want to create the current ${props.entiity} ?`}
          onConfirm={onConfirmSave}
          okText='Yes'
          cancelText='No'
        > */}
        Accept
        {/* </Popconfirm> */}
      </Menu.Item>
      <Menu.Item
        key='menuUsers'
        icon={<CloseCircleOutlined />}
        onClick={onConfirmCancel}
      >
        {/* <Popconfirm
          title='Are you sure you want to cancel?'
          onConfirm={onConfirmCancel}
          okText='Yes'
          cancelText='No'
        > */}
        Cancel
        {/* </Popconfirm> */}
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
