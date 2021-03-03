import { Injectable } from '@angular/core';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { Router } from '@angular/router';
import { Observable, BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: firebase.auth.UserCredential = null;
  public user$: BehaviorSubject<firebase.auth.UserCredential> = new BehaviorSubject<firebase.auth.UserCredential>(null);
  public loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(public router: Router) {
  }

  public async login(email: string, password: string) {
    await firebase.auth().signInWithEmailAndPassword(email, password).
    then(user => {
      if (user){
        this.user = user;
        console.log(user);
        console.log('ppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp');
        localStorage.setItem('user', JSON.stringify(this.user));
        this.loggedIn$.next(true);
      } else {
        localStorage.setItem('user', null);
        this.loggedIn$.next(false);
      }
    });
  }

  public async register(email: string, password: string) {
    var result = await firebase.auth().createUserWithEmailAndPassword(email, password);
    this.sendEmailVerification();
  }

  private async sendEmailVerification() {
    await (await firebase.auth().currentUser).sendEmailVerification();
    this.loggedIn$.next(true);
    this.router.navigate(['admin/verify-email']);
  }

  public async sendPasswordResetEmail(passwordResetEmail: string) {
    return await firebase.auth().sendPasswordResetEmail(passwordResetEmail);
  }

  public async logout() {
    await firebase.auth().signOut();
    localStorage.removeItem('user');
    this.loggedIn$.next(false);
    this.router.navigate(['/']);
  }

  public loggedInUser(): any {
    return JSON.parse(localStorage.getItem('user'));
  }

  get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
  }


}
