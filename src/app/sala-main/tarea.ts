export class Tarea{
    constructor(
        public id:string,
        public id_sala:string,
        public dev_asignado:string,
        public nombre_tarea:string,
        public desc_tarea:string,
        public estado_tarea:string,
        public tiempo_estimado: string,
        public prioridad : string,
        public url: string,
        public fecha_creacion?: any,
        public datos_user_dev?:any,
        public history?:any
    ){}

    public toString = () : String => {
        return  this.nombre_tarea;
    }
}