import { Component } from '@angular/core';
import { BaseTitle } from '../../components/base/base-title/base-title';
import { ProfileCard } from '../../components/general/profile-card/profile-card';
import { User } from '../../types/profile.interface';

@Component({
  selector: 'app-profile-page',
  imports: [BaseTitle, ProfileCard],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage {
  currentUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'j@gmail.com',
    avatarUrl: 'https://i.pravatar.cc/150',
  };
}
