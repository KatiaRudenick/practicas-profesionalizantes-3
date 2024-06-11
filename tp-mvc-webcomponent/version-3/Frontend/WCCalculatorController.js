class CalculatorController {
    constructor(viewComponent, modelComponent) //Al estar diseñado asi no necesita importar
    {
      this._viewComponent = viewComponent;
      this._modelComponent = modelComponent;  
    }

    //Maneja los clics de los botones y llama a la funcion updateinput y pasa la data
    onClickButtonOne() { this._viewComponent.updateInput('1'); }
    onClickButtonTwo() { this._viewComponent.updateInput('2'); }
    onClickButtonThree() { this._viewComponent.updateInput('3'); }
    onClickButtonFour() { this._viewComponent.updateInput('4'); }
    onClickButtonFive() { this._viewComponent.updateInput('5'); }
    onClickButtonSix() { this._viewComponent.updateInput('6'); }
    onClickButtonSeven() { this._viewComponent.updateInput('7'); }
    onClickButtonEight() { this._viewComponent.updateInput('8'); }
    onClickButtonNine() { this._viewComponent.updateInput('9'); }
    onClickButtonZero() { this._viewComponent.updateInput('0'); }
    onClickButtonDecimal() { this._viewComponent.updateInput('.'); }
    onClickButtonPlus() { this._viewComponent.updateInput(' + '); }
    onClickButtonMinus() { this._viewComponent.updateInput(' - '); }
    onClickButtonProduct() { this._viewComponent.updateInput(' * '); }
    onClickButtonDivide() { this._viewComponent.updateInput(' / '); }
    onClickButtonClear() { this._viewComponent.replaceInput(''); }
    async onClickButtonCalculate() {
      const calculation = this._viewComponent.getInputValue();
      try {
        const result = await this._modelComponent.calculate(calculation);
        this._viewComponent.replaceInput(result);
      } catch (error) {
        console.error('Error al calcular:', error);
      }
    }
  }

  export {CalculatorController};