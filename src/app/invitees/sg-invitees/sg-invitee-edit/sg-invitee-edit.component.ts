import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Inv } from '../../inv.model';
import { SgInviteesService } from '../sg-invitees.service';
import { SgDataStorageService } from '../sg-data-storage.service';

@Component({
  selector: 'app-sg-invitee-edit',
  templateUrl: './sg-invitee-edit.component.html',
  styleUrls: ['./sg-invitee-edit.component.css']
})
export class SgInviteeEditComponent implements OnInit,OnDestroy {

  @ViewChild('f') hnInviteeForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedInviteeIndex: number;
  editedInvitee: Inv;
  nameInput:string = "";
  LocationSelectedValue: string = "";
  CountSelectedValue: string = "";

  constructor(private sgInviteeservice: SgInviteesService, private sgInviteeDS: SgDataStorageService) { }

  ngOnInit() {
    this.subscription = this.sgInviteeservice.startedEditing.subscribe(
      (index: number) =>{
        this.editedInviteeIndex = index;
        this.editMode = true;
        this.editedInvitee = this.sgInviteeservice.getInvitee(index);
        this.nameInput = this.editedInvitee.name;
        this.LocationSelectedValue = this.editedInvitee.where;
        this.CountSelectedValue = this.editedInvitee.count;
      }
    )
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newSgInvitee = new Inv(value.name, this.CountSelectedValue, this.LocationSelectedValue);
    if(this.editMode){
      this.sgInviteeservice.updateInvitee(this.editedInviteeIndex, newSgInvitee);
      this.saveData();
    } else{
      this.sgInviteeservice.addInvitee(newSgInvitee);
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
    this.sgInviteeservice.deleteInvitee(this.editedInviteeIndex);
    this.hnInviteeForm.reset();
    this.editMode = false;
    this.saveData();
  }

  saveData(){
    this.sgInviteeDS.saveInvitees().subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
