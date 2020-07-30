import { connect } from 'react-redux';
import DeviceForm from './DeviceForm';
import { getDevices, createDevice } from '../../actions/devices';

const mapDispatchToProps = {
  getDevices,
  createDevice,
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceForm);
