import {CalculatorController} from './WCCalculatorController.js';

class CalculatorView extends HTMLElement {
  constructor(modelComponent) {
    super();
    //Controlador dedicado a la vista. Responde a todos los eventos de los elementos
    this._innerControler = new CalculatorController(this, modelComponent);  // Crea instancia del controlador (agregacion).
    this._table = document.createElement('table');  // Crea la tabla donde van los botones

    // Crea las filas y celdas de la tabla
    this._firstRow = this._table.insertRow();
    this._inputCell = this._firstRow.insertCell();
    this._inputCell.setAttribute('colspan', 4);

    this._secondRow = this._table.insertRow();
    this._button7Cell = this._secondRow.insertCell();
    this._button8Cell = this._secondRow.insertCell();
    this._button9Cell = this._secondRow.insertCell();
    this._buttonPlusCell = this._secondRow.insertCell();

    this._thirdRow = this._table.insertRow();
    this._button4Cell = this._thirdRow.insertCell();
    this._button5Cell = this._thirdRow.insertCell();
    this._button6Cell = this._thirdRow.insertCell();
    this._buttonMinusCell = this._thirdRow.insertCell();

    this._fourthRow = this._table.insertRow();
    this._button1Cell = this._fourthRow.insertCell();
    this._button2Cell = this._fourthRow.insertCell();
    this._button3Cell = this._fourthRow.insertCell();
    this._buttonProductCell = this._fourthRow.insertCell();

    this._fifthRow = this._table.insertRow();
    this._button0Cell = this._fifthRow.insertCell();
    this._buttonDecimalCell = this._fifthRow.insertCell();
    this._buttonCalculateCell = this._fifthRow.insertCell();
    this._buttonDivideCell = this._fifthRow.insertCell();

    this._sixthRow = this._table.insertRow();
    this._buttonClearCell = this._sixthRow.insertCell();
    this._buttonClearCell.setAttribute('colspan', 4);

    // Crea los elementos de entrada y los botones
    this._input = document.createElement('input');
    this._input.className = 'displayResult';
    this._input.id = 'display';
    this._input.type = 'text';
    this._input.setAttribute('disabled', true);

    this._button0 = document.createElement('button');
    this._button0.className = 'numberButton';
    this._button0.id = 'button0';
    this._button0.innerText = '0';

    this._button1 = document.createElement('button');
    this._button1.className = 'numberButton';
    this._button1.id = 'button1';
    this._button1.innerText = '1';

    this._button2 = document.createElement('button');
    this._button2.className = 'numberButton';
    this._button2.id = 'button2';
    this._button2.innerText = '2';

    this._button3 = document.createElement('button');
    this._button3.className = 'numberButton';
    this._button3.id = 'button3';
    this._button3.innerText = '3';

    this._button4 = document.createElement('button');
    this._button4.className = 'numberButton';
    this._button4.id = 'button4';
    this._button4.innerText = '4';

    this._button5 = document.createElement('button');
    this._button5.className = 'numberButton';
    this._button5.id = 'button5';
    this._button5.innerText = '5';

    this._button6 = document.createElement('button');
    this._button6.className = 'numberButton';
    this._button6.id = 'button6';
    this._button6.innerText = '6';

    this._button7 = document.createElement('button');
    this._button7.className = 'numberButton';
    this._button7.id = 'button7';
    this._button7.innerText = '7';

    this._button8 = document.createElement('button');
    this._button8.className = 'numberButton';
    this._button8.id = 'button8';
    this._button8.innerText = '8';

    this._button9 = document.createElement('button');
    this._button9.className = 'numberButton';
    this._button9.id = 'button9';
    this._button9.innerText = '9';

    this._buttonDecimalPoint = document.createElement('button');
    this._buttonDecimalPoint.className = 'numberButton';
    this._buttonDecimalPoint.id = 'buttonDecimalPoint';
    this._buttonDecimalPoint.innerText = '.';

    this._buttonPlus = document.createElement('button');
    this._buttonPlus.className = 'operatorButton';
    this._buttonPlus.innerText = '+';
    this._buttonPlus.id = 'buttonPlus';

    this._buttonMinus = document.createElement('button');
    this._buttonMinus.className = 'operatorButton';
    this._buttonMinus.innerText = '-';
    this._buttonMinus.id = 'buttonMinus';

    this._buttonProduct = document.createElement('button');
    this._buttonProduct.className = 'operatorButton';
    this._buttonProduct.innerText = '*';
    this._buttonProduct.id = 'buttonProduct';

    this._buttonDivide = document.createElement('button');
    this._buttonDivide.className = 'operatorButton';
    this._buttonDivide.innerText = '/';
    this._buttonDivide.id = 'buttonDivision';

    this._buttonCalculate = document.createElement('button');
    this._buttonCalculate.className = 'operatorButton';
    this._buttonCalculate.innerText = '=';
    this._buttonCalculate.id = 'buttonCalculate';

    this._buttonClear = document.createElement('button');
    this._buttonClear.className = 'clearButton';
    this._buttonClear.id = 'buttonClear';
    this._buttonClear.innerText = 'BORRAR';
  }

  // Se llama cuando el componente se conecta al DOM
  connectedCallback() {
    this._inputCell.appendChild(this._input);  // Agrega el input a la celda q corresponda
    this._button7Cell.appendChild(this._button7);
    this._button8Cell.appendChild(this._button8);
    this._button9Cell.appendChild(this._button9);
    this._buttonPlusCell.appendChild(this._buttonPlus);
    this._button4Cell.appendChild(this._button4);
    this._button5Cell.appendChild(this._button5);
    this._button6Cell.appendChild(this._button6);
    this._buttonMinusCell.appendChild(this._buttonMinus);
    this._button1Cell.appendChild(this._button1);
    this._button2Cell.appendChild(this._button2);
    this._button3Cell.appendChild(this._button3);
    this._buttonProductCell.appendChild(this._buttonProduct);
    this._button0Cell.appendChild(this._button0);
    this._buttonDecimalCell.appendChild(this._buttonDecimalPoint);
    this._buttonCalculateCell.appendChild(this._buttonCalculate);
    this._buttonDivideCell.appendChild(this._buttonDivide);
    this._buttonClearCell.appendChild(this._buttonClear);

    this.appendChild(this._table);  // Agrega la tabla al componente

    // Asigna eventos de clic a cada boton para que llamen al controlador q corresponda
    this._button0.onclick = () => this._innerControler.onClickButtonZero();
    this._button1.onclick = () => this._innerControler.onClickButtonOne();
    this._button2.onclick = () => this._innerControler.onClickButtonTwo();
    this._button3.onclick = () => this._innerControler.onClickButtonThree();
    this._button4.onclick = () => this._innerControler.onClickButtonFour();
    this._button5.onclick = () => this._innerControler.onClickButtonFive();
    this._button6.onclick = () => this._innerControler.onClickButtonSix();
    this._button7.onclick = () => this._innerControler.onClickButtonSeven();
    this._button8.onclick = () => this._innerControler.onClickButtonEight();
    this._button9.onclick = () => this._innerControler.onClickButtonNine();
    this._buttonDecimalPoint.onclick = () => this._innerControler.onClickButtonDecimal();
    this._buttonPlus.onclick = () => this._innerControler.onClickButtonPlus();
    this._buttonMinus.onclick = () => this._innerControler.onClickButtonMinus();
    this._buttonProduct.onclick = () => this._innerControler.onClickButtonProduct();
    this._buttonDivide.onclick = () => this._innerControler.onClickButtonDivide();
    this._buttonCalculate.onclick = () => this._innerControler.onClickButtonCalculate();
    this._buttonClear.onclick = () => this._innerControler.onClickButtonClear();
  }

  // Actualiza el campo de entrada añadiendo los datos
  updateInput(data) {
    this._input.value += data;
  }

  // Reemplaza el valor del campo de entrada con nuevos datos
  replaceInput(data) {
    this._input.value = data;
  }

  // Retorna el valor actual del campo de entrada
  getInputValue() {
    return this._input.value;
  }

  // Se llama cuando el componente se desconecta del DOM
  disconnectedCallback() {
    // Remueve los eventos de clic
    this._button0.onclick = null;
    this._button1.onclick = null;
    this._button2.onclick = null;
    this._button3.onclick = null;
    this._button4.onclick = null;
    this._button5.onclick = null;
    this._button6.onclick = null;
    this._button7.onclick = null;
    this._button8.onclick = null;
    this._button9.onclick = null;
    this._buttonDecimalPoint.onclick = null;
    this._buttonPlus.onclick = null;
    this._buttonMinus.onclick = null;
    this._buttonProduct.onclick = null;
    this._buttonDivide.onclick = null;
    this._buttonCalculate.onclick = null;
    this._buttonClear.onclick = null;
  }

  // Metodos requeridos para el ciclo de vida del componente
  adoptedCallback() {}
  attributesChangedCallback(oldValue, newValue) {}
  static get observableAttributes() {}
}

customElements.define('x-wc-component-view', CalculatorView);

export {CalculatorView};