import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/ZSample/services/auth.service';
import { UseraccountService } from 'src/app/ZSample/services/useraccount.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  passwordRequiredError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UseraccountService,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  Login() {
    if (this.loginForm.valid) {
      const user = this.loginForm.value;

      console.log(user)
      this.userService.login(user.email, user.password).subscribe((data) => {
        this.authService.login(data);
        console.log(data);


        if(this.authService.isLoggedIn()){
          this.router.navigate(['/']);
        }else if(this.authService.isLoggedInAsAdmin()){
          this.router.navigate(['/admin']);

        }


      })
      // Perform login logic here, e.g., sending a request to a server
      console.log('Logging in...');
    } else {
      // Show the password required error message
      this.passwordRequiredError = true;
    }
  }
}
