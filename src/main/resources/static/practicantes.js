const API_KEY = "MULTIVERSO-KEY";

function listarBecarios() {
    $.ajax({
        url: "/becario",
        type: "GET",
        headers: { "X-API-KEY": API_KEY },
        success: function (data) {
            $("#bec-tbody").empty();
            $("#bec-total").text(data.length);

            data.forEach(b => {
                $("#bec-tbody").append(`
                    <tr>
                        <td>${b.id}</td>
                        <td>${b.nombreCompleto}</td>
                        <td>${b.carrera}</td>
                        <td>${b.universidad}</td>
                        <td>${b.email}</td>
                        <td>${b.pais}</td>
                        <td>${b.estado}</td>
                        <td>
                            <button onclick='editar(${b.id})'>Editar</button>
                            <button onclick='eliminar(${b.id})'>Eliminar</button>
                        </td>
                    </tr>
                `);
            });
        }
    });
}

function guardarBecario() {
    let becario = {
        id: $("#bec-id").val() || null,
        nombreCompleto: $("#bec-nombre").val(),
        carrera: $("#bec-carrera").val(),
        universidad: $("#bec-universidad").val(),
        email: $("#bec-email").val(),
        pais: $("#bec-pais").val(),
        estado: $("#bec-estado").val()
    };

    let metodo = becario.id ? "PUT" : "POST";

    $.ajax({
        url: "/becario",
        type: metodo,
        headers: { "X-API-KEY": API_KEY },
        data: JSON.stringify(becario),
        contentType: "application/json",
        success: function () {
            listarBecarios();
            $("#form-becario")[0].reset();
            $("#bec-id").val("");
        }
    });
}

function editar(id) {
    $.ajax({
        url: "/becario/" + id,
        type: "GET",
        headers: { "X-API-KEY": API_KEY },
        success: function (b) {
            $("#bec-id").val(b.id);
            $("#bec-nombre").val(b.nombreCompleto);
            $("#bec-carrera").val(b.carrera);
            $("#bec-universidad").val(b.universidad);
            $("#bec-email").val(b.email);
            $("#bec-pais").val(b.pais);
            $("#bec-estado").val(b.estado);
        }
    });
}

function eliminar(id) {
    $.ajax({
        url: "/becario/" + id,
        type: "DELETE",
        headers: { "X-API-KEY": API_KEY },
        success: function () {
            listarBecarios();
        }
    });
}

$(document).ready(function () {
    listarBecarios();

    $("#form-becario").submit(function (e) {
        e.preventDefault();
        guardarBecario();
    });
});
