export interface App {
    // define state here
    appdefaults: appdefaults;
    cart: { name: string; quantity: number }[];
}

interface AppApp {
    readonly app: App;
}

export interface appdefaults {
    entityid: string;
    countryid: string;
}

interface RecipeItem {
    name: string;
    quantity: number;
}