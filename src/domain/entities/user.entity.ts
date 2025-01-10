
export class UserEntity{
    constructor(
        public id :string,
        public name:string,
        public password:string,
        public email:string,
        public phoneNumber:string,
        public photoUrl:string
    ){}

}