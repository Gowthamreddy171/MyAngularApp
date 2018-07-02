import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BudgetService } from '../budget.service';
import { BudgetItem } from '../budget-items.model';
import { Subscription } from 'rxjs';
import { BudgetDataStorageService } from '../budget-data-storage.service';

@Component({
  selector: 'app-budget-edit',
  templateUrl: './budget-edit.component.html',
  styleUrls: ['./budget-edit.component.css']
})
export class BudgetEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') budForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: BudgetItem;

  constructor(private budgetService: BudgetService, private budgetDS: BudgetDataStorageService) { }

  ngOnInit() {
    this.subscription = this.budgetService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.budgetService.getBudgetItem(index);
        this.budForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }
  
  onSubmit(form: NgForm){
    const value = form.value;
    const newBudgetItem = new BudgetItem(value.name, value.amount);
    if(this.editMode){
      this.budgetService.updateBudgetItem(this.editedItemIndex, newBudgetItem);
      this.saveData();
    }else{
      this.budgetService.addBudgetItems(newBudgetItem);
      this.saveData();
    }
    this.editMode = false;
    this.budForm.reset();
  }

  onClear() {
    this.budForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.budgetService.deleteBudgetItem(this.editedItemIndex);
    this.budForm.reset();
    this.editMode = false;
    this.saveData();
  }

  saveData(){
    this.budgetDS.saveBudget().subscribe(
      (response: Response) => {
        console.log(response)
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
