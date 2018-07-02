import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ShoppingItemsComponent } from "./shopping-items/shopping-items.component";
import { InviteesComponent } from "./invitees/invitees.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { BudgetComponent } from "./budget/budget.component";
import { AuthGuard } from "./auth/auth-guard.service";

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path:'items', component: ShoppingItemsComponent},
    {path:'budget', component: BudgetComponent, canActivate: [AuthGuard]},
    {path:'invitees', component: InviteesComponent, canActivate: [AuthGuard]},
    {path:'signin', component: SigninComponent},
    {path:'come', component: SignupComponent}
];

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes,{preloadingStrategy: PreloadAllModules})
    ],
    exports:[RouterModule]
})
export class AppRoutingModule{

}