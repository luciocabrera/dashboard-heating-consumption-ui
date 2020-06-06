// React
import React from 'react';
// Components
import { Popover } from 'antd';
// Css
import './tooltip.css';

const Tooltip = (props) => {
  const { content, children } = props;
  const key = Math.random().toString(36).slice(-10);

  return (
    <Popover key={`rc-tooltip-${key}`} content={content}>
      {children}
    </Popover>
  );
};

export default Tooltip;
