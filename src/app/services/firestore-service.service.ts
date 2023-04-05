import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore/'
import { DataServiceService } from './data-service.service';


@Injectable({
  providedIn: 'root'
})
export class FirestoreServiceService {

  constructor(private firestore: AngularFirestore,private dataservice:DataServiceService) { }
  
  createUser(data:{}) {
    const user= this.firestore.doc(`users/${this.dataservice.userId}`)
    return user.set(data);
  }
}
