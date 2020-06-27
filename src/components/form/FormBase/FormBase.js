// React
import React from 'react';
// Components
import { Form as AntdForm, Input, Select } from 'antd';

const FormBase = (props) => {

  const getFormItemChild = (item) => {
    switch (item.type) {
      case 'textArea':
        return <Input.TextArea rows={4} />;
        // case 'datePicker':
        //   return <
      case 'select':
        return (
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder={`Select a ${item.label}`}
            optionFilterProp="children"
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
      <AntdForm.Item key={item.name} name={item.name} label={item.label} rules={item.rules}>
        {getFormItemChild(item)}
      </AntdForm.Item>
    ));

  return (
    <div>
      <AntdForm
        form={props.form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        scrollToFirstError
      >
        <FormItems />
      </AntdForm>
    </div>
  );
};

export default FormBase;
