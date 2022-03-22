class ocultar {
    constructor(){
        this.kolab = document.getElementById('kolab')
    }
    inicio(){
        this.kolab.style.display = 'none'
    }
}

let a = new ocultar()

window.onload = a.inicio()