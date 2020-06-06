// React
import * as React from 'react';
// Components
import { Layout } from 'antd';
// Assets
import space from '../../assets/img/space.jpg';

const { Header, Content, Footer } = Layout;

const LayoutWrapper = (props) => {
  return (
    <Layout className="layout">
      <img src={space} alt="" className="header-logo" />
      <Header>{props.menu}</Header>
      <Content style={{ padding: '0' }}>{props.content}</Content>
      <Footer style={{ textAlign: 'center' }}>
        <div className="footer-title">
          Heating Consumption Dashboard ©2020 Created by LCabrera
        </div>
      </Footer>
    </Layout>
  );
};

export default LayoutWrapper;
