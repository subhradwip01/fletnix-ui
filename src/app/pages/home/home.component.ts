import { Component } from '@angular/core';
import { HeaderComponent } from '../../component/layouts/header/header.component';
import { FooterComponent } from '../../component/layouts/footer/footer.component';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowService } from '../../Service/ShowService/show.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NgFor, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  shows: Show[] = [];
  filteredShows: Show[] = [];
  searchTerm: string = '';
  isLoading = true;
  currentPage = 1;
  hasNextPage = true;
  errorMessage: string | null = null;
  selectedType: string | null = 'All';

  constructor(
    private router: Router,
    private showService: ShowService,
    private route: ActivatedRoute,
    private titleService: Title
  ) {
    this.titleService.setTitle('FletNix - A ultimate show lover platform')
  }

  ngOnInit(): void {
    this.selectedType = 'Movie';
    this.route.queryParamMap.subscribe((params) => {
      this.currentPage = Number(params.get('page')) || 1;
      this.selectedType = params.get('type') || 'All';
      this.fetchShows();
    });
  }

  fetchShows(): void {
    this.isLoading = true;
    this.showService
      .getShows(
        this.selectedType !== 'All' ? this.selectedType : null,
        this.currentPage
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.shows = res.data.shows;
          this.filteredShows = res.data.shows;
          this.hasNextPage = res.data.hasNextPage;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching shows:', error);
          this.errorMessage = error.message;
          this.isLoading = false;
        },
      });
  }

  filterShows(): void {
    this.filteredShows = this.shows.filter(
      (show) =>
        show.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        show.cast?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    console.log(this.filteredShows);
  }
  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value.trim();
    if (this.searchTerm === '') this.filteredShows = this.shows;
    else this.filterShows();
  }

  onTypeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedType = selectElement.value;
    this.currentPage = 1;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: this.currentPage,
        type: this.selectedType !== 'All' ? this.selectedType : null,
      },
      queryParamsHandling: 'merge',
    });
    this.fetchShows();
  }

  goToDetails(show_id: string): void {
    this.router.navigate(['/show-details', show_id]);
  }
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: this.currentPage - 1 },
        queryParamsHandling: 'merge', // Merge with existing query params
      });
    }
  }

  goToNextPage(): void {
    console.log(this.hasNextPage);
    if (this.hasNextPage) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: this.currentPage + 1 },
        queryParamsHandling: 'merge', // Merge with existing query params
      });
    }
  }
}
