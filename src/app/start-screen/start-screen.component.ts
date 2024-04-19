import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Game } from "../../models/game";
import { FirebaseService } from "../firebase-service/firebase-service";

@Component({
  selector: "app-start-screen",
  standalone: true,
  imports: [CommonModule, StartScreenComponent],
  templateUrl: "./start-screen.component.html",
  styleUrl: "./start-screen.component.scss",
})
export class StartScreenComponent {
  constructor(
    private router: Router,
    private firebaseService: FirebaseService
  ) {}

  async newGame() {
    const game = new Game();
    await this.firebaseService.addGame(game.toJson(), "games");
    this.router.navigateByUrl("/game/" + this.firebaseService.gameId);
  }
}
