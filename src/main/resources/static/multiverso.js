let totalConsultas = 0;

// ======================================
//     P O K E M O N
// ======================================
let pokeOffset = 0;
let pokemonCargados = 0;

function cargarPokemons() {
    totalConsultas++;

    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon?offset=" + pokeOffset + "&limit=20",
        type: "GET",
        success: function (data) {
            pokeOffset += 20;
            pokemonCargados += data.results.length;

            $("#poke-total").text(pokemonCargados);

            data.results.forEach(p => {
                $("#poke-cards").append(`
                    <div class="card" onclick="mostrarPokemon('${p.url}')">
                        <h4>${p.name}</h4>
                    </div>
                `);
            });
        }
    });
}

function mostrarPokemon(url) {
    totalConsultas++;

    $.get(url, function (poke) {
        $("#modal-detalle").html(`
            <h2>${poke.name}</h2>
            <img src="${poke.sprites.front_default}">
            <p>Peso: ${poke.weight}</p>
            <p>Altura: ${poke.height}</p>
        `);
        $("#modal").show();
    });
}


// ======================================
//     R I C K   &   M O R T Y
// ======================================
let personajesRM = [];

function cargarRM(page) {
    totalConsultas++;

    $.ajax({
        url: "https://rickandmortyapi.com/api/character?page=" + page,
        type: "GET",
        success: function (data) {
            personajesRM = data.results;

            $("#rm-total").text(personajesRM.length);
            renderRM();
        }
    });
}

function renderRM() {
    let filtro = $("#rm-filter").val();
    let lista = [];

    personajesRM.forEach(p => {
        if (filtro === "todos" || p.status === filtro) lista.push(p);
    });

    $("#rm-total-filtrado").text(lista.length);
    $("#rm-cards").empty();

    lista.forEach(p => {
        $("#rm-cards").append(`
            <div class="card" onclick="mostrarRM(${p.id})">
                <img src="${p.image}">
                <h4>${p.name}</h4>
            </div>
        `);
    });
}

function mostrarRM(id) {
    const p = personajesRM.find(x => x.id === id);
    if (!p) return;

    $("#modal-detalle").html(`
        <h2>${p.name}</h2>
        <img src="${p.image}">
        <p>Estado: ${p.status}</p>
        <p>Especie: ${p.species}</p>
        <p>Origen: ${p.origin.name}</p>
    `);

    $("#modal").show();
}


// ======================================
// EVENTOS
// ======================================
$(document).ready(function () {

    cargarPokemons();
    $("#poke-load-more").click(cargarPokemons);

    cargarRM(1);
    $(".rm-page-btn").click(function () {
        let page = $(this).data("page");
        cargarRM(page);
    });

    $("#rm-filter").change(renderRM);

    $("#cerrar-modal").click(() => $("#modal").hide());
});
