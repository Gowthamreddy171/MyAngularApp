import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(){
    // firebase.initializeApp({
    //   apiKey: "AIzaSyBGh4oDq1AQ6fK_5bMqkBCCadGPZ6ppXSA",
    //   authDomain: "my-marriage-540b5.firebaseapp.com",
    //   storageBucket: "my-marriage-540b5.appspot.com",
    // })
  }

}
