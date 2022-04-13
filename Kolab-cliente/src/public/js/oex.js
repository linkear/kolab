class oes{
    constructor(){
    }
    mostrar(){
        var div = '<div id="apararicion">'
        div += '<img src="/img/oex.jpg">'
        div += '</div>'
        document.getElementById("oex").innerHTML = div;
    }
    ocultar(){
        document.getElementById("oex").innerHTML = "";
    }
}

let oex = new oes()