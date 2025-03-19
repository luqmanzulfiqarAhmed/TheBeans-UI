import { Component,OnInit,HostListener,Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule,isPlatformBrowser } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field'; // Add this
import { MatInputModule } from '@angular/material/input'; // Add this if missing
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms'; 

import { CoffeeBean } from '../../Models/coffee.model';
import { CoffeeService } from '../../Services/coffeeService.service';



@Component({
    selector: 'app-coffee-list',
    standalone: true,
    templateUrl: './coffee-list.component.html',
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule
    ],
    styleUrls: ['./coffee-list.component.scss']
})

export class CoffeeListComponent implements OnInit {
    beans: CoffeeBean[] = [];
    totalBeans = 0;
    loading = true;
    gridColumns = 3;
    placeholderItems = Array(6).fill(0);
    searchControl = new FormControl('');
  

    constructor(
        private coffeeService: CoffeeService,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object
      ) { }
  

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
          this.updateGridColumns(window.innerWidth);
        }
        this.loadBeans();
        this.setupSearch();
      }
  
      private updateGridColumns(width: number): void {
        if (isPlatformBrowser(this.platformId)) {
          this.gridColumns = width <= 768 ? (width <= 480 ? 1 : 2) : 3;
        } else {
          // Default value for server-side
          this.gridColumns = 3;
        }
      }
    
      @HostListener('window:resize', ['$event'])
      onResize(event: Event) {
        if (isPlatformBrowser(this.platformId)) {
          this.updateGridColumns(window.innerWidth);
        }
      }
  
    private setupSearch(): void {
      this.searchControl.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => this.coffeeService.searchBeans(value ?? ''))
      ).subscribe({
        next: (filteredBeans) => {
          this.beans = filteredBeans;
          this.loading = false;
        },
        error: (err) => {
          console.error('Search error:', err);
          this.loading = false;
        }
      });
    }
  
    async loadBeans(): Promise<void> {
      try {
        const data = await this.coffeeService.getBeans().toPromise() ?? [];
        this.beans = data ?? [];
        this.totalBeans = data.length;
        this.loading = false;
      } catch (error) {
        console.error('Error loading beans:', error);
        this.loading = false;
      }
    }
  
    viewDetails(bean: CoffeeBean): void {
      this.router.navigate(['/bean', bean._id]);
    }
  
    clearSearch(): void {
      this.searchControl.reset();
      this.loadBeans();
    }
  
    handleImageError(event: Event): void {
      const img = event.target as HTMLImageElement;
      img.src = '/assets/coffee-bean-placeholder.jpg';
    }
  }
