import { Component, OnInit, ViewChild } from '@angular/core';
import { Inv } from '../inv.model';
import { Invitee } from '../invitee.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Subscription } from 'rxjs';
import { SgInviteesService } from './sg-invitees.service';
import { SgDataStorageService } from './sg-data-storage.service';

@Component({
  selector: 'app-sg-invitees',
  templateUrl: './sg-invitees.component.html',
  styleUrls: ['./sg-invitees.component.css']
})
export class SgInviteesComponent implements OnInit {

  displayedColumns = ['name', 'count'];
  selectedGroup = 'all';
  badgeCountG: number=0;
  email:string = localStorage.getItem('email');

  GInvitees: Inv[] = this.sgInviteesService.getInviteesList();
  filteredHInvitees: Invitee[] = [];
  dataSource: MatTableDataSource<Invitee>;
  private subscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private sgInviteesService: SgInviteesService,private sgInviteeDS: SgDataStorageService) { }

  ngOnInit() {
    this.sgInviteeDS.fetchInvitees();
    this.subscription = this.sgInviteesService.InviteesChanged.subscribe(
      (invitees: Inv[]) => {
        this.GInvitees = invitees;
        this.onGroupSelected();
        this.badgeCountGenerator();
      }
    );
    this.generateRstList(this.selectedGroup);
    this.dataSource = new MatTableDataSource(this.filteredHInvitees);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  badgeCountGenerator(){
    this.badgeCountG =0;
    this.GInvitees.forEach(element => { 
      if(element.count!=="second"){
        this.badgeCountG++;
      }
    });
    this.sgInviteesService.budgetCountHChanged.next(this.badgeCountG);
  }
  
  onGroupSelected() {
    this.filteredHInvitees = [];
    this.generateRstList(this.selectedGroup);
    this.dataSource = new MatTableDataSource(this.filteredHInvitees);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  generateRstList(selectedGroup: string) {
    
    let temp = 0;
    
    if (selectedGroup === "all") {
      for (var i = 0; i < this.GInvitees.length; i++) {
        this.filteredHInvitees[i] = new Invitee(this.GInvitees[i].name, this.GInvitees[i].count, this.GInvitees[i].where, this.GInvitees.indexOf(this.GInvitees[i]));
      }
      // return this.filteredHInvitees;
    }
    else {
      for (var i = 0; i < this.GInvitees.length; i++) {
        if (selectedGroup == this.GInvitees[i].where ) {
          this.filteredHInvitees[temp] = new Invitee(this.GInvitees[i].name, this.GInvitees[i].count, this.GInvitees[i].where, this.GInvitees.indexOf(this.GInvitees[i]));;
          temp = temp + 1;
        }
      }
      // return this.filteredHInvitees
    }
    
  }
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onInviteeSelect(index: number){
    // console.log(index);
    this.sgInviteesService.startedEditing.next(index);
  }

  onSave(){
    this.sgInviteeDS.saveInvitees().subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
