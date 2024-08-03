import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {
  constructor(private location: Location, private titleService:Title) {
    this.titleService.setTitle('404 - Oops! page is not found')
  }

  goBack() {
    this.location.back();
  }
}
