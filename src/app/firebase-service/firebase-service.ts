import { Router } from "@angular/router";
import { Injectable, OnDestroy } from "@angular/core";
import {
  Firestore,
  collection,
  onSnapshot,
  CollectionReference,
  QuerySnapshot,
  addDoc,
  doc,
  updateDoc,
} from "@angular/fire/firestore";
import { Game } from "../../models/game";
import { GameComponent } from "../game/game.component";

@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  games: any[] = [];
  unsubGame: () => void;
  firestore: Firestore;
  gameId: string = "";

  constructor(
    private router: Router,
    firestore: Firestore,
    private GameComponent: GameComponent
  ) {
    this.firestore = firestore;
    this.unsubGame = this.subscribeToGames();
  }

  ngOnDestroy(): void {
    this.GameComponent;
  }

  subscribeToGames() {
    const gamesRef: CollectionReference = collection(this.firestore, "games");
    return onSnapshot(gamesRef, (snapshot: QuerySnapshot) => {
      this.games = [];
    });
  }

  async saveGame(game: any, gameId: string) {
    try {
      const gameRef = this.getSingleDocRef("games", gameId);
      await updateDoc(gameRef, game);
      console.log("Spiel erfolgreich aktualisiert:", game);
    } catch (error) {
      console.error("Fehler beim Speichern des Spiels:", error);
    }
  }

  async addGame(item: any, collectionName: string) {
    try {
      const docRef = await addDoc(this.getCollectionRef(collectionName), item);
      console.log("Document written with ID:", docRef.id);
      this.gameId = docRef.id;
    } catch (error) {
      console.error("Error adding document:", error);
    }
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
