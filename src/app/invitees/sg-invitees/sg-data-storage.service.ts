import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../auth/auth.service";
import { Inv } from "../inv.model";
import { Injectable } from "@angular/core";
import { SgInviteesService } from "./sg-invitees.service";

@Injectable()
export class SgDataStorageService{
    constructor(private httpClient: HttpClient, 
        private sgInviteeService: SgInviteesService,
        private authService: AuthService){}

    saveInvitees(){
        const token = this.authService.getToken();

        return this.httpClient.put('https://my-marriage-540b5.firebaseio.com/sgInvitees.json?auth=' + token, this.sgInviteeService.getInviteesList());
    }

    fetchInvitees(){
        const token = this.authService.getToken();

        this.httpClient.get<Inv[]>('https://my-marriage-540b5.firebaseio.com/sgInvitees.json?auth=' + token).subscribe(
            (invitees: Inv[]) => {
                this.sgInviteeService.setInvitees(invitees);
            }
        )
    }
}