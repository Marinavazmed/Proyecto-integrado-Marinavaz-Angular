export class sala_put_service{
    constructor(
        public id:string,
        public prod_owner: string,
        public devs: any,
        public nombre_sala: string,
        public pass_sala: string,
        public url: string
    ){}

    public toString = () : String => {
        return  this.id;
    }
}