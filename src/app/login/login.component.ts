import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = 'admin'
  password = 'password'
  invalidLogin = false

  constructor(private router: Router,
    private loginservice: AuthenticationService) { }

  ngOnInit() {
  }

  checkLogin() {
    this.loginservice.authenticate(this.username, this.password)
            .pipe(first())
            .subscribe(
                data => {
                  this.router.navigate([''])
                  this.invalidLogin = false
                },
                error => {
                    console.log(error)
                    this.invalidLogin = true
                });
  }

}