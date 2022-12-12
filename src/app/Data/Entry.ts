export class Entry {
    constructor(
        public driverId: number,
        public carId: number,
        public ownerCarCode: string,
        public RFID: string = 'not implemented yet'
    ) { }
}