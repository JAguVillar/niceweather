var longitud;
var latitud;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(localizacion);
} else {
    alert("Fuck");
}

function localizacion(position) {
    longitud = position.coords.longitude;
    latitud = position.coords.latitude;
    let proxy = `https://cors-anywhere.herokuapp.com/`;
    let apiURL = `${proxy}https://api.darksky.net/forecast/9155007309d8bd89b080c1921f5d1ac1/${latitud}, ${longitud}?lang=es&units=si`;

    $.getJSON(apiURL, function (data) {
        actualizar(data);
        console.log(data);

    });

    function actualizar(data) {
        var fecha = new Date();
        var diaNumero = fecha.getDate();
        var diaSemana = fecha.getDay();
        var fechaUnix = new Date(data.currently.time * 1000);
        var hora = fechaUnix.getHours();
        var minutos = "0" + fechaUnix.getMinutes();
        var segundos = "0" + fechaUnix.getSeconds();
        console.log(hora + ":" + minutos.substr(-2) + ":" + segundos.substr(-2));

        var dia = new Array();
        dia[0] = "Domingo";
        dia[1] = "Lunes";
        dia[2] = "Martes";
        dia[3] = "Miercoles";
        dia[4] = "Jueves";
        dia[5] = "Viernes";
        dia[6] = "Sabado";

        $("#fecha").html(`Hoy, ` + dia[diaSemana] + ` ` + diaNumero);

        $("#temperatura").html(Math.round(data.currently.temperature) + ` °C`);

        var nombreArchivo = data.currently.icon;
        $("#icono").html(`<img id="iconoMain" src="iconos/` + nombreArchivo + `.svg"/>`);

        $("#pronostico").html(data.currently.summary);

        $("#minMax").html(Math.round(data.daily.data[0].temperatureMin) + `° - ` + Math.round(data.daily.data[0].temperatureMax) + `°`);

        $(".contenedorHumedad").html(`<div id="humedad" style="margin: 10px"><i class='uil uil-tear'></i> Humedad: ` +
            Math.round(data.currently.humidity * 100) + `%</div>`);
        $(".contenedorPrecipitacion").html(`<div id="precipitacion" style="margin: 10px"><i class='uil uil-umbrella'></i> % Precipitacion: ` +
            Math.round(data.currently.precipProbability * 100) + `%</div>`);
        $(".contenedorViento").html(`<div id="viento" style="margin: 10px"><i class='uil uil-wind'></i> Viento: ` +
            data.currently.windSpeed + ` km/h.</div>`);
    }
}