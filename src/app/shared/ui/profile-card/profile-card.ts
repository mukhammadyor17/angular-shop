import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { User } from '../../models/user.model';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-profile-card',
  imports: [DatePipe, MatIcon],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss',
})
export class ProfileCard {
  user = input.required<User>();
}
