import React from 'react';
import ACCalcButton from '../containers/ACCalcButton';
import OperatorCalcButton from '../containers/OperatorCalcButton';
import SymbolCalcButton from '../containers/SymbolCalcButton';

const CalcButtons = (props) => {
  return (
    <div>
      <ACCalcButton id="clear" symbol="AC" keyValue={["Delete"]} styleClass="calcButton clear" />
      <OperatorCalcButton id="divide" symbol="&divide;" keyValue={["/", "Divide"]} styleClass="calcButton operator" />
      <OperatorCalcButton id="multiply" symbol="&times;" keyValue={["*", "Multiply"]} styleClass="calcButton operator" />
      <SymbolCalcButton id="seven" symbol="7" styleClass="calcButton" />
      <SymbolCalcButton id="eight" symbol="8" styleClass="calcButton" />
      <SymbolCalcButton id="nine" symbol="9" styleClass="calcButton" />
      <OperatorCalcButton id="subtract" symbol="&minus;" keyValue={["-", "Subtract"]} styleClass="calcButton operator" />
      <SymbolCalcButton id="four" symbol="4" styleClass="calcButton" />
      <SymbolCalcButton id="five" symbol="5" styleClass="calcButton" />
      <SymbolCalcButton id="six" symbol="6" styleClass="calcButton" />
      <OperatorCalcButton id="add" symbol="+" keyValue={["+", "Add"]} styleClass="calcButton operator" />
      <SymbolCalcButton id="one" symbol="1" styleClass="calcButton" />
      <SymbolCalcButton id="two" symbol="2" styleClass="calcButton" />
      <SymbolCalcButton id="three" symbol="3" styleClass="calcButton" />
      <SymbolCalcButton id="zero" symbol="0" styleClass="calcButton zero" />
      <SymbolCalcButton id="decimal" symbol="." keyValue={[".", "Decimal"]} styleClass="calcButton" />
      <OperatorCalcButton id="equals" symbol="=" keyValue={["Enter"]} styleClass="calcButton equals" />
    </div>
  );
};

export default CalcButtons;