export class Desarrollador{
    constructor(
        public id:string,
        public usuario: string,
        public url: string,
        public puntuacion: number,
    ){}

    public toString = () : String => {
        return  this.id;
    }
}