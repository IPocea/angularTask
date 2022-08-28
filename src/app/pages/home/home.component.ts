import { Component, OnInit } from '@angular/core';
import { WorkOrdersService } from 'src/app/services/work-orders.service';
import { take } from 'rxjs/operators';
import { IWorkOrder } from 'src/app/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoading: boolean = false;
  errorMessage: string = '';
  searchValue: string = '';
  workOrders: IWorkOrder[] = [];
  filteredWorkOrders: IWorkOrder[] = [];
  constructor(
    private workOrdersService: WorkOrdersService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.workOrdersService
      .getWorkOrders()
      .pipe(take(1))
      .subscribe(
        (data) => {
          this.workOrders = data.response.data;
          this.filteredWorkOrders = data.response.data;
          this.isLoading = false;
        },
        (err) => {
          this.errorMessage = err.message;
          this.isLoading = false;
        }
      );
  }
  clearValue(): void {
    this.searchValue = '';
    this.filteredWorkOrders = this.workOrders;
  }
  searchWorkOrder(): void {
    if (!this.searchValue.trim()) {
      this.showMessage();
    } else {
      this.applyFilters(this.searchValue);
    }
  }
  private showMessage(): void {
    this.snackBar.open('Plese enter at least one character', '', {
      duration: 3000,
    });
  }
  private applyFilters(searchInputValue: string): void {
    this.filteredWorkOrders = this.workOrders.filter((ele) => {
      if (
        ele.description
          .toLowerCase()
          .indexOf(searchInputValue.toLocaleLowerCase()) !== -1
      ) {
        return true;
      }
      return false;
    });
  }
}
