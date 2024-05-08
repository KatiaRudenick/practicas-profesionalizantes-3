const baseApiUrl = "http://127.0.0.1:5000";

document.addEventListener("DOMContentLoaded", function () {
    const provinciaDropdown = document.getElementById('provincia_dropdown');
    const departamentoDropdown = document.getElementById('departamento_dropdown');
    const municipioDropdown = document.getElementById('municipio_dropdown');
    const localidadDropdown = document.getElementById('localidad_dropdown');

    // Populate dropdown provincias
    populateDropdownProvincias(provinciaDropdown);

    // Event listener for provincias dropdown change
    provinciaDropdown.addEventListener('change', function() {
        // Clear departamentoDropdown options
        departamentoDropdown.innerHTML = '';

        municipioDropdown.innerHTML = '';
        const placeholderOptionMunicipio = document.createElement('option');
        placeholderOptionMunicipio.value = '';
        placeholderOptionMunicipio.textContent = `Seleccione un municipio:`;
        placeholderOptionMunicipio.disabled = true;
        placeholderOptionMunicipio.selected = true;
        municipioDropdown.appendChild(placeholderOptionMunicipio);

        localidadDropdown.innerHTML = '';
        const placeholderOptionLocalidad = document.createElement('option');
        placeholderOptionLocalidad.value = '';
        placeholderOptionLocalidad.textContent = `Seleccione una localidad:`;
        placeholderOptionLocalidad.disabled = true;
        placeholderOptionLocalidad.selected = true;
        localidadDropdown.appendChild(placeholderOptionLocalidad);

        // Fetch data for departamentoDropdown based on the selected provincia
        const selectedProvincia = provinciaDropdown.value;
        if (selectedProvincia) {
            fetch(`${baseApiUrl}/departamento/byProvincia/${selectedProvincia}`)
            .then(response => response.json())
            .then(data => {
                populateDropdown(departamentoDropdown, data, 'un departamento');  // Populate departamentoDropdown with fetched data
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        }
    });

    // Event listener for departamentos dropdown change
    departamentoDropdown.addEventListener('change', function() {
        // Clear municipioDropdown options
        municipioDropdown.innerHTML = '';
        
        localidadDropdown.innerHTML = '';
        localidadDropdown.innerHTML = '';
        const placeholderOptionLocalidad = document.createElement('option');
        placeholderOptionLocalidad.value = '';
        placeholderOptionLocalidad.textContent = `Seleccione una localidad:`;
        placeholderOptionLocalidad.disabled = true;
        placeholderOptionLocalidad.selected = true;
        localidadDropdown.appendChild(placeholderOptionLocalidad);

        // Fetch data for municipioDropdown based on the selected departamento
        const selectedDepartamento = departamentoDropdown.value;
        if (selectedDepartamento) {
            fetch(`${baseApiUrl}/municipio/byDepartamento/${selectedDepartamento}`)
            .then(response => response.json())
            .then(data => {
                populateDropdown(municipioDropdown, data, 'un municipio');  // Populate municipioDropdown with fetched data
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        }
    });

    // Event listener for municipios dropdown change
    municipioDropdown.addEventListener('change', function() {
        // Clear localidadDropdown options
        localidadDropdown.innerHTML = '';

        // Fetch data for localidadDropdown based on the selected municipio
        const selectedMunicipio = municipioDropdown.value;
        if (selectedMunicipio) {
            fetch(`${baseApiUrl}/localidad/byMunicipio/${selectedMunicipio}`)
            .then(response => response.json())
            .then(data => {
                populateDropdown(localidadDropdown, data, 'una localidad');  // Populate localidadDropdown with fetched data
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        }
    });
});

function populateDropdown(dropdown, data, placeholderText) {
    // Clear existing options
    dropdown.innerHTML = '';

    // Add placeholder option
    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.textContent = `Seleccione ${placeholderText}:`;
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    dropdown.appendChild(placeholderOption);

    // Sort asc based on nombre
    data.sort(((a, b) => a.nombre.localeCompare(b.nombre))); 

    // Populate dropdown with data
    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.nombre;
        dropdown.appendChild(option);
    });
}

function populateDropdownProvincias(dropdown) {
    fetch(`${baseApiUrl}/provincia/all`)
        .then(response => response.json())
        .then(data => {
            populateDropdown(dropdown, data, 'una provincia');  // Populate dropdown with fetched data
        })
        .catch(error => console.error("Error fetching data:", error));
}