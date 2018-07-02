import { Component, OnInit, OnDestroy } from '@angular/core';
import { HnInviteesService } from './hn-invitees/hn-invitees.service';
import { Subscription } from 'rxjs';
import { SgInviteesService } from './sg-invitees/sg-invitees.service';
import { InviteeService } from './invitee.service';

@Component({
  selector: 'app-invitees',
  templateUrl: './invitees.component.html',
  styleUrls: ['./invitees.component.css']
})
export class InviteesComponent implements OnInit, OnDestroy {

  badgeCountH: number=0;
  private hnBadgeSubscription: Subscription;
  badgeCountG: number=0;
  private SgBadgeSubscription: Subscription;
  badgeCountTotal: number = 0;

  constructor(private hnInviteeService: HnInviteesService, private sgInviteeService: SgInviteesService, private inviteeService: InviteeService) { }

  ngOnInit() {
    this.hnBadgeSubscription = this.hnInviteeService.budgetCountHChanged.subscribe(
      (badgeCount)=>{
        this.badgeCountH = badgeCount;
        this.badgeCountTotalGenerator();
      }
    )

    this.SgBadgeSubscription = this.sgInviteeService.budgetCountHChanged.subscribe(
      (badgeCount)=>{
        this.badgeCountG = badgeCount;
        this.badgeCountTotalGenerator();
      }
    )
  }

  badgeCountTotalGenerator(){
    this.badgeCountTotal = this.badgeCountH+this.badgeCountG;
    this.inviteeService.budgetCountTotalChanged.next(this.badgeCountTotal);
    // console.log(this.badgeCountTotal);
  }

  ngOnDestroy(){
    this.SgBadgeSubscription.unsubscribe();
    this.hnBadgeSubscription.unsubscribe();
  }
}
