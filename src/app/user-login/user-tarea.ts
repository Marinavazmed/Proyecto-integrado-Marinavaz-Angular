export class Usertarea{
    constructor(
        public username:string,
        public first_name:string,
        public last_name:string,
        public email:string,
        public is_premiun:boolean,
        public url:string,
    ){}

    public toString = () : String => {
        return  this.username;
    }
}