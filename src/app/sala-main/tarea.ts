export class Tarea{
    constructor(
        public id:string,
        public id_sala:string,
        public dev_asignado:string,
        public nombre_tarea:string,
        public desc_tarea:string,
        public estado_tarea:string,
        public tiempo_estimado: string,
        public puntos : number,
        public url: string
    ){}

    public toString = () : String => {
        return  this.nombre_tarea;
    }
}