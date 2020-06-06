// React
import React from 'react';
// Router
import { Link } from 'react-router-dom';

const RouterLink = ({ href, ...props }) => <Link to={href} {...props} />;

export default RouterLink;
