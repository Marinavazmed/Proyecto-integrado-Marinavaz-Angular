export class po{
    constructor(
        public id:string,
        public usuario:string,
        public url:string,
        public puntuacion:number,
    ){}

    public toString = () : String => {
        return  this.usuario;
    }
}