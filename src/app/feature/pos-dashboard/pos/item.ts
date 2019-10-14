export interface Item {
    itemId: number;
    itemName: string;
    itemPrice: number;
    itemType: string;
    itemQuantity: number;
    itemImgName?: string;
    itemImgUrl?: string;
}

export interface ItemsResolved {
    food?: Item;
    drink?: Item;
    error?: any;
}


export interface Order {
    orderNumber?: string;
    orderDate: string;
    orderItems?: Item[];
    orderCartTotal: number;
    orderCartNumItems?: number;
}

export interface OrderResolved {
    order?: Order;
    error?: any;
}

export class Upload {
    $key: string;
    file: File;
    name: string;
    url: string;
    progress: number;
    createdAt: Date = new Date();

    constructor(file: File) {
        this.file = file;
    }
}
