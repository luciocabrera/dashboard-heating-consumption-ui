import styled from 'styled-components';

const SpinStyled = styled.div`
   {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;

    .icon-indicator {
      font-size: 48px;
      color: #001529;
    }

    .ant-spin {
      width: 50px;
      height: 50px;
      position: absolute;
      left: calc(50vw - 25px);
      top: calc(50vh - 25px);
      color: #001529;
    }
  }
`;

export default SpinStyled;
