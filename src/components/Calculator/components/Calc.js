import React from 'react';
import CalcFormula from '../containers/CalcFormula';
import CalcDisplay from '../containers/CalcDisplay';
import CalcButtons from './CalcButtons';

const Calc = (props) => {
  return (
    <div id="calculator">
      <CalcFormula />
      <CalcDisplay />
      <CalcButtons />
    </div>
  );
};

export default Calc;