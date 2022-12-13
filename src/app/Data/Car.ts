import * as internal from "stream";

export class Car {
    constructor(
        public carPlateNumber: string,
        public imgCarNumber: string,
        public licenseNumber: string,
        public imglicenseNumber: string,
        public ownerCode: string,
        public driverId: number,
    ) { }
}