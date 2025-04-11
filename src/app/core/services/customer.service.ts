// Example of a domain-specific service
// src/app/core/services/customer.service.ts
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private apiService: ApiService) { }

  getCustomers(): Observable<Customer[]> {
    return this.apiService.get<Customer[]>('customers');
  }

  getCustomer(id: number): Observable<Customer> {
    return this.apiService.get<Customer>(`customers/${id}`);
  }

  createCustomer(customer: Partial<Customer>): Observable<Customer> {
    return this.apiService.post<Customer>('customers', customer);
  }

  updateCustomer(id: number, customer: Partial<Customer>): Observable<Customer> {
    return this.apiService.put<Customer>(`customers/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<void> {
    return this.apiService.delete<void>(`customers/${id}`);
  }
}

// Similar services would be created for all entities in the ERD
