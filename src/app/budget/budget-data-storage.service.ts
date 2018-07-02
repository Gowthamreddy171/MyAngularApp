import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';

import { BudgetService } from "./budget.service";
import { AuthService } from "../auth/auth.service";
import { BudgetItem } from "./budget-items.model";

@Injectable()
export class BudgetDataStorageService{
    constructor(private httpClient: HttpClient, 
                private budgetService: BudgetService,
                private authService: AuthService){}

    saveBudget(){
        const token = this.authService.getToken();

        return this.httpClient.put('https://my-marriage-540b5.firebaseio.com/budget.json?auth=' + token, this.budgetService.getBudgetItems());
    }

    getBudget(){
        const token = this.authService.getToken();

        this.httpClient.get<BudgetItem[]>('https://my-marriage-540b5.firebaseio.com/budget.json?auth=' + token).subscribe(
            (items: BudgetItem[]) => {
                this.budgetService.setBudgetItems(items);
            }
        )
    }
}