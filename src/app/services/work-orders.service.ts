import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWorkOrdersCommand } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class WorkOrdersService {
  constructor(private http: HttpClient) {}
  getWorkOrders(): Observable<IWorkOrdersCommand> {
    return this.http.get<IWorkOrdersCommand>('assets/data.json');
  }
}
