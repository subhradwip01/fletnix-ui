import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../component/layouts/header/header.component';
import { FooterComponent } from '../../component/layouts/footer/footer.component';
import { NgFor, NgIf } from '@angular/common';
import { MovieService } from '../../Service/MovieService/movie.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-show-details',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NgIf, NgFor],
  templateUrl: './show-details.component.html',
  styleUrl: './show-details.component.css',
})
export class ShowDetailsComponent {
  show: Show | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location : Location
  ) {}

  ngOnInit(): void {
    const showId = this.route.snapshot.paramMap.get('id');

    if (showId) {
      this.fetchShowDetails(showId);
    }
  }

  fetchShowDetails(id: string): void {
    this.movieService.getShowDetails(id).subscribe({
      next: (res) => {
        this.show = res.data.show
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching show details:', error);
        this.isLoading = false;
      },
    });
  }
  goBack(): void {
    this.location.back();
  }
}
