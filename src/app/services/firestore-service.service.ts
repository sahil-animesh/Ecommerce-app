import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore/'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db ,storage} from 'src/enviroment';
import { DataServiceService } from './data-service.service';



@Injectable({
  providedIn: 'root'
})
export class FirestoreServiceService {

  constructor(private firestore: AngularFirestore, private dataservice: DataServiceService) { }

  createUser(data: {}) {
    const id=localStorage.getItem('token');
    if(id)
    {
      this.dataservice.userId=id;
    }
    const user = this.firestore.doc(`users/${this.dataservice.userId}`)
    return user.set(data);
  }
  createVendor(data: {}) {
    const user = this.firestore.doc(`vendor/${localStorage.getItem('token')}`)
    return user.set(data);
  }
  getData(userType:string) {
    const id=localStorage.getItem('token');
    if(id)
    {
      this.dataservice.userId=id;
    }
    return getDoc(doc(db, userType, this.dataservice.userId));
  }
  
}
