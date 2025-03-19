import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CoffeeBean } from '../Models/coffee.model';

@Injectable({
  providedIn: 'root', // This makes the service available application-wide
})

export class CoffeeService {
  // JSON data – replace with HTTP call if using a backend API.
  private beans: CoffeeBean[] = [
    {
      "_id": "66a374596122a40616cb8599",
      "index": 0,
      "isBOTD": true,
      "Cost": "£39.26",
      "Image": "https://images.unsplash.com/photo-1672306319681-7b6d7ef349cf",
      "colour": "dark roast",
      "Name": "TURNABOUT",
      "Description": "Ipsum cupidatat nisi do elit veniam Lorem magna. Ullamco qui exercitation fugiat pariatur sunt dolore Lorem magna magna pariatur minim. Officia amet incididunt ad proident. Dolore est irure ex fugiat. Voluptate sunt qui ut irure commodo excepteur enim labore incididunt quis duis. Velit anim amet tempor ut labore sint deserunt.\r\n",
      "Country": "Peru"
    },
    {
      "_id": "66a374591a995a2b48761408",
      "index": 1,
      "isBOTD": false,
      "Cost": "£18.57",
      "Image": "https://images.unsplash.com/photo-1641399756770-9b0b104e67c1",
      "colour": "golden",
      "Name": "ISONUS",
      "Description": "Dolor fugiat duis dolore ut occaecat. Excepteur nostrud velit aute dolore sint labore do eu amet. Anim adipisicing quis ut excepteur tempor magna reprehenderit non ut excepteur minim. Anim dolore eiusmod nisi nulla aliquip aliqua occaecat.\r\n",
      "Country": "Vietnam"
    },
    // ... include the remaining coffee bean items from your JSON data ...
    {
      "_id": "66a3745997fa4069ce1b418f",
      "index": 14,
      "isBOTD": false,
      "Cost": "£29.42",
      "Image": "https://images.unsplash.com/photo-1544486864-3087e2e20d91",
      "colour": "green",
      "Name": "XEREX",
      "Description": "Esse ad eiusmod eiusmod nisi cillum magna quis non voluptate nulla est labore in sunt. Magna aliqua pariatur commodo deserunt. Pariatur pariatur pariatur id excepteur ex elit veniam.\r\n",
      "Country": "Brazil"
    }
  ];

  constructor() { }

  getBeans(): Observable<CoffeeBean[]> {
    return of(this.beans);
  }

  getBeanById(id: string): Observable<CoffeeBean | undefined> {
    return of(this.beans.find(bean => bean._id === id));
  }

  getBeanOfTheDay(): Observable<CoffeeBean | undefined> {
    return of(this.beans.find(bean => bean.isBOTD));
  }

  searchBeans(term: string): Observable<CoffeeBean[]> {
    if (!term.trim()) {
      return of(this.beans);
    }
    const filtered = this.beans.filter(bean =>
      bean.Name.toLowerCase().includes(term.toLowerCase()) ||
      bean.Country.toLowerCase().includes(term.toLowerCase()) ||
      bean.colour.toLowerCase().includes(term.toLowerCase())
    );
    return of(filtered);
  }
}
