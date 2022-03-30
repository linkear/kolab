class objetivo{
    constructor(){
        this.contenedor = document.getElementById('listaObjetivos')
        this.numero = document.getElementById('numeros')
    }
    crear(){
        for(let i = 0; i<parseInt(this.numero.value); i++){
        let input = document.createElement('textarea')
        input.setAttribute('type', 'text')
        input.name = 'objetivos'
        input.id = 'extras'
        this.contenedor.appendChild(input)
        }
    }
}

let objetivos = new objetivo