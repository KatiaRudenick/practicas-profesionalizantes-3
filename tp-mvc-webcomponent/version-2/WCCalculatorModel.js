// El model no tiene que tener import de controller o view. Es independiente
class CalculatorModel {
    constructor() {}
    calculate(calculation) {
      return eval(calculation);
    }
  }

  //el export elige lo q tiene q ser visible para otro archivo
  export {CalculatorModel};