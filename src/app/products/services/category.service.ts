import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private db = firebase.database();
  public categories$: BehaviorSubject<string[]> = new BehaviorSubject([]);

  constructor() {
    this.getCategories();
   }

  public getCategories(): void {
    const categoriesRef = this.db.ref('categories');
    categoriesRef.once('value', (snapshot) => {
    }).then(snapshot => {
      const categories = Object.keys(snapshot.val());
      this.categories$.next(categories);
    });
  }

}
