import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';


import { CoffeeBean } from '../../Models/coffee.model';
import { CoffeeService } from '../../Services/coffeeService.service';

@Component({
  selector: 'app-bean-of-the-day',
  standalone:true,
  templateUrl: './bean-of-the-day.component.html',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  styleUrls: ['./bean-of-the-day.component.scss']
})
export class BeanOfTheDayComponent implements OnInit {
  botd: CoffeeBean | undefined;

  constructor(private coffeeService: CoffeeService, private router: Router) { }

  ngOnInit(): void {
    this.coffeeService.getBeanOfTheDay().subscribe(bean => {
      this.botd = bean;
    });
  }

  viewDetails(): void {
    if (this.botd) {
      this.router.navigate(['/beans', this.botd._id]);
    }
  }
}
