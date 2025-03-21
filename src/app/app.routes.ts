// app.routes.ts
import { Routes } from '@angular/router';
import { CoffeeListComponent } from './components/coffee-list/coffee-list.component';
import { CoffeeDetailComponent } from './components/coffee-detail/coffee-detail.component';
import { BeanOfTheDayComponent } from './components/bean-of-the-day/bean-of-the-day.component';
import { OrderFormComponent } from './components/order-form/order-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/beans', pathMatch: 'full' },
  { path: 'beans', component: CoffeeListComponent },
  { path: 'botd', component: BeanOfTheDayComponent },
  { path: 'order', component: OrderFormComponent },
  { path: 'bean/:id', component: CoffeeDetailComponent }
];