import { connect } from 'react-redux';
import CalcButton from '../components/CalcButton';
import allClear from '../actions/allClear';

const mapDispatchToProps = (dispatch) => ({
  clickAction: () => dispatch(allClear())
});

const ACCalcButton = connect(null, mapDispatchToProps)(CalcButton);

export default ACCalcButton;