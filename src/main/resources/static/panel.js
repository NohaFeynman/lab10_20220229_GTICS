setInterval(() => {
    $("#panel-poke").text($("#poke-total").text());
    $("#panel-ds").text($("#ds-total").text());
    $("#panel-expl-init").text($("#expl-iniciales").text());
    $("#panel-expl-new").text($("#expl-nuevos").text());
    $("#panel-bec").text($("#bec-total").text());
    $("#panel-consultas").text(totalConsultas);
}, 1000);
