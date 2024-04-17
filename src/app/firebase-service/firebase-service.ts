import { Injectable, OnInit, inject } from '@angular/core';
import { Firestore, collection, doc, addDoc, onSnapshot } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService implements OnInit {
  game: Game[] = [];

  firestore: Firestore = inject(Firestore);
  // item$;
  unsubList;
  // unsubSingle;

  constructor(private firestore: FirebaseService) {
    this.unsubList = this.subGameList();
    }

  ngOnInit(): void {

  }

  subGameList() {
    const q = query(this.getGameRef(), limit(100));
    return onSnapshot(q, (list) => {
      this.games = [];
      list.forEach((element) => {
        // this.normalNotes.push(this.setNoteObject(element.data(), element.id));
      });
    });
  }

  getGameRef() {
    return collection(this.firestore, 'games');
  }

  getSingleDocRef(colId:string, docId:string) {
    return doc(collection(this.firestore, colId), docId);
  }
}
