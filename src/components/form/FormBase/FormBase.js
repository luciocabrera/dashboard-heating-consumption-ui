/* eslint-disable no-template-curly-in-string */
// React
import React from 'react';
// Other
import moment from 'moment';
// Component Styles wrapper
import { FormBaseStyled } from './styles';
// Components
import { Form as AntdForm, Input, Select, InputNumber, DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const disabledDate = (current) =>
  // Can not select days after today and today
  current && current > moment().endOf('day');

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const FormBase = (props) => {
  const getFormItemChild = (item) => {
    switch (item.type) {
      case 'inputNumber':
        return <InputNumber />;
      case 'textArea':
        return <Input.TextArea rows={4} />;
      case 'datePicker':
        return <DatePicker showTime disabledDate={disabledDate} />;
      case 'rangePicker':
        return <RangePicker format='YYYY-MM-DD' disabledDate={disabledDate} />;
      case 'select':
        return (
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder={`Select a ${item.label}`}
            optionFilterProp='children'
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {item.options.map((option) => (
              <Select.Option value={option}>{option}</Select.Option>
            ))}
          </Select>
        );
      default:
        return <Input />;
    }
  };

  const FormItems = () =>
    props.formItems.map((item) => (
      <AntdForm.Item
        key={item.name}
        name={item.name}
        label={item.label}
        rules={item.rules}
      >
        {getFormItemChild(item)}
      </AntdForm.Item>
    ));

  return (
    <FormBaseStyled>
      <AntdForm
        form={props.form}
        validateMessages={validateMessages}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout='horizontal'
        scrollToFirstError
      >
        <FormItems />
      </AntdForm>
    </FormBaseStyled>
  );
};

export default FormBase;
