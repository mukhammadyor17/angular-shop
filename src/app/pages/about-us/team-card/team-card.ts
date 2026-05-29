import { Component, input, output } from '@angular/core';
import { TeamMemberInterface } from '../team-member.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-card',
  imports: [CommonModule],
  templateUrl: './team-card.html',
  styleUrl: './team-card.scss',
})
export class TeamCard {

  /* team-member data received from parent component */
  member = input.required<TeamMemberInterface>();

  /* event emitter GitHub button clicked & handle click */
  githubClicked = output<string>();

  onGithubClick(): void {
    this.githubClicked.emit(this.member().name);
  }
}
