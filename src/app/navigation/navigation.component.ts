import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { HnInviteesService } from '../invitees/hn-invitees/hn-invitees.service';
import { SgInviteesService } from '../invitees/sg-invitees/sg-invitees.service';
import { InviteeService } from '../invitees/invitee.service';
import { Inv } from '../invitees/inv.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  badgeCountTotal: number = 0;
  hnInviteeList: Inv[] = [];
  sgInviteeList: Inv[] = [];
  badgeCountG: number = 0;
  badgeCountH: number = 0;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router,
    private inviteeService: InviteeService,
    private httpClient: HttpClient,
  ) { }

  ngOnInit() {
    this.fetchInvitees();
    this.inviteeService.budgetCountTotalChanged.subscribe(
      (badgeTotal) => {
        this.badgeCountTotal = badgeTotal;
      }
    )
  }

  fetchInvitees() {
    this.httpClient.get<Inv[]>('https://my-marriage-540b5.firebaseio.com/sgInvitees.json').subscribe(
      (invitees: Inv[]) => {
        this.sgInviteeList = invitees;
        this.badgeCountGGenerator();
      }
    )

    this.httpClient.get<Inv[]>('https://my-marriage-540b5.firebaseio.com/hnInvitees.json').subscribe(
      (invitees: Inv[]) => {
        this.hnInviteeList = invitees;
        this.badgeCountHGenerator();
      }
    )

  }

  badgeCountHGenerator() {
    this.hnInviteeList.forEach(element => {
      if (element.count !== "second") {
        this.badgeCountH++;
      }
    });
    this.badgeCountTotal = this.badgeCountG + this.badgeCountH;
  }

  badgeCountGGenerator() {
    this.badgeCountG = 0;
    this.sgInviteeList.forEach(element => {
      if (element.count !== "second") {
        this.badgeCountG++;
      }
    });

  }

  authenticate(){
    return this.authService.isAuthenticated();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

}
