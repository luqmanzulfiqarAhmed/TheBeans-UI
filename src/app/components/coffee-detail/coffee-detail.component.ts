import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CoffeeBean } from '../../Models/coffee.model';
import { CoffeeService } from '../../Services/coffeeService.service';

@Component({
  selector: 'app-coffee-detail',
  standalone: true,
  templateUrl: './coffee-detail.component.html',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  styleUrls: ['./coffee-detail.component.scss']
})
export class CoffeeDetailComponent implements OnInit {
  bean: CoffeeBean | undefined;

  constructor(
    private route: ActivatedRoute,
    private coffeeService: CoffeeService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.coffeeService.getBeanById(id).subscribe({
        next: (data) => (this.bean = data),
        error: (err) => console.error('Error loading bean details:', err)
      });
    }
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = '/assets/coffee-bean-placeholder.jpg'; // Fallback image
  }
}