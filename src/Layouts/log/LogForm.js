// React
import React, { useState, useEffect } from 'react';
// Router
import { useHistory } from 'react-router-dom';
// Components
import { FormCreate } from '../../components/index';
import { notification } from 'antd';
// Services
import * as logService from '../../services/logService';

const formItems = [
  {
    name: 'date',
    label: 'Date',
    type: 'datePicker',
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
    name: 'readingA',
    label: 'Reading A',
    rules: [
      {
        required: true,
        message: 'Please enter the Reading A!',
      },
    ],
  },
  {
    name: 'readingB',
    label: 'Reading B',
    rules: [
      {
        required: true,
        message: 'Please enter the Reading B!',
      },
    ],
  },
];

const LogForm = (props) => {
  const history = useHistory();
  const [log, setLog] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const log = await logService.getLogs('byId', props.logId);
      setLog(log);
    };

    if (props.mode === 'edit') fetchData();
  }, [props.logId, props.mode]);

  const onConfirmSave = async (values) => {
    if (props.mode === 'new') await onCreate(values);
    if (props.mode === 'edit') await onUpdate(values);
  };

  const onCreate = async (values) => {
    const response = await logService.createDevice(values);
    if (response.status === 201) {
      notification.success({
        message: 'Entry Log created!!!',
        description: 'The Entry Log has been successfully created.',
      });
      history.push(`/devices/${props.logId}`);
    }
  };

  const onUpdate = async (values) => {
    values.id = props.logId;
    const response = await logService.updateLog(values);
    if (response.status === 200) {
      notification.success({
        message: 'Entry Log modified!!!',
        description: 'The Entry Log has been successfully modified.',
      });
      history.push(`/devices/${props.logId}`);
    }
  };

  const onConfirmCancel = () => {
    history.push(`/devices/${props.logId}`);
  };

  return (
    <FormCreate
      formItems={formItems}
      onConfirmCancel={onConfirmCancel}
      onConfirmSave={onConfirmSave}
      entity='Log'
      initialValues={log}
    />
  );
};

export default LogForm;
