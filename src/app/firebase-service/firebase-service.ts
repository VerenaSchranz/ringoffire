import { Router } from '@angular/router';
import { Injectable, OnDestroy } from "@angular/core";
import {
  Firestore,
  collection,
  onSnapshot,
  CollectionReference,
  QuerySnapshot,
  addDoc,
  doc
} from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class FirebaseService implements OnDestroy {
  games: any[] = [];
  unsubGame: () => void;
  firestore: Firestore;

  constructor(private router: Router, firestore: Firestore) {
    this.firestore = firestore;
    this.unsubGame = this.subscribeToGames();
  }

  ngOnDestroy(): void {
    this.unsubGame();
  }

  subscribeToGames() {
    const gamesRef: CollectionReference = collection(this.firestore, "games");
    return onSnapshot(gamesRef, (snapshot: QuerySnapshot) => {
      this.games = [];
      snapshot.forEach((doc) => {
        const gameData = doc.data();
        this.games.push(gameData);
        console.log(gameData);
      });
    });
  }

  async addGame(item: any, collectionName: string) {
    try {
      const docRef = await addDoc(this.getCollectionRef(collectionName), item);
      console.log('Document written with ID:', docRef.id);
      this.router.navigate(['game', docRef.id]);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  }
  getGameById(colId: string, docId: string) {
    return this.getSingleDocRef(colId, docId);
  }
  
  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }
  

  getCollectionRef(collectionName: string) {
    return collection(this.firestore, collectionName);
  }

  getGamesRef() {
    return collection(this.firestore, "games");
  }
}
