// Redux
import { connect } from 'react-redux';
// Layouts
import Home from './Home';
// Actions
import { getDevices } from '../../actions/devices';

const mapDispatchToProps = {
  getDevices,
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
