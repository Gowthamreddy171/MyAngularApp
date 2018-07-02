import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class AuthService {
    token: string;

    constructor(private router: Router, private route: ActivatedRoute){

    }

    signupUser(email: string, password: string){
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(
            error => console.log(error)
        )
    }

    signinUser(email: string, password: string){
        firebase.auth().signInWithEmailAndPassword(email, password).then(
            (response) => {
                // console.log(JSON.stringify(response));
                firebase.auth().currentUser.getIdToken().then(
                    (token: string) => {
                        this.token = token;
                        localStorage.setItem('currentUser',token);
                        localStorage.setItem('email', firebase.auth().currentUser.email);
                    }
                );
                this.router.navigate([this.route.snapshot.queryParams['returnUrl']||'/']);
            }
        )
        .catch(
            error => console.log(error)
        );
    }

    logout(){
        firebase.auth().signOut();
        localStorage.removeItem('currentUser');
        localStorage.removeItem('email');
        this.token = null;
    }

    getToken(){
        // firebase.auth().currentUser.getIdToken().then(
        //     (token: string) => this.token = token
        // );
        this.token = localStorage.getItem('currentUser');
        // console.log("token: " + this.token);
        return this.token;
    }

    isAuthenticated(){
        // return this.token != null;
        return localStorage.getItem('currentUser') != null;
    }
}