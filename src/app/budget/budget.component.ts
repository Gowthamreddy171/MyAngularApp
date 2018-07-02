import { Component, OnInit, ViewChild, OnDestroy, AfterContentInit, AfterViewInit } from '@angular/core';
import { BudgetItem } from './budget-items.model';
import { BudgetService } from './budget.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Subscription } from 'rxjs';
import { BudgetDataStorageService } from './budget-data-storage.service';
import { trigger, state, style, transition, animate,  } from '@angular/animations';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
  animations:[
    trigger('list1',[
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ]),
      transition('* => void', [
        animate(800,style({
          color: 'red'
        })),
        animate(300, style({
          transform: 'translateX(100px)',
          opacity: 0
        }))
      ])
    ]),
  ],
})
export class BudgetComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;

  constructor(private budgetService: BudgetService, private budgetDS: BudgetDataStorageService) { }

  displayedColumns = ['name', 'amount'];
  budgetItems: BudgetItem[] = [];
  private subscription: Subscription;
  email:string = localStorage.getItem('email');
  
  dataSource:MatTableDataSource<BudgetItem>;
  
  ngOnInit() {
    this.budgetDS.getBudget();
    //this.budgetItems = this.budgetService.getBudgetItems();
    this.subscription = this.budgetService.budgetItemChanged.subscribe(
      (items: BudgetItem[]) => {
        this.budgetItems = items;
        this.dataSource = new MatTableDataSource(this.budgetItems);
        
      }
    );
    this.dataSource = new MatTableDataSource(this.budgetItems);
    this.dataSource.sort = this.sort;
  }

  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getTotalCost() {
    return this.budgetItems.map(t => t.amount).reduce((acc, value) => acc + value, 0);
  }

  onSelect(index: number){
    // console.log(index);
    this.budgetService.startedEditing.next(index);
    
  }

  onSave(){
    this.budgetDS.saveBudget().subscribe(
      (response: Response) => {
        console.log(response)
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

