import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule,FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card'; // Add this
import { CommonModule } from '@angular/common'; // Add this
import { MatIcon } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { CoffeeService } from '../../Services/coffeeService.service';
import { CoffeeBean } from '../../Models/coffee.model';

@Component({
    selector: 'app-order-form',
    standalone: true,
    templateUrl: './order-form.component.html',
    imports: [
        CommonModule, // Required for *ngFor
        ReactiveFormsModule, // Brings form directives
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatSelectModule,
        MatCardModule, // For mat-card components
        MatIcon,
        MatDividerModule
    ],
    styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
    orderForm: FormGroup; // Keep this as class property
    beans: CoffeeBean[] = [];

    constructor(private fb: FormBuilder, private coffeeService: CoffeeService) {
        this.orderForm = this.fb.group({
            beanId: ['', Validators.required],
            quantity: [1, [Validators.required, Validators.min(1)]],
            customerName: ['', Validators.required],
            address: ['', Validators.required]
        });
    }

    // Rest of the component remains the same
    ngOnInit(): void {
        this.coffeeService.getBeans().subscribe(data => {
            this.beans = data;
            console.log(data);
        });
    }

    submitOrder(): void {
        if (this.orderForm.valid) {
            console.log('Order submitted', this.orderForm.value);
            alert('Order submitted successfully!');
            this.orderForm.reset({ quantity: 1 });
        }
    }

    get selectedBean(): CoffeeBean | undefined {
        return this.beans.find(b => b._id === this.orderForm.value.beanId);
      }
      
      calculateTotal(): number {
        const bean = this.selectedBean;
        const quantity = this.orderForm.value.quantity || 0;
        if (bean != null) {
            return 10 * quantity;
        }
        else{
            return 0;
        }
        
      }
}