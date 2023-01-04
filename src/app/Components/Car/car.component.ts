import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Car } from "src/app/Data/Car";
import { CarService } from "src/app/Services/car.service";
import { MngDataService } from "src/app/Services/mng-data.service";

@Component({
    selector: "app-car",
    templateUrl: "./car.component.html",
    styleUrls: ["./car.component.scss"]
})
export class CarComponent implements OnInit {

    cars: Car[];
    searchText: string = "";
    listId: number = 1;
    pageNumber: number = 1;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    title: string = "السيارات"
    constructor(private carService: CarService, private modalService: NgbModal, private data: MngDataService) { }

    ngOnInit(): void {
        this.data.setTitle(`${this.title}`);
        this.GetAllOwnersWithPagination(this.listId, this.pageNumber);
    }
    GetAllOwnersWithPagination(listId, pageNumber) {
        this.carService.getAll(listId, pageNumber).subscribe(res => {
            console.log(res)
            this.cars = res["items"];
            console.log("cars", this.cars);
            this.hasNextPage = res["hasNextPage"];
            this.hasPreviousPage = res["hasPreviousPage"];
            this.pageNumber = res["pageNumber"];
        });
    }
    open(content, carId) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            console.log(result);
            if (result == 'Delete') {
                this.carService.delete(carId).subscribe((res) => {
                    this.ngOnInit();
                })
            }
        }, (reason) => {
            console.log(reason);
        });
    }
    loadNext() {
        if (this.hasNextPage) {
            this.GetAllOwnersWithPagination(this.listId, this.pageNumber + 1);
        }
    }
    loadPrevious() {
        if (this.hasPreviousPage) {
            this.GetAllOwnersWithPagination(this.listId, this.pageNumber - 1)
        }
    }
} 