//import { Slug } from "sanity";

import { Slug } from "sanity";

/*export interface Car {
    /*pricePerDay: any;
    
    _id : string;
    name : "name";
    _type :string;
    image? : {
        asset : {
            _ref : string;
            _type : "image";
        }
    };
    price : number;
    description?: string;
  
    slug : {
        _type : "slug"
        current : string;
    };
}*/
export interface Car {
    quantity: number;
  id: string;
    _id: string
    name: string;
    slug: Slug;
    brand: string;
    type: string;
    fuelCapacity: string;
    transmission: string;
    seatingCapacity: string;
    pricePerDay: number;
    originalPrice: number;
    description : string;
    tags: string;
    image: { asset: { _ref: string; _type: string }

};


inventory : number;
  }

