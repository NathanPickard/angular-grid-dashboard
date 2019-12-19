import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { UserProfile } from '../core/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore) { }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['']);
  }

  isLoggedIn() {
    return !!this.afAuth.auth.currentUser;
  }

  createUserDocument() {
    //get the current user
    const user = this.afAuth.auth.currentUser;

    // create the object with new data
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      address: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
      specialty: '',
      ip: ''
    };

    // write to Cloud Firestore
    return this.afs.doc(`users/${user.uid}`).set(userProfile);
  }
}
