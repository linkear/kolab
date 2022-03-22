class roles {
    constructor(){
        this.rol = document.getElementById('roles')
        this.nombreRol = document.getElementById('nombreRol')
        this.contenido1 = document.getElementById('contenido1')
        this.contenido2 = document.getElementById('contenido2')
        this.Rol = document.getElementById('rol')
    }
    inicio(){
        this.Rol.style.display = 'none'
        this.contenido1.style.display = 'none'
        this.contenido2.style.display = 'none'
        rol.cambio()
    }
    cambio(){
        if(this.rol.value === '1'){
            this.nombreRol.value = 'administrador'
            this.contenido1.style.display = 'block'
        }else{
            if(this.rol.value === '2'){
                this.nombreRol.value = 'doers'
                this.contenido2.style.display = 'block'
            }  
        }
    }
}

let rol = new roles()

window.onload = rol.inicio()