const API_KEY = "MULTIVERSO-KEY";

function alerta(tipo, mensaje) {
    $("body").append(`
        <div class="alert alert-${tipo} position-fixed top-0 end-0 m-3 shadow" id="alerta">
            ${mensaje}
        </div>
    `);
    setTimeout(() => $("#alerta").fadeOut(300, () => $("#alerta").remove()), 2000);
}

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
                    <tr id="row-${b.id}">
                        <td>${b.id}</td>
                        <td>${b.nombreCompleto}</td>
                        <td>${b.carrera}</td>
                        <td>${b.universidad}</td>
                        <td>${b.email}</td>
                        <td>${b.pais}</td>
                        <td>${b.estado}</td>
                        <td>
                            <button class="btn btn-sm btn-primary" onclick='editar(${b.id})'>Editar</button>
                            <button class="btn btn-sm btn-danger" onclick='eliminar(${b.id})'>Eliminar</button>
                        </td>
                    </tr>
                `);
            });
        },
        error: function () {
            alerta("danger", "Error al listar becarios");
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

    if (!becario.nombreCompleto || !becario.email) {
        alerta("danger", "Todos los campos son obligatorios");
        return;
    }

    let metodo = becario.id ? "PUT" : "POST";

    $.ajax({
        url: "/becario",
        type: metodo,
        headers: { "X-API-KEY": API_KEY },
        data: JSON.stringify(becario),
        contentType: "application/json",
        success: function () {
            alerta("success", "Guardado correctamente");
            listarBecarios();
            $("#form-becario")[0].reset();
            $("#bec-id").val("");
        },
        error: function () {
            alerta("danger", "Error al guardar becario");
        }
    });
}

function editar(id) {
    $.ajax({
        url: "/becario/" + id,
        type: "GET",
        headers: { "X-API-KEY": API_KEY },
        success: function (b) {
            $("#row-" + id).addClass("table-info");
            setTimeout(() => $("#row-" + id).removeClass("table-info"), 1000);

            $("#bec-id").val(b.id);
            $("#bec-nombre").val(b.nombreCompleto);
            $("#bec-carrera").val(b.carrera);
            $("#bec-universidad").val(b.universidad);
            $("#bec-email").val(b.email);
            $("#bec-pais").val(b.pais);
            $("#bec-estado").val(b.estado);
        },
        error: function () {
            alerta("danger", "No se pudo obtener el becario");
        }
    });
}

function eliminar(id) {
    if (!confirm("¿Eliminar becario?")) return;

    $.ajax({
        url: "/becario/" + id,
        type: "DELETE",
        headers: { "X-API-KEY": API_KEY },
        success: function () {
            alerta("success", "Eliminado correctamente");
            listarBecarios();
        },
        error: function () {
            alerta("danger", "No se pudo eliminar el becario");
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
