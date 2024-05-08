class CRUDComponent extends HTMLElement {
    constructor() {
        super();

        // Crear los elementos HTML necesarios para el componente
        this._title = document.createElement('h2');
        this._title.innerText = 'Gestion de cuentas:';

        // Crear el subtítulo "Seleccione una acción"
        this._subtitle = document.createElement('h3');
        this._subtitle.innerText = 'Seleccione una acción:';

        this._select = document.createElement('select');

        // Botones
        this._buttonListar = document.createElement('button');
        this._buttonListar.innerText = 'Listar';
        this._buttonCrear = document.createElement('button');
        this._buttonCrear.innerText = 'Crear';
        this._buttonEditar = document.createElement('button');
        this._buttonEditar.innerText = 'Editar';
        this._buttonEliminar = document.createElement('button');
        this._buttonEliminar.innerText = 'Eliminar';
        this._buttonOtro = document.createElement('button');
        this._buttonOtro.innerText = '...';

        // Tabla de datos
        this._table = document.createElement('table');
        this._head = this._table.createTHead();
        this._headRow = this._head.insertRow();
        let col1 = this._headRow.insertCell();
        let col2 = this._headRow.insertCell();
        let col3 = this._headRow.insertCell();
        col1.innerText = "ID"
        col2.innerText = "USERNAME"
        col3.innerText = "SALDO"
        this._tbody = this._table.createTBody();

    }

    fillWith(dataArray) {
        this._select.innerHTML = '';

        for (let item of dataArray) {
            let row = this._tbody.insertRow();
            let col1 = row.insertCell();
            let col2 = row.insertCell();
            let col3 = row.insertCell();
            col1.innerText = item_id;
            col2.innerText = item_username;
            col3.innerText = item_saldo;
        }
    }

    connectedCallback() {
        this.appendChild(this._title);
        this.appendChild(this._subtitle);
        this.appendChild(this._select);

        // Agrega botones y tabla de datos al componente
        this.appendChild(this._buttonListar);
        this.appendChild(this._buttonCrear);
        this.appendChild(this._buttonEditar);
        this.appendChild(this._buttonEliminar);
        this.appendChild(this._buttonOtro);
        this.appendChild(this._table);
    }

    disconnectedCallback() {
    }

    adoptedCallback() {
    }

    attributesChangedCallback(oldValue, newValue) {
    }

    static get observableAttributes() {
        return ["value"];
    }
}

customElements.define('x-custom-selector', CRUDComponent);