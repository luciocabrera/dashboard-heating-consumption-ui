import styled from 'styled-components';

const TableStyled = styled.table`
   {
    border-spacing: 0;
    position: relative;

    thead {
      tr {
        th {
          border-top: 1px solid var(--er-grey-6);
          border-right: 1px solid var(--er-white);
          background: #001529;
          color: var(--er-white);
        }
      }
    }

    tr {
      line-height: 11px;
      max-height: 27px;

      :nth-child(even) {
        background: lightgray !important;   
      }

      :nth-child(odd) {
        background: var(--er-grey-2);
      }

      :last-child {
        td {
          border-bottom: 1px solid var(--er-grey-4);
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

export default TableStyled;
