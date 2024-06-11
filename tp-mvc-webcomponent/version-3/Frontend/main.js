import {CalculatorModel} from './WCCalculatorModel.js';
import {CalculatorView} from './WCCalculatorView.js';

function main() {
    const wcCalculatorModel = new CalculatorModel();
    const wcCalculatorView = new CalculatorView(wcCalculatorModel);
    document.body.appendChild(wcCalculatorView);
  }

  window.onload = main;

  export {main};