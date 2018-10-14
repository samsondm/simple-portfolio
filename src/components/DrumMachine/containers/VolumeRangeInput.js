import {connect} from 'react-redux';
import RangeInput from '../components/RangeInput';
import changeVolume from '../actions/changeVolume';
import changeDisplay from '../actions/changeDisplay';

const mapStateToProps = (state) => ({
  curr: state.volume,
  power: state.power
});

const volToName = (value) => `Volume ${value}`;

const mapDispatchToProps = (dispatch) => ({
  changeCurr: (value) => dispatch(changeVolume(value)),
  showCurr: (value) => dispatch(changeDisplay(volToName(value)))
});

const VolumeRangeInput = connect(mapStateToProps, mapDispatchToProps)(RangeInput);

export default VolumeRangeInput;