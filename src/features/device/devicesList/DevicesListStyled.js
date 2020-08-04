import styled from 'styled-components';

const DevicesListStyled = styled.div`
  .ant-card,
  .ant-card-bordered {
    min-width: 200px !important;
    max-width: 348px !important;
    width: 348px !important;
    border-radius: 15px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  }

  .ant-card-hoverable:hover {
    transform: scale(1.057);
    cursor: pointer;
    transition: transform 0.2s;
    will-change: transform;
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16),
      0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09) !important;
  }

  .ant-card-actions {
    border-radius: 15px;
  }

  .ant-card-body {
    min-height: 134px !important;
    max-height: 134px !important;
  }

  .ant-col {
    min-width: 200px !important;
    max-width: 348px !important;
    width: 348px !important;
    margin-right: 20px !important;
  }

  .ant-layout-content {
    padding: 30px !important;
    margin-top: 15px !important;
    height: calc(100vh - 123px) !important;
    overflow-x: auto !important;
  }
`;

export default DevicesListStyled;