import {Component, inject, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../../core/auth/auth.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'cms-forget-password',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  @ViewChild("ForgetPasswordForm") ForgetPasswordForm: any;
  protected email: string;

  private authService: AuthService = inject(AuthService);
  protected onSubmit = () => {
    this.authService.forgetPasswordRequest(this.ForgetPasswordForm.email)
      .subscribe({
        next: (data: any) => {
          console.log(data)
        },
        error: (error: HttpErrorResponse) => {
          console.log(error)
        },
        complete: () => {
          console.log("completed")
        }
      })
  }


}
