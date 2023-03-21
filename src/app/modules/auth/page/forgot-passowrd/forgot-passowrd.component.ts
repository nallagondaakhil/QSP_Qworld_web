import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-passowrd',
  templateUrl: './forgot-passowrd.component.html',
  styleUrls: ['./forgot-passowrd.component.scss']
})
export class ForgotPassowrdComponent implements OnInit {

  forgotPasswordForm!: FormGroup;
  resetPasswordForm!: FormGroup;
  heading = "Forgot your password?";
  subHeading = "Enter your e-mail address we’ll send you a link to reset your password";
  isResetPassword = false;
  showEnterPassword = false;
  showConfirmPassword = false;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.buildForm();
  }


  get f() {
    return this.forgotPasswordForm.controls;
  }

  get resetForm(){
    return this.resetPasswordForm.controls;
  }

  validateEmail() {
   

    const credentials = this.forgotPasswordForm.value;
    this.isResetPassword = true;
    this.heading = "Enter your password";
    this.subHeading = "Your password must contain at least one number, at least one Special character and 4 digits long.";

  }

  private buildForm(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      username: ['', Validators.required],
    });
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      cPassword: ['', Validators.required],
    });
  }

  resetPassword(){}


  ngOnInit(): void {
  }

}
