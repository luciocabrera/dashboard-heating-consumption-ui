// React
import React, { useState, useEffect } from 'react';
// Router
import { useHistory, withRouter } from 'react-router-dom';
// Components
import { FormCreate, Spin } from '../../../components/index';
import { notification } from 'antd';
// Services
import * as deviceService from '../../../services/deviceService';

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
  const [device, setDevice] = useState();
  const [existDevice, setExistDevice] = React.useState(false);
  const [isBusy, setIsBusy] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsBusy(true);
      const device = await deviceService.getDevices(
        'byId',
        props.match.params.deviceId
      );
      setDevice(device);
      setExistDevice(true);
      setIsBusy(false);
    };

    if (props.match.params.deviceId) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onConfirmSave = async (values) => {
    if (existDevice === true) {
      await onUpdate(values);
    } else {
      await onCreate(values);
    }
  };

  const onCreate = async (values) => {
    const response = await deviceService.createDevice(values);
    if (response.status === 201) {
      notification.success({
        message: 'Device created!!!',
        description: 'The Device has been successfully created.',
      });
      history.push('/devices');
    }
  };

  const onUpdate = async (values) => {
    values.id = props.match.params.deviceId;
    const response = await deviceService.updateDevice(values);
    if (response.status === 200) {
      notification.success({
        message: 'Device modified!!!',
        description: 'The Device has been successfully modified.',
      });
      history.push('/devices');
    }
  };

  const onConfirmCancel = () => {
    history.push('/devices');
  };

  return (
    <>
      <Spin {...isBusy} />
      <FormCreate
        formItems={formItems}
        onConfirmCancel={onConfirmCancel}
        onConfirmSave={onConfirmSave}
        entity='Device'
        initialValues={device}
      />
    </>
  );
};

export default withRouter(DeviceForm);
