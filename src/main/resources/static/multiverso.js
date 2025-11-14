let totalConsultas = 0;
let modal = null;
let personajesDS = [];

$(document).ready(() => {
    modal = new bootstrap.Modal(document.getElementById("modalInfo"));
});

function cargarDemonSlayer() {
    totalConsultas++;

    $("#ds-cards").html(`
        <div class="text-center py-4">
            <div class="spinner-border text-dark"></div>
        </div>
    `);

    $.ajax({
        url: "https://www.demonslayer-api.com/api/v1/characters",
        type: "GET",
        success: function (data) {
            personajesDS = data.slice(0, 20);
            $("#ds-total").text(personajesDS.length);
            $("#ds-filter").val("todos");
            renderDS();
        },
        error: function () {
            $("#ds-cards").html(`<p class="text-danger text-center py-3">No se pudo cargar Demon Slayer.</p>`);
        }
    });
}

function renderDS() {
    if (personajesDS.length === 0) return;

    const filtro = $("#ds-filter").val();
    let lista = [];

    personajesDS.forEach(p => {
        if (filtro === "todos" || p.race === filtro) lista.push(p);
    });

    $("#ds-total-filtrado").text(lista.length);
    $("#ds-cards").empty();

    lista.forEach(p => {
        $("#ds-cards").append(`
            <div class="col-6 col-sm-4 col-md-3 col-lg-2">
                <div class="card shadow-sm" onclick="mostrarDS('${p.id}')">
                    <img src="${p.image}" class="card-img-top">
                    <div class="card-body p-1">
                        <h6 class="text-center fw-semibold">${p.name}</h6>
                    </div>
                </div>
            </div>
        `);
    });
}

function mostrarDS(id) {
    const p = personajesDS.find(x => x.id === id);

    $("#modal-detalle").html(`
        <h4 class="fw-bold">${p.name}</h4>
        <img src="${p.image}" class="img-fluid my-2">
        <p><b>Raza:</b> ${p.race}</p>
        <p><b>Afiliación:</b> ${p.affiliation || "Desconocido"}</p>
        <p><b>Género:</b> ${p.gender}</p>
    `);

    modal.show();
}

$("#ds-filter").on("change", function () {
    if (personajesDS.length > 0) {
        renderDS();
    }
});

function cargarPokemons() {
    totalConsultas++;

    $("#poke-cards").html(`
        <div class="text-center py-4">
            <div class="spinner-border text-dark"></div>
        </div>
    `);

    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",
        type: "GET",
        success: function (data) {
            $("#poke-total").text(data.results.length);
            $("#poke-cards").empty();

            data.results.forEach(p => {
                $("#poke-cards").append(`
                    <div class="col-6 col-sm-4 col-md-3 col-lg-2">
                        <div class="card shadow-sm" onclick="mostrarPokemon('${p.url}')">
                            <div class="card-body p-2 text-center">
                                <h6 class="text-capitalize fw-semibold">${p.name}</h6>
                            </div>
                        </div>
                    </div>
                `);
            });
        },
        error: function () {
            $("#poke-cards").html(`<p class="text-danger text-center py-3">No se pudo cargar Pokémon.</p>`);
        }
    });
}

function mostrarPokemon(url) {
    totalConsultas++;
    $("#modal-detalle").html(`<div class="text-center py-4"><div class="spinner-border text-dark"></div></div>`);
    modal.show();

    $.get(url, function (poke) {
        $("#modal-detalle").html(`
            <h4 class="text-capitalize fw-bold">${poke.name}</h4>
            <img src="${poke.sprites.front_default}" class="img-fluid my-2">
            <p><b>Peso:</b> ${poke.weight}</p>
            <p><b>Altura:</b> ${poke.height}</p>
        `);
    }).fail(function () {
        $("#modal-detalle").html(`<p class="text-danger">No se pudo cargar el Pokémon.</p>`);
    });
}

$(document).ready(function () {
    cargarDemonSlayer();
    cargarPokemons();
});
