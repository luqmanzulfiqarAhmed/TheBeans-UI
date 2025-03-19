import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoffeeListComponent } from './components/coffee-list/coffee-list.component';
import { CoffeeDetailComponent } from './components/coffee-detail/coffee-detail.component';
import { BeanOfTheDayComponent } from './components/bean-of-the-day/bean-of-the-day.component';
import { OrderFormComponent } from './components/order-form/order-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/beans', pathMatch: 'full' },
  { path: 'beans', component: CoffeeListComponent },
  { path: 'beans/:id', component: CoffeeDetailComponent },
  { path: 'botd', component: BeanOfTheDayComponent },
  { path: 'order', component: OrderFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
