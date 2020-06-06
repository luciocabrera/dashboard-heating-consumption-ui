import { connect } from 'react-redux';
import DevicesList from './DevicesList';
import { getDevices } from '../../actions/devices';

const mapDispatchToProps = {
  getDevices,
};

const mapStateToProps = (state) => {
  return {
    devices: state.devicesStorage.devices,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DevicesList);
