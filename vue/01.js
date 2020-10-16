const app = new Vue({
    el: '#app',
    data: {
        titulo: 'Hola mundo desde Vue',
        //frutas: ['Manzana','Pera','Banana']
        frutas: [
            {nombre:'Manzana', cantidad: 10},
            {nombre:'Pera', cantidad: 0},
            {nombre:'Banana', cantidad: 11}
        ],
        nuevaFruta: ''
    },
    methods:{
        agregarFruta(){
            //console.log('diste un clic');
            this.frutas.push({
                nombre: this.nuevaFruta, cantidad: 0
            });
            this.nuevaFruta='';
        }
    }
})