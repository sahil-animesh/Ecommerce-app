import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { db, storage } from 'src/enviroment';
import { DataServiceService } from './data-service.service';

@Injectable({
  providedIn: 'root'
})
export class VendorServiceService {

  constructor(private firestore: AngularFirestore,private dataservice:DataServiceService) { }
  uploadProductImage(file:any,fileName:string) {
    const storageRef = ref(storage, fileName);
    return uploadBytes(storageRef, file)
  }

  createProduct(data: {}) {
    const user = this.firestore.collection(`Products`)
    return user.add(data);
  }
 async getProducts() {
    const id=localStorage.getItem('token')
    const queryForProducts=query(collection(db,'Products'), where('vendorId','==',id));
    return getDocs(queryForProducts);

  }
  getProductData(productId:string) {
    return getDoc(doc(db, 'Products',productId));
  }
  deleteProduct(productId:string) {
    const docRef = doc(db, "Products", productId);

    return deleteDoc(docRef)
  }
  editProduct(productId:string,data:{}) {
    const docRef = doc(db, "Products",productId);
    return setDoc(docRef, data, { merge:true })
  }
  editProfile(data:{}) {
    const id = localStorage.getItem('token');
    if(id)
    {
      const docRef=doc(db,'vendor',id)
      return setDoc(docRef,data,{merge:true})
    }
    else {
      return new Promise((resolve, reject) => {
        resolve("User Id is not valid")
      })
    }
  }
}
