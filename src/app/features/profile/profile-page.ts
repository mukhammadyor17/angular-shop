import { Component } from '@angular/core';
import { ProfileCard } from '../../shared/ui/profile-card/profile-card';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-profile-page',
  imports: [ProfileCard],
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
