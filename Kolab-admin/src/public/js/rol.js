class roles {
    constructor(){
        this.rol = document.getElementById('roles')
        this.nombreRol = document.getElementById('nombreRol')
        this.contenedor1 = document.getElementById('contenedor1')
        this.contenedor2 = document.getElementById('contenedor2')
        this.Rol = document.getElementById('rol')
    }
    inicio(){
        this.Rol.style.display = 'none'
        this.contenedor1.style.display = 'none'
        this.contenedor2.style.display = 'none'
        rol.cambio()
    }
    cambio(){
        if(this.rol.value === '1'){
            this.nombreRol.value = 'administrador'
            this.contenedor1.style.display = 'block'
        }else{
            if(this.rol.value === '2'){
                this.nombreRol.value = 'doers'
                this.contenedor2.style.display = 'block'
            }  
        }
    }
}

let rol = new roles()

window.onload = rol.inicio()