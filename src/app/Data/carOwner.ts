import { TypeOwner } from "./Enums";

export class CarOwner {
    constructor(public id: number,
        public name: string,
        private ownerCode: string,
        public recordNo: string,
        public passportNo: string,
        public typeOwner: TypeOwner,
        // public phoneNo: string,
        // public contactNo: string
    ) { }
}