import * as internal from "stream";

export class Car {
    constructor(
        public carPlateNumber: string,
        public imgCarNumber: string,
        public licenceNumber: string,
        public imglicenceNumber: string,
        public ownerCode: string,
        public driverId: number,
    ) { }
}