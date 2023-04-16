export class Usuario{
    constructor(
        public username:string,
        public password:string,
        public first_name:string,
        public last_name:string,
        public email:string,
        public created_at:Date,
    ){}

    public toString = () : String => {
        return  this.username;
    }
}