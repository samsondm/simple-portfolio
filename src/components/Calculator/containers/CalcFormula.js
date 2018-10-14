import { connect } from 'react-redux';
import Formula from '../components/Formula';

const mapStateToProps = (state) => ({
  output: state.calculator.output
});

const CalcFormula = connect(mapStateToProps, null)(Formula);

export default CalcFormula;