import { Injectable, OnInit, inject, OnDestroy } from '@angular/core';
import { Firestore, collection, addDoc, doc, onSnapshot } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService implements OnDestroy {
  firestore: Firestore;
  games: any[] = []; 
  unsubGame: () => void;

  constructor(firestore: Firestore) {
    this.firestore = firestore;
    this.unsubGame = this.subscribeToGames();
  }

  ngOnDestroy(): void {
    this.unsubGame();
  }

  subscribeToGames() {
    return onSnapshot(this.getGameRef(), (snapshot) => {
      this.games = [];
      snapshot.forEach((doc) => {
        const gameData = doc.data() as Game; // Daten des Spiels aus dem Dokument extrahieren
        gameData.games = doc.games; // Die ID des Spiels aus dem Dokument extrahieren
        this.games.push(gameData); // Spiel zur Liste hinzufügen
      });
    });
  }

  getGameRef() {
    return collection(this.firestore, 'games');
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }
}