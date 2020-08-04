import styled from 'styled-components';

const DevicesLogsStyled = styled.div`
  .ant-row {
    flex-flow: nowrap;
    margin: 0px !important;
  }

  .ant-col-12 {
    max-width: 50% !important;
    width: 50% !important;
    overflow: hidden;
  }

  .statistic-col {
    max-width: 33% !important;
    min-width: 33% !important;
    width: 33% !important;
    padding: 8px !important;
  }

  .col-total-logs {
    max-width: 33% !important;
    min-width: 33% !important;
    width: 33% !important;
    padding-top: 0px !important;
    padding-left: 8px !important;
  }

  .col-main-card {
    padding-left: 8px !important;
    width: 66%;
  }

  .chart-sum {
    width: 97% !important;
    height: 142px !important;
  }

  .patterns-content {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0.6
  }
`;

export default DevicesLogsStyled;