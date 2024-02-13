export interface UploadJson {
  restaurants: UploadRestaurant[];
}

export interface UploadRestaurant {
  name: string;
  menus: UploadMenu[];
}

export interface UploadMenu {
  name: string;
  menu_items?: UploadMenuItem[];
  dishes?: UploadDish[];
}

export interface UploadMenuItem {
  name: string;
  price: number;
}

export interface UploadDish {
  name: string;
  price: number;
}
