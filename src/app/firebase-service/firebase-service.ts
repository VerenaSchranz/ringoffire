import { Injectable, OnDestroy } from '@angular/core';
import { Firestore, collection, onSnapshot, CollectionReference, QuerySnapshot } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService implements OnDestroy {
  games: any[] = [];
  unsubGame: () => void;
  firestore: Firestore;

  constructor(firestore: Firestore) {
    this.firestore = firestore;
    this.unsubGame = this.subscribeToGames();
  }

  ngOnDestroy(): void {
    this.unsubGame();
  }

  subscribeToGames() {
    const gamesRef: CollectionReference = collection(this.firestore, 'games');
    return onSnapshot(gamesRef, (snapshot: QuerySnapshot) => {
      this.games = [];
      snapshot.forEach((doc) => {
        const gameData = doc.data();
        this.games.push(gameData);
        console.log(gameData)
      });
    });
  }
}
