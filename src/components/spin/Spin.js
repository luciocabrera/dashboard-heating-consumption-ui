// React
import React from 'react';
// Components
import { Spin as AntSpin } from 'antd';
import SpinStyled from './SpinStyled';
// Icons
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined className='icon-indicator' spin />;

const Spin = (props) =>
  props.isBusy === true && (
    <SpinStyled className='overlay'>
      <AntSpin size='large' indicator={antIcon} tip='Loading...' />
    </SpinStyled>
  );

export default Spin;
