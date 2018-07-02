import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { HnInviteesService } from '../hn-invitees/hn-invitees.service';
import { Subscription, Subject } from 'rxjs';
import { Inv } from '../inv.model';
import { Invitee } from '../invitee.model';
import { HnDataStorageService } from './hm-data-storage.service';

@Component({
  selector: 'app-hn-invitees',
  templateUrl: './hn-invitees.component.html',
  styleUrls: ['./hn-invitees.component.css']
})
export class HnInviteesComponent implements OnInit, OnDestroy {

  displayedColumns = ['name', 'count'];
  selectedGroup = 'all';
  badgeCountH: number=0;
  email:string = localStorage.getItem('email');
  
  HInvitees: Inv[] = this.hnInviteesService.getInviteesList();
  filteredHInvitees: Invitee[] = [];
  dataSource: MatTableDataSource<Invitee>;
  private subscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private hnInviteesService: HnInviteesService,private hnInviteeDS: HnDataStorageService) { }

  ngOnInit() {
    this.hnInviteeDS.fetchInvitees();
    this.subscription = this.hnInviteesService.InviteesChanged.subscribe(
      (invitees: Inv[]) => {
        this.HInvitees = invitees;
        this.onGroupSelected();
        this.badgeCountGenerator();
        // this.generateRstList(this.selectedGroup);
        // this.dataSource = new MatTableDataSource(this.filteredHInvitees);
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
      }
    );
    this.generateRstList(this.selectedGroup);
    this.dataSource = new MatTableDataSource(this.filteredHInvitees);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  badgeCountGenerator(){
    this.badgeCountH =0;
    this.HInvitees.forEach(element => { 
      if(element.count!=="second"){
        this.badgeCountH++;
      }
    });
    this.hnInviteesService.budgetCountHChanged.next(this.badgeCountH);
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
      for (var i = 0; i < this.HInvitees.length; i++) {
        this.filteredHInvitees[i] = new Invitee(this.HInvitees[i].name, this.HInvitees[i].count, this.HInvitees[i].where, this.HInvitees.indexOf(this.HInvitees[i]));
      }
      // return this.filteredHInvitees;
    }
    else {
      for (var i = 0; i < this.HInvitees.length; i++) {
        if (selectedGroup == this.HInvitees[i].where ) {
          this.filteredHInvitees[temp] = new Invitee(this.HInvitees[i].name, this.HInvitees[i].count, this.HInvitees[i].where, this.HInvitees.indexOf(this.HInvitees[i]));;
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
    this.hnInviteesService.startedEditing.next(index);
  }

  onSave(){
    this.hnInviteeDS.saveInvitees().subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
