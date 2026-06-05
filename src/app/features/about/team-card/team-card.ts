import { Component, input, output } from '@angular/core';
import { TeamMemberInterface } from '../team-member.interface';
import { CommonModule } from '@angular/common';
import { ShortTextPipe } from "../../../shared/pipes/short-text-pipe";

@Component({
  selector: 'app-team-card',
  imports: [CommonModule, ShortTextPipe],
  templateUrl: './team-card.html',
  styleUrl: './team-card.scss',
})
export class TeamCard {

  /* team-member data received from parent component */
  member = input.required<TeamMemberInterface>();

  /* event emitter GitHub button clicked & handle click */
  githubClicked = output<string>();
  
  /* controls bio expand state short or long */
  isExpanded = false; 

  onGithubClick(): void {
    this.githubClicked.emit(this.member().name);
  }
}
