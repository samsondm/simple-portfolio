import {connect} from 'react-redux';
import Display from '../components/Display';

const mapStateToProps = (state) => ({
  input: state.calculator.input
});

const CalcDisplay = connect(mapStateToProps, null)(Display);

export default CalcDisplay;