// React
import React from 'react';
// Styles
import styled from 'styled-components';
// Components
import { Spin as AntdSpin } from 'antd';
// Icons
import { LoadingOutlined } from '@ant-design/icons';

const Styles = styled.div`
  .ant-spin {
    width: 50px;
    height: 50px;
    position: absolute;
    left: calc(50vw - 25px);
    top: calc(50vh - 25px);
    color: #001529;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
  }
`;

const antIcon = <LoadingOutlined style={{ fontSize: 48, color:'#001529' }} spin />;

const Spin = () => (
  <Styles>
    <div class='overlay'>
      <AntdSpin size='large' indicator={antIcon} tip='Loading...' />
    </div>
  </Styles>
);

export default Spin;
