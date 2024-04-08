import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, Game],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
pickCardAnimation = false;
game: Game;

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    this.pickCardAnimation = true;
  }
}
