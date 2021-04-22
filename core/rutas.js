// Ruta
function displayRoute() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
        draggable: true,
        map,
        panel: document.getElementById("directionsPanel"),
    });

    // Paradas (waypoints)
    var _waypoints = new Array();

    var table = document.getElementById('dataTable');
    var row = table.rows.length;

    // Recorrer el UL
    if (table.rows.length > 0) {
        for (var i = 0; i < table.rows.length; i++) {
            
            _waypoints.push({
                location: table.rows[i].cells[1].childNodes[0].value,
                stopover: true
            });
        }
    }

    if (_waypoints.length > 0) {
        directionsService.route(
            {
                origin: document.getElementById("origen").value,
                destination: document.getElementById("destino").value,
                waypoints: _waypoints,
                travelMode: google.maps.TravelMode.DRIVING,
                avoidTolls: true,
            },
            (result, status) => {
                if (status === "OK" && result) {
                    directionsRenderer.setDirections(result);
                    rutaFinal =  JSON.stringify(result)
                } else {
                    alert("No se pueden desplegar las direcciones debido a: " + status);
                }
            }
        );
    } else {
        directionsService.route(
            {
                origin: document.getElementById("origen").value,
                destination: document.getElementById("destino").value,
                travelMode: google.maps.TravelMode.DRIVING,
                avoidTolls: true,
            },
            (result, status) => {
                if (status === "OK" && result) {
                    directionsRenderer.setDirections(result);
                    rutaFinal =  JSON.stringify(result)
                } else {
                    alert("No se pueden desplegar las direcciones debido a: " + status);
                }
            }
        );
    }
};

// Distacia total
function computeTotalDistance(result) {
    let total = 0;
    const myroute = result.routes[0];

    if (!myroute) {
        return;
    }

    for (let i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    document.getElementById("total").innerHTML = total + " km";
};

// Descargar archivo
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

// Agregar parada
function agregarParada(id) {
    var parada = document.getElementById("parada").value;

    if (parada.length == 0)
    {
        alert("Debes de capturar una parada");
        return;
    }

    var table = document.getElementById(id);
    var row = table.insertRow(table.rows.length);
    var cell1 = row.insertCell(0);
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    cell1.appendChild(checkbox);

    var cell2 = row.insertCell(1);
    var textbox = document.createElement("input");
    textbox.type = "text";
    textbox.value = parada;
    textbox.value = parada;
    textbox.readOnly = true;
    cell2.appendChild(textbox);
};

// Eliminar parada
function eliminarParada(id) {
    var table = document.getElementById(id);
    var row = table.rows.length;
    var counter = 0;

    if (table.rows.length > 0) {
        for (var i = 0; i < table.rows.length; i++) {
            var chk = table.rows[i].cells[0].childNodes[0];
            if (chk.checked) {
                table.deleteRow(i);
                row--;
                i--;
                counter = counter + 1;
            }
        }
        if (counter == 0) {
            alert("Debes de seleccionar una parada.");
        }
    } else {
        alert("No existen paradas");
    }
};
