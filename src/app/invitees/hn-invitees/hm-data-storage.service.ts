import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../auth/auth.service";
import { HnInviteesService } from "./hn-invitees.service";
import { Inv } from "../inv.model";
import { Injectable } from "@angular/core";

@Injectable()
export class HnDataStorageService{
    constructor(private httpClient: HttpClient, 
        private hnInviteeService: HnInviteesService,
        private authService: AuthService){}

    saveInvitees(){
        const token = this.authService.getToken();

        return this.httpClient.put('https://my-marriage-540b5.firebaseio.com/hnInvitees.json?auth=' + token, this.hnInviteeService.getInviteesList());
    }

    fetchInvitees(){
        const token = this.authService.getToken();

        this.httpClient.get<Inv[]>('https://my-marriage-540b5.firebaseio.com/hnInvitees.json?auth=' + token).subscribe(
            (invitees: Inv[]) => {
                this.hnInviteeService.setInvitees(invitees);
            }
        )
    }
}