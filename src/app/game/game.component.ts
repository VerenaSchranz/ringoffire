import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { FirebaseService } from '../firebase-service/firebase-service';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    DialogAddPlayerComponent,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    GameInfoComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})

export class GameComponent {
firestore: Firestore = inject(Firestore);
pickCardAnimation = false;
currentCard: string ='';
game: Game = new Game();


constructor(public dialog: MatDialog, private firebaseService: FirebaseService) {}

openDialog(): void {
  const dialogRef = this.dialog.open( DialogAddPlayerComponent );
  dialogRef.afterClosed().subscribe((name: string) => {
    if (name && name.length > 0) {
      this.game.players.push(name);
    }
  });
}

getTopPosition(index: number): number {
  return 100 + (index * 120);
}

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    this.firebaseService.addGame(this.game, 'games');
  }

  takeCard() {
    if (!this.pickCardAnimation && this.game.stack.length > 0) {
      this.currentCard = this.game.stack.pop()!;
      this.pickCardAnimation = true;
      console.log('New card:', this.currentCard);
      console.log('Game is', this.game);
      this.game.currentPlayer++;
      if (this.game.currentPlayer >= this.game.players.length) {
        this.game.currentPlayer = 0;
      }
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }
}
