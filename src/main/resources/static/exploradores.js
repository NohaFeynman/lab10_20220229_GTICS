let exploradores = [];
let nuevos = 0;
let iniciales = 0;

function cargarExploradoresIniciales() {
    $("#expl-cards").html(`
        <div class="text-center py-4">
            <div class="spinner-border text-dark"></div>
        </div>
    `);

    $.get("https://randomuser.me/api/?results=10", function (data) {
        exploradores = data.results;
        iniciales = exploradores.length;
        $("#expl-iniciales").text(iniciales);
        renderExploradores();
    }).fail(function () {
        $("#expl-cards").html(`<p class="text-danger text-center py-3">No se pudo cargar exploradores.</p>`);
    });
}

function renderExploradores() {
    $("#expl-cards").empty();

    exploradores.forEach((e, idx) => {
        $("#expl-cards").append(`
            <div class="col-6 col-sm-4 col-md-3 col-lg-2" id="expl-${idx}">
                <div class="card shadow-sm">
                    <img src="${e.picture.large}" class="card-img-top">
                    <div class="card-body p-2 text-center">
                        <h6>${e.name.first} ${e.name.last}</h6>
                        <p class="small mb-1">${e.location.country}</p>
                        <p class="small text-muted">${e.email}</p>
                        <p class="small"><b>Rango:</b> Clase ${idx + 1}</p>
                        <button class="btn btn-sm btn-danger w-100" onclick="eliminarExpl(${idx})">Eliminar</button>
                    </div>
                </div>
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
    }).fail(function () {
        alert("No se pudo reclutar un nuevo explorador.");
    });
}

function eliminarExpl(idx) {
    $(`#expl-${idx}`).fadeOut(200, function () {
        exploradores.splice(idx, 1);
        renderExploradores();
    });
}

$(document).ready(function () {
    cargarExploradoresIniciales();
    $("#btn-reclutar").click(reclutar);
});
