import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { response } from 'express';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  ngOnInit(): void {   
  }

 userName: string = '';
 userPassword: string = '';
 hide: boolean = true;

 constructor(private afAuth: AngularFireAuth, private router: Router) {}



login() {
  // Regular expression to validate password strength
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!this.userPassword.match(passwordPattern)) {
    Swal.fire('Error', 'Password must contain at least 8 characters, including uppercase, lowercase, and a digit.', 'error');
    return;
  }

  if (this.userName && this.userPassword) {
    this.afAuth.signInWithEmailAndPassword(this.userName, this.userPassword)
      .then(() => {
        Swal.fire('Login Successfully');
        // Navigate to a different page after
        this.router.navigate(['container/manage']);
      })
    }





}
}
