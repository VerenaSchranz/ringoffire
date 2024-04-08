import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
// import { GameComponent } from '../../models/game';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent implements OnInit {
pickCardAnimation = false;
currentCard: string ='';
game: Game = new Game();

constructor() {
}

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation && this.game.stack.length > 0) {
      this.currentCard = this.game.stack.pop()!;
      this.pickCardAnimation = true;
      this.game.playedCard.push(this.currentCard);
      console.log('New card:', this.currentCard);
      console.log('Game is', this.game);
      setTimeout(() => {
        this.pickCardAnimation = false;
      }, 1500);
    }
  }
}
