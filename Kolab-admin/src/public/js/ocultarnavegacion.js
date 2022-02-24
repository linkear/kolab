class proceso{
    constructor(){
        this.navegacion = document.getElementById('navegacion')
    }
    ocultar(){
        if(this.navegacion.style.display = 'block'){
            this.navegacion.style.display = 'none'
        }
    }
}

let procesos = new proceso()

window.onload = procesos.ocultar()