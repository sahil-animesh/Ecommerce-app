import { Injectable } from '@angular/core';
import { collection,  getDocs } from 'firebase/firestore';
import { db } from 'src/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  constructor() {}
  async getProducts() {
    const querySnapshot = await getDocs(collection(db, "Products"));
    return querySnapshot;
  }
}
