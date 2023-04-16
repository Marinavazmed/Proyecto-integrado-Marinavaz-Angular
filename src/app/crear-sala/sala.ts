export class Sala{
    constructor(
        public devs:string,
        public nombre_sala:string,
        public pass_sala:string,
    ){}

    public toString = () : String => {
        return  this.nombre_sala;
    }
}