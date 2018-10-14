import { connect } from 'react-redux';
import CalcButton from '../components/CalcButton';
import changeOutput from '../actions/changeOutput';

const mapDispatchToProps = (dispatch) => ({
  clickAction: (operator) => dispatch(changeOutput(operator))
});

const OperatorCalcButton = connect(null, mapDispatchToProps)(CalcButton);

export default OperatorCalcButton;