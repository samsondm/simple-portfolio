import { connect } from 'react-redux';
import changePower from '../actions/changePower';
import ToggleButton from '../components/ToggleButton';

const mapStateToProps = (state) => ({
  state: state.power
});

const mapDispatchToProps = (dispatch) => ({
  handleClick: () => dispatch(changePower())
});

const PowerToggle = connect(mapStateToProps, mapDispatchToProps)(ToggleButton);

export default PowerToggle;