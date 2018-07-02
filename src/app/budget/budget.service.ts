import { BudgetItem } from "./budget-items.model";
import { Subject } from "rxjs";
import {  Injectable } from "@angular/core";

@Injectable()
export class BudgetService {
    budgetItemChanged = new Subject<BudgetItem[]>();
    startedEditing = new Subject<number>();
    private budgetItems: BudgetItem[] = [];
    //  = [
    //     new BudgetItem('Hall advance', 400),
    //     new BudgetItem('Misc', 120)
    // ]

    getBudgetItems(){
        // console.log("get items");
        return this.budgetItems.slice();
    }

    getBudgetItem(i: number){
        return this.budgetItems[i];
    }

    setBudgetItems(items: BudgetItem[]){
        this.budgetItems = items;
        this.budgetItemChanged.next(this.budgetItems.slice());
    }

    addBudgetItems(item: BudgetItem){
        this.budgetItems.push(item);
        this.budgetItemChanged.next(this.budgetItems.slice());
    }

    updateBudgetItem(index:number, item: BudgetItem){
        this.budgetItems[index] = item;
        this.budgetItemChanged.next(this.budgetItems.slice());
    }

    deleteBudgetItem(index: number){
        this.budgetItems.splice(index,1);
        this.budgetItemChanged.next(this.budgetItems.slice());
    }
}