import { connect } from 'react-redux';
import CalcButton from '../components/CalcButton';
import addSymbol from '../actions/addSymbol';

const mapDispatchToProps = (dispatch) => ({
  clickAction: (symbol) => dispatch(addSymbol(symbol))
});

const SymbolCalcButton = connect(null, mapDispatchToProps)(CalcButton);

export default SymbolCalcButton;