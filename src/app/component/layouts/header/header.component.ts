import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../Service/AuthService/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  username: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.authService.getUsername().subscribe((value) => {
      this.username = value ?? '';
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
