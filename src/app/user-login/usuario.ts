export class Usuario{
    constructor(
        public username:string,
        public password:string,
        public first_name:string,
        public last_name:string,
        public email:string,
        public is_premiun:boolean
    ){}

    public toString = () : String => {
        return  this.username;
    }
}