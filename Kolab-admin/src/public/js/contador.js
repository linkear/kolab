class contador {
    constructor(){
        this.contadores = document.getElementById('contar')
        this.numeroUsuario = document.getElementById('numeroUsuario')
        this.rolNumero = document.getElementById('rolNumero')
        this.contador = document.getElementById('contador')
    }
    inicio(){
        this.contador.style.display = 'none'
    }
    cambio(){
        if(this.contadores.value === ''){
            this.contadores.value = 1
            this.numeroUsuario.value = 1
            this.rolNumero.value = 1
        }else{
            this.contadores.value = parseInt(this.contadores.value) + 1
            this.numeroUsuario.value = this.contadores.value
            this.rolNumero.value = 2
        }
    }
}

let numeroContador = new contador()
window.onload = numeroContador.cambio()
window.onload = numeroContador.inicio()