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
import { Firestore, addDoc, collection, onSnapshot } from '@angular/fire/firestore';
import { FirebaseService } from '../firebase-service/firebase-service';
import { ActivatedRoute } from '@angular/router';


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
game: Game = new Game();
unsubGameDescription: any;
gameId!: string;
gameOver = false;

constructor(public dialog: MatDialog, 
  private firebaseService: FirebaseService,
  private route: ActivatedRoute
  ) {}

openDialog(): void {
  const dialogRef = this.dialog.open( DialogAddPlayerComponent );
  dialogRef.afterClosed().subscribe((name: string) => {
    if (name && name.length > 0) {
      this.game.players.push(name);
      // firebase savGame fehlt
    }
  });
}

getTopPosition(index: number): number {
  return 100 + (index * 120);
}

ngOnInit(): void {
  this.unsubGameDescription = this.gameDescription();
}

gameDescription() {
  this.route.params.subscribe((params) => {
    this.gameId = params['id'];
    this.unsubGameDescription = onSnapshot(
      this.firebaseService.getSingleDocRef('games', this.gameId),
      (GameData) => {
        let game = GameData.data();
        console.log(game)
        if (game) {
          this.game.currentPlayer = game['currentPlayer'];
          this.game.playedCards = game['playedCards'];
          this.game.players = game['players'];
          console.log(this.game.players)
          this.game.player_images = game['player_images'];
          this.game.stack = game['stack'];
          this.game.pickCardAnimation = game['pickCardAnimation'];
          this.game.currentCard = game['currentCard'];
        }
      }
    );
  });
}

ngOnDestroy() {
  if (this.unsubGameDescription) {
    this.unsubGameDescription.unsubscribe();
  }
}

  takeCard() {
    if (!this.game.pickCardAnimation && this.game.stack.length > 0) {
      this.game.currentCard = this.game.stack.pop()!;
      this.game.pickCardAnimation = true;
      console.log('New card:', this.game.currentCard);
      console.log('Game is', this.game);
      this.game.currentPlayer++;
      if (this.game.currentPlayer >= this.game.players.length) {
        this.game.currentPlayer = 0;
      }
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.firebaseService.saveGame(this.game, this.gameId);
      }, 1000);
    }
  }
}
