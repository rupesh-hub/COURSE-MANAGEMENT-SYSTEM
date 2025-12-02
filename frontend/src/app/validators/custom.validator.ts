import {AbstractControl, ValidationErrors} from '@angular/forms';
import {AuthService} from '../core/auth/auth.service';
import {UserResponse} from '../pages/auth/model/auth.model';
import {Observable} from 'rxjs';

export class CustomValidator {

  public static passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control?.value?.trim();
    if (!password) return null;
    const forbidden = ['test', 'password'];
    if (forbidden.includes(password.toLowerCase())) return {forbidden: true};

    // Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return pattern.test(password) ? null :
      {
        pattern: {
          message:
            'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.',
        },
      };

  }

  public static passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password && confirmPassword && password === confirmPassword
      ? null
      : {mismatch: true};
  }

  public static spaceValidator = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    if (!value) return null;
    return value.indexOf(' ') === -1 ? null : {space: true,};
  };

  public static usernameValidator = (control: AbstractControl): ValidationErrors | null => {
    const username = control?.value?.trim();
    if (!username) return null;
    const forbidden = ['admin', 'user', 'username', 'test', 'password'];
    if (forbidden.includes(username.toLowerCase())) return {
      forbidden: {
        message: `Username '${username}' not allowed.`
      }
    };

    // Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return pattern.test(username) ? null :
      {
        pattern: {
          message:
            'Username must be at least 8 characters long and include uppercase, lowercase, number, and special character.',
        },
      };
  }

  /** public static usernameValidatorAsync = (control: AbstractControl): Promise<ValidationErrors | null> => {
   const takenUsername = ['Rupesh@2053', 'Rupesh@1997'];
   const value = control.value as string;
   if (!value) return Promise.resolve(null); //skip empty

   this.authService.userByUsername(value)
   .subscribe({

   })
   return new Promise((resolve) => {
   setTimeout(() => {
   const isTaken = takenUsername.includes(value);
   resolve(isTaken ? {forbidden: {
   message: `Username '${value}' is already taken.`
   }} : null);
   }, 5000);
   });
   } **/

  // Async username validator factory
  static usernameValidatorAsync(authService: AuthService) {
    let timer: any;

    return (control: AbstractControl) => {
      return new Observable<ValidationErrors | null>((observer) => {
        const value = control.value;

        // clear previous timer
        if (timer) clearTimeout(timer);

        // if empty → no error
        if (!value) {
          observer.next(null);
          observer.complete();
          return;
        }

        // debounce manually
        timer = setTimeout(() => {
          authService.userByUsername(value).subscribe({
            next: (res: UserResponse) => {
              observer.next(res ? {forbidden: true} : null);
              observer.complete();
            },
            error: () => {
              observer.next(null);
              observer.complete();
            }
          });
        }, 500);
      });
    };
  }


  static emailValidatorAsync(authService: AuthService) {
    let timer: any;
    return (control: AbstractControl) => {
      return new Observable<ValidationErrors | null>((observer) => {
        const value = control.value;

        // clear previous timer
        if (timer) clearTimeout(timer);

        // if empty → no error
        if (!value) {
          observer.next(null);
          observer.complete();
          return;
        }

        // debounce manually
        timer = setTimeout(() => {
          authService.userByEmail(value).subscribe({
            next: (res: UserResponse) => {
              observer.next(res ? {forbidden: true} : null);
              observer.complete();
            },
            error: () => {
              observer.next(null);
              observer.complete();
            }
          });
        }, 500);
      });
    };
  }

}
