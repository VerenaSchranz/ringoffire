import { Injectable, OnDestroy } from "@angular/core";
import {
  Firestore,
  collection,
  onSnapshot,
  CollectionReference,
  QuerySnapshot,
  addDoc,
  updateDoc,
  deleteDoc
} from "@angular/fire/firestore";
import { Subscription } from "rxjs";
import { GameComponent } from "../game/game.component";

@Injectable({
  providedIn: "root",
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
    await addDoc(this.getCollectionRef(collectionName), item)
      .catch((err) => {
        console.error(err);
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef);
      });
  }
  
  getCollectionRef(collectionName: string) {
    return collection(this.firestore, collectionName);
  }
  
  getGamesRef() {
    return collection(this.firestore, "games");
  }
}
