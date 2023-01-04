import { Component, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CarOwner } from "src/app/Data/carOwner";
import { TypeOwner } from "src/app/Data/Enums";
import { CarOwnerService } from "src/app/Services/carOwner.service";
import { MngDataService } from "src/app/Services/mng-data.service";

@Component({
    selector: "app-carOwner",
    templateUrl: "./carOwner.component.html",
    styleUrls: ["./carOwner.component.scss"]
})
export class CarOwnerComponent implements OnInit {

    owners: CarOwner[];
    searchText: string = "";
    listId: number = 1;
    pageNumber: number = 1;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    ownerTypes = TypeOwner;
    title: string = "ملاك السيارات"
    constructor(private ownerService: CarOwnerService, private modalService: NgbModal, private data: MngDataService) { }

    ngOnInit(): void {
        this.data.setTitle(`${this.title}`);
        this.GetAllOwnersWithPagination(this.listId, this.pageNumber);
    }
    GetAllOwnersWithPagination(listId, pageNumber) {
        this.ownerService.getAll(listId, pageNumber).subscribe(res => {
            console.log(res)
            this.owners = res["items"];
            this.hasNextPage = res["hasNextPage"];
            this.hasPreviousPage = res["hasPreviousPage"];
            this.pageNumber = res["pageNumber"];
        });
    }
    open(content, ownerId) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            console.log(`Closed with: ${result}`);
            if (result == 'Delete') {
                this.ownerService.delete(ownerId).subscribe((res) => { this.ngOnInit(); })
            } else if (result == 'Reset') {
                //reset Password API
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