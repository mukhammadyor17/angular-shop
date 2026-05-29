import { Component } from '@angular/core';
import { TeamMemberInterface } from './team-member.interface';

@Component({
  selector: 'app-about-us',
  imports: [],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss',
})
export class AboutUs {
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
  (this.currentSlide + 1) % this.teamMembers.length;
}

/* go to previous slide logic */
prevtSlide(): void {
  (this.currentSlide - 1 + this.teamMembers.length) % this.teamMembers.length;
}
}
