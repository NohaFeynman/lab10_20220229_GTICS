let exploradores = [];
let nuevos = 0;
let iniciales = 0;

function cargarExploradoresIniciales() {
    $.get("https://randomuser.me/api/?results=10", function (data) {
        exploradores = data.results;
        iniciales = exploradores.length;

        $("#expl-iniciales").text(iniciales);
        renderExploradores();
    });
}

function renderExploradores() {
    $("#expl-cards").empty();

    exploradores.forEach((e, idx) => {
        $("#expl-cards").append(`
            <div class="card">
                <img src="${e.picture.large}">
                <h4>${e.name.first} ${e.name.last}</h4>
                <p>${e.location.country}</p>
                <p>${e.email}</p>
                <p><b>Rango:</b> Explorador ${idx+1}</p>
                <button onclick="eliminarExpl(${idx})">Eliminar</button>
            </div>
        `);
    });

    $("#expl-nuevos").text(nuevos);
}

function reclutar() {
    $.get("https://randomuser.me/api/", function (data) {
        exploradores.push(data.results[0]);
        nuevos++;
        renderExploradores();
    });
}

function eliminarExpl(idx) {
    exploradores.splice(idx, 1);
    renderExploradores();
}

$(document).ready(function () {
    cargarExploradoresIniciales();
    $("#btn-reclutar").click(reclutar);
});
