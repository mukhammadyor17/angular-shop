import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamMemberInterface } from './team-member.interface';
import { TeamCard } from './team-card/team-card';


@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, TeamCard],
  templateUrl: './about-page.html',
  styleUrls: ['./about-page.scss'],
})
export class AboutPage {
/* active slide index */
currentSlide = 0;

/* team members data */
teamMembers: TeamMemberInterface[] = [
  {
    name: 'Mukhammadyor Turskhanov',
    role: 'team lead, frontend developer',
    bio: 'Hey! I\'m a frontend developer from Kazakhstan with 5+ years of experience. My main stack is Vue, Angular, and TypeScript. I enjoy building scalable and well-structured web applications. Outside of work, I like watching and playing football, and reading books on various topics.',
    image: '/images/Mukhammadyor_Turskhanov.jpeg',
    github: 'https://github.com/mukhammadyor17',
  },
  {
    name: 'Dzina Korshunava',
    role: 'frontend developer',
    bio: 'Frontend Developer with over 3 years of experience, originally from Belarus and currently based in Tbilisi. I\'m passionate about frontend development and enjoy Angular💜 so much. Before transitioning into tech, I worked as a manager where I learned the value of teamwork, clear communication, and staying calm when solving challenges. Those skills continue to shape the way I work and collaborate. I\'m naturally curious and love learning new technologies, exploring AI tools, and turning ideas into working solutions. I believe every challenge is an opportunity to grow. Outside of coding, I\'m passionate about ethology and cynology. I also enjoy watching anime, organizing film screenings, and networking events.',
    image: '/images/Dzina_Kor.jpg',
    github: 'https://github.com/DzinaKor',
  },
  {
    name: 'Askhat Tassybayev',
    role: 'frontend developer',
    bio: 'Hi! I\'m a Frontend Developer from Kazakhstan with 2+ years of experience, specializing in React, TypeScript, Node.js, and now Angular. My experience includes developing enterprise applications, integrating with REST APIs, implementing complex workflows, multi-step forms, and document management systems. I focus on writing reusable, well-structured code, optimizing performance, and collaborating closely with backend developers and designers to deliver reliable products.',
    image: '/images/Askhat_Tassybayev.png',
    github: 'https://github.com/aseke09',
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
