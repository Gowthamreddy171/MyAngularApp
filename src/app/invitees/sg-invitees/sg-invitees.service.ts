import { Subject } from "rxjs";
import { Inv } from "../inv.model";

export class SgInviteesService{

    InviteesChanged = new Subject<Inv[]>();
    startedEditing = new Subject<number>();
    budgetCountHChanged = new Subject<number>();
    private GInviteesList: Inv[] = 
    [
        new Inv('testRochester', 'second', 'Rochester'),
        new Inv('testOtherFrnds', 'none', 'OtherFriends'),
        new Inv('testMasters', 'none', 'Masters'),
        new Inv('testEngineer', 'none', 'Engineering'),
        new Inv('testRochester', 'first', 'Rochester'),
        new Inv('testOtherFrnds', 'none', 'OtherFriends'),
        new Inv('testMasters', 'none', 'Masters'),
        new Inv('testEngineer', 'second', 'Engineering'),
        new Inv('testRochester', 'first', 'Rochester'),
        new Inv('testOtherFrnds', 'none', 'OtherFriends'),
        new Inv('testMasters', 'none', 'Masters'),
        new Inv('testEngineer', 'none', 'Engineering'),
    ];

    getInviteesList(){
        return this.GInviteesList.slice();
    }

    getInvitee(i: number){
        return this.GInviteesList[i];
    }

    setInvitees(invitees: Inv[]){
        this.GInviteesList = invitees;
        this.InviteesChanged.next(this.GInviteesList.slice());
    }

    addInvitee(invitee: Inv){
        this.GInviteesList.push(invitee);
        this.InviteesChanged.next(this.GInviteesList.slice());
    }

    updateInvitee(index: number, invitee: Inv){
        this.GInviteesList[index] = invitee;
        this.InviteesChanged.next(this.GInviteesList.slice());
    }

    deleteInvitee(index: number){
        this.GInviteesList.splice(index,1);
        this.InviteesChanged.next(this.GInviteesList.slice());
    }


    
}