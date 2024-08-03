import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../component/layouts/header/header.component';
import { FooterComponent } from '../../component/layouts/footer/footer.component';
import { NgFor, NgIf } from '@angular/common';
import { ShowService } from '../../Service/ShowService/show.service';
import { Location } from '@angular/common';
import { getFormattedDate } from '../../utils/date.utils';
import { Title } from '@angular/platform-browser';
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
  errorMessage: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private showService: ShowService,
    private location: Location,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    const showId = this.route.snapshot.paramMap.get('id');

    if (showId) {
      this.fetchShowDetails(showId);
    }
  }

  formattedDate(date: string): string {
    return getFormattedDate(date);
  }
  fetchShowDetails(id: string): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.showService.getShowDetails(id).subscribe({
      next: (res) => {
        this.show = res.data.show;
        this.titleService.setTitle(`Show details - ${res.data.show.title || 'FletNix a platform for show lovers'}`)
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching show details:', error);
        this.errorMessage = error.error?.message || 'Unable to get the information for the show please. Please reload or try again later';
        this.isLoading = false;
      },
    });
  }
  reload() {
    const showId = this.route.snapshot.paramMap.get('id');

    if (showId) {
      this.fetchShowDetails(showId);
    }
  }
  goBack(): void {
    this.location.back();
  }
}
