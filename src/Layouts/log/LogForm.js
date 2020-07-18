// React
import React, { useState, useEffect } from 'react';
// Router
import { useHistory } from 'react-router-dom';
// Components
import { FormCreate } from '../../components/index';
import { notification } from 'antd';
// Services
import * as logService from '../../services/logService';

const LogForm = (props) => {
  const history = useHistory();
  const [log, setLog] = useState();

  const formItems = [
    {
      name: 'date',
      label: 'Date',
      type: props.mode === 'range' ? 'rangePicker' : 'datePicker',
      rules: [
        {
          required: true,
        },
      ],
    },
    {
      name: 'readingA',
      label: 'Reading A',
      type: 'inputNumber',
      rules: [
        {
          required: true,
          type: 'number',
          min: 0,
          max: 9999,
        },
      ],
    },
    {
      name: 'readingB',
      label: 'Reading B',
      type: 'inputNumber',
      rules: [
        {
          required: true,
          type: 'number',
          min: 0,
          max: 9999,
        },
      ],
    },
    {
      name: 'comment',
      label: 'Comment',
      type: 'textArea',
      rules: [
        { min: 3, message: 'The Comment must be of at least 3 characters' },
        { max: 128, message: 'The Comment must be of maximum 128 characters' },
      ],
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const log = await logService.getLogs('byId', props.logId);
      setLog(log);
    };

    if (props.mode === 'edit') fetchData();
  }, [props.logId, props.mode]);

  const onConfirmSave = async (values) => {
    if (props.mode === 'new' || props.mode === 'range') await onCreate(values);
    if (props.mode === 'edit') await onUpdate(values);
  };

  const onCreate = async (values) => {
    const logs = [];
    values.deviceId = props.deviceId;
    if (props.mode === 'range') {
    } else {
      values.date = values.date.toISOString();
      logs.push(values);
    }

    const response = await logService.createLog(logs);
    if (response.status === 201) {
      notification.success({
        message: 'Entry Log created!!!',
        description: 'The Entry Log has been successfully created.',
      });
      history.push(`/devices/${props.deviceId}/logs`);
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
      history.push(`/devices/${props.deviceId}/logs`);
    }
  };

  const onConfirmCancel = () => {
    history.push(`/devices/${props.deviceId}/logs`);
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
