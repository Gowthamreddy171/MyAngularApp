import { Subject } from "rxjs";
import { Inv } from "../inv.model";

export class HnInviteesService{

    InviteesChanged = new Subject<Inv[]>();
    budgetCountHChanged = new Subject<number>();
    startedEditing = new Subject<number>();
    private HInviteesList: Inv[] = [];
    // [
    //     new Inv('testRochester', 'second', 'Rochester'),
    //     new Inv('testOtherFrnds', 'none', 'OtherFriends'),
    //     new Inv('testMasters', 'none', 'Masters'),
    //     new Inv('testEngineer', 'none', 'Engineering'),
    //     new Inv('testRochester', 'first', 'Rochester'),
    //     new Inv('testOtherFrnds', 'none', 'OtherFriends'),
    //     new Inv('testMasters', 'none', 'Masters'),
    //     new Inv('testEngineer', 'second', 'Engineering'),
    //     new Inv('testRochester', 'first', 'Rochester'),
    //     new Inv('testOtherFrnds', 'none', 'OtherFriends'),
    //     new Inv('testMasters', 'none', 'Masters'),
    //     new Inv('testEngineer', 'none', 'Engineering'),
    // ];

    getInviteesList(){
        return this.HInviteesList.slice();
    }

    getInvitee(i: number){
        return this.HInviteesList[i];
    }

    setInvitees(invitees: Inv[]){
        this.HInviteesList = invitees;
        this.InviteesChanged.next(this.HInviteesList.slice());
    }

    addInvitee(invitee: Inv){
        this.HInviteesList.push(invitee);
        this.InviteesChanged.next(this.HInviteesList.slice());
    }

    updateInvitee(index: number, invitee: Inv){
        this.HInviteesList[index] = invitee;
        this.InviteesChanged.next(this.HInviteesList.slice());
    }

    deleteInvitee(index: number){
        this.HInviteesList.splice(index,1);
        this.InviteesChanged.next(this.HInviteesList.slice());
    }


    
}