import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, Validators} from '@angular/forms';
import {ChangePasswordRequest} from '../model/auth.model';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../../core/auth/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {PasswordValidator} from '../../../validators/password.validator';
import {PasswordMatchValidator} from '../../../validators/password-match.validator';

@Component({
  selector: 'cms-change-password',
  imports: [CommonModule, FormsModule, RouterLink, PasswordValidator, PasswordMatchValidator],
  standalone: true,
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent {

  @ViewChild("ChangePasswordForm") ChangePasswordForm: any;
  private authService: AuthService = inject(AuthService);

  protected changePasswordRequest: ChangePasswordRequest = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  }

  // ngOnInit() {
  //   this.ChangePasswordForm.get('newPassword')?.valueChanges.subscribe(() => {
  //     this.updateConfirmPasswordValidator();
  //   });
  // }

  // updateConfirmPasswordValidator() {
  //   const newPassword = this.ChangePasswordForm.get('newPassword');
  //   const confirmPassword = this.ChangePasswordForm.get('confirmNewPassword');
  //
  //   if (!newPassword || !confirmPassword) return;
  //
  //   // Remove all validators first
  //   confirmPassword.clearValidators();
  //   confirmPassword.clearAsyncValidators();
  //
  //   // Apply required only when password is valid & touched
  //   if (newPassword.valid && newPassword.touched) {
  //     confirmPassword.addValidators([Validators.required]);
  //   }
  //
  //   // Force the cmsPasswordMatchValidator directive to run
  //   confirmPassword.updateValueAndValidity({ emitEvent: false });
  // }

  protected onSubmit = () => {
    console.log(this.ChangePasswordForm.value);
    this.authService.changePasswordRequest(
      this.ChangePasswordForm.value
    ).subscribe(
      {
        next: (data: any) => {
          console.log(data)
        },
        error: (error: HttpErrorResponse) => {
          console.log(error)
        },
        complete: () => console.log("complete")

      }
    )
  }

}
