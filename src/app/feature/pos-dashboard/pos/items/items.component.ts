import {Component, OnInit} from '@angular/core';
import {ItemsResolved, Upload} from '../item';
import {of} from 'rxjs';
import {PosDbService} from '../pos-db.service';
import {ActivatedRoute} from '@angular/router';

// import { saveAs } from 'file-saver';


@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {

    productTypes = ['Drink', 'Food'];
    addItemActive = false;

    newItemPrice: number;
    newItemName: string;
    newItemType: string;
    public responseData1: any;
    public responseData2: any;

    products = [];

    food;
    drink;
    currentUpload: Upload;
    private errorMessage: any;
    private selectedFiles: any;

    constructor(private posDb: PosDbService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        const resolvedData: ItemsResolved = this.route.snapshot.data.resolvedData;
        this.products[0] = of(resolvedData.drink);
        this.products[1] = of(resolvedData.food);
    }

    addItemToggle() {
        this.newItemPrice = null;
        this.newItemName = null;
        this.newItemType = null;
        this.addItemActive = this.addItemActive !== true;
    }

    addItem() {
        // this.currentUpload = new Upload(file);
        const uploadData = new FormData();
        uploadData.append('myfile', this.selectedFiles, this.selectedFiles.name);
        const reader = new FileReader();
        reader.readAsDataURL(new Blob([this.selectedFiles]));
        // this.posDb.pushUpload(this.newItemName, this.newItemPrice, this.newItemType, uploadData);
        // saveAs( new Blob([this.selectedFiles], { type: 'image/jpeg' } ), this.selectedFiles.name);
        // this.posDb.getUpload(this.selectedFiles.name);
        this.newItemName = null;
        this.newItemPrice = null;
        this.newItemType = null;
        this.selectedFiles = null;
    }

    detectFiles(event) {
        this.selectedFiles = event.target.files[0];
    }

    updateItem(id, type, name, price) {
        this.newItemName = name;
        this.newItemPrice = +price;
        this.newItemType = type;
        const obj = {
            itemId: id,
            itemType: type,
            itemName: this.newItemName,
            itemPrice: this.newItemPrice,
            itemQuantity: 1
        };
        console.log(obj);
        this.posDb.updateItem(obj).subscribe(
            () => this.onUpdateComplete(`The Item was Updated`),
            (error: any) => this.errorMessage = error as any
        );
        // if (this.newItemType === 'Food') {
        //   this.products[0][]
        // }
    }

    deleteItem(id, img) {
        this.posDb.deleteItem(id).subscribe(
            () => this.onDeleteComplete(`The Item was Updated`),
            (error: any) => this.errorMessage = error as any
        );
    }

    private onUpdateComplete(s: string) {
        console.log(s);
        this.posDb.getItems().subscribe(item => {
            this.products[0] = of(item[`food`]);
            this.products[1] = of(item[`drink`]);
        });
    }

    private onDeleteComplete(s: string) {
        console.log(s);
        this.posDb.getItems().subscribe(item => {
            this.products[0] = of(item[`food`]);
            this.products[1] = of(item[`drink`]);
        });
    }

    onUpload() {

    }
}
