import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamMemberInterface } from './team-member.interface';
import { TeamCard } from './team-card/team-card';


@Component({
  selector: 'app-about-page',
  imports: [CommonModule, TeamCard],
  templateUrl: './about-page.html',
  styleUrl: './about-page.scss',
})
export class AboutPage {
/* active slide index */
currentSlide = 0;

/* team members data */
teamMembers: TeamMemberInterface[] = [
  {
    name: 'Mukhammadyor Turskhanov',
    role: 'team lead',
    bio: 'some text that will be implemented later',
    image: '',
    github: 'https://github.com/mukhammadyor17',
  },
    {
    name: 'Askhat Tassybayev',
    role: 'frontend developer',
    bio: 'some text that will be implemented later',
    image: '',
    github: 'https://github.com/aseke09',
  },
      {
    name: 'Dzina Korshunava',
    role: 'frontend developer',
    bio: 'some text that will be implemented later',
    image: '',
    github: 'https://github.com/DzinaKor',
  },
];

/* go to next slide logic */
nextSlide(): void {
    this.currentSlide =
      (this.currentSlide + 1) % this.teamMembers.length;
  }

/* go to previous slide logic */
  prevSlide(): void {
    this.currentSlide =
      (this.currentSlide - 1 + this.teamMembers.length)
      % this.teamMembers.length;
  }

  /* opens selected slide*/
  goToSlide(index: number): void {
    this.currentSlide = index;
  }

onGithubOpened(memberName: string): void {
  console.log(`${memberName} GitHub profile opened`);
}
}
