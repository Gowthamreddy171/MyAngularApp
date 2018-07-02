import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Inv } from '../../inv.model';
import { HnInviteesService } from '../hn-invitees.service';
import { HnDataStorageService } from '../hm-data-storage.service';

@Component({
  selector: 'app-hn-invitee-edit',
  templateUrl: './hn-invitee-edit.component.html',
  styleUrls: ['./hn-invitee-edit.component.css']
})
export class HnInviteeEditComponent implements OnInit,OnDestroy {

  @ViewChild('f') hnInviteeForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedInviteeIndex: number;
  editedInvitee: Inv;
  nameInput:string = "";
  LocationSelectedValue: string = "";
  CountSelectedValue: string = "";

  constructor(private hnInviteeservice: HnInviteesService, private hnInviteeDS: HnDataStorageService) { }

  ngOnInit() {
    this.subscription = this.hnInviteeservice.startedEditing.subscribe(
      (index: number) =>{
        this.editedInviteeIndex = index;
        this.editMode = true;
        this.editedInvitee = this.hnInviteeservice.getInvitee(index);
        this.nameInput = this.editedInvitee.name;
        this.LocationSelectedValue = this.editedInvitee.where;
        this.CountSelectedValue = this.editedInvitee.count;
      }
    )
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newHnInvitee = new Inv(value.name, this.CountSelectedValue, this.LocationSelectedValue);
    if(this.editMode){
      this.hnInviteeservice.updateInvitee(this.editedInviteeIndex, newHnInvitee);
      this.saveData();
    } else{
      this.hnInviteeservice.addInvitee(newHnInvitee);
      this.saveData();
    }
    this.editMode = false;
    this.hnInviteeForm.reset();
  }

  onClear() {
    this.hnInviteeForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.hnInviteeservice.deleteInvitee(this.editedInviteeIndex);
    this.hnInviteeForm.reset();
    this.editMode = false;
    this.saveData();
  }

  saveData(){
    this.hnInviteeDS.saveInvitees().subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
