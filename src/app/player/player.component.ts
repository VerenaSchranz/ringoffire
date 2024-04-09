import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GameComponent } from '../game/game.component';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [MatCardModule, GameComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent implements OnInit{
  ngOnInit(): void {

  }
  @Input() playerActive: boolean = false;
  @Input() player!: string;
}
