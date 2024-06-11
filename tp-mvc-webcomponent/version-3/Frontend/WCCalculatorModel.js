// El model no tiene que tener import de controller o view. Es independiente
class CalculatorModel {
  constructor() {
    this._url = 'http://localhost:8080';
  }

  //Metodo asincronico q envia una solicitud POST al server Flask para hacer el calculo
  async calculate(calculation) {
    const response = await fetch(`${this._url}/calculate`, {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ calculation })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const { data } = await response.json();
    return data;
  }
}


  //el export elige lo q tiene q ser visible para otro archivo
  export {CalculatorModel};