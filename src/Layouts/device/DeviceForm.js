// React
import React from 'react';
// Router
import { useHistory } from 'react-router-dom';
// Components
import { FormCreate } from '../../components/index';
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

  const onConfirmSave = async (values) => {
    const response = await deviceService.createDevice(values);
    if (response.status === 201) history.push('/devices');
  };

  const onConfirmCancel = () => {
    history.push('/devices');
  };

  return (
    <FormCreate
      formItems={formItems}
      onConfirmCancel={onConfirmCancel}
      onConfirmSave={onConfirmSave}
      entity='Device'
    />
  );
};

export default DeviceForm;
