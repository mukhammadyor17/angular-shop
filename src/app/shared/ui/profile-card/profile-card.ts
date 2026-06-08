import { Component, input } from '@angular/core';
import { User } from '../../models/user.model';
import { BaseCard } from '../base-card/base-card';

@Component({
  selector: 'app-profile-card',
  imports: [BaseCard],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss',
})
export class ProfileCard {
  user = input.required<User>();
}
