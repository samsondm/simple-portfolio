import { connect } from 'react-redux';
import changeBank from '../actions/changeBank';
import ToggleButton from '../components/ToggleButton';

const numberToBool = (number) => number === 'one' ? true : false;

const mapStateToProps = (state) => ({
  state: numberToBool(state.bank)
});

const mapDispatchToProps = (dispatch) => ({
  handleClick: () => dispatch(changeBank())
});

const BankToggle = connect(mapStateToProps, mapDispatchToProps)(ToggleButton);

export default BankToggle;