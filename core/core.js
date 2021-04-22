$(document).ready(function () {
    // Soporte a Geolocalización API
    if (typeof navigator.geolocation == "undefined") {
        $("#mensajes").text("Tu navegador no soporta Geolocalización");
        return;
    }

    // CALCULA LA RUTA
    $("#calcularRuta").submit(function (event) {
        event.preventDefault();

        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var directionsService = new google.maps.DirectionsService();

        // Paradas (waypoints)
        var _waypoints = new Array();
        var _mapPoints = new Array();

        // Recorrer el UL
        var list = document.querySelector('#paradaUL');
        
        for (var p = 1; p <= list.children.length - 1; p++)
        {
            _waypoints.push({    
                location: list.children[p].innerHTML,
                stopover: true    
            });    
        }
        
        var request = '';
        
        // Con paradas    
        if (_waypoints.length > 0) {
            request = {
                origin: $('#origen').val(),
                destination: $('#destino').val(),
                waypoints: _waypoints,
                optimizeWaypoints: true,
                travelMode: google.maps.TravelMode.DRIVING,
                provideRouteAlternatives: true,
                avoidTolls: true,
            }
        }
        else {
            request = {
                origin: $('#origen').val(),
                destination: $('#destino').val(),
                travelMode: google.maps.TravelMode.DRIVING,
                provideRouteAlternatives: true,
                avoidTolls: true,
            }
        }

        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {

                document.getElementById("directionsPanel").innerHTML = "";
                document.getElementById("mensajes").innerHTML = "";

                directionsDisplay.setMap(map);
                directionsDisplay.setPanel($("#directionsPanel").get(0));
                directionsDisplay.setDirections(response);
            } else {
                $("#mensajes").text(google.maps.DirectionsStatus.status);
            }
        });
    });

    $("#eliminarParada").click(function (event) {
        $("input:checkbox:checked").each(   
            function() {
                $(this).remove();
            }
        );
    });

    $("#agregarParada").click(function (event) {        
        var parada = $('#parada').val();

        if (parada.length == 0)
        {
            $("#mensajes").text("Debes de capturar una parada");
            return;
        }
        else {
            $("#mensajes").text("");
        }

        var ul = document.getElementById("paradaUL");
        var li = document.createElement("li");

        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.value = parada;
        checkbox.name = "check";

        var label = document.createElement('label')
            label.htmlFor = "id";
            label.appendChild(document.createTextNode(parada));

        li.appendChild(checkbox);
        li.appendChild(label);
        //li.appendChild(document.createTextNode(" " + parada));
        //li.appendChild(document.createTextNode(checkbox));
        ul.appendChild(li);
    });
});
