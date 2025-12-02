import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {Directive} from '@angular/core';

@Directive({
  selector: '[cmsUsernameValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: UsernameValidator,
      multi: true
    }
  ],
  standalone: true
})
export class UsernameValidator implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    /**
     * Explanation:
     * ^(?=.{8,})            → at least 8 characters long
     * (?=.*[A-Z])           → at least one uppercase letter
     * (?=.*\d)              → at least one number
     * (?=.*[!@#$%^&*])      → at least one special character
     * [A-Z][A-Za-z\d!@#$%^&*]+$ → must start with a capital letter
     */

    const usernamePattern = /^(?=.{8,})(?=.*\d)(?=.*[!@#$%^&*])[A-Z][A-Za-z\d!@#$%^&*]+$/;
    const isValid = usernamePattern.test(value);

    return isValid
      ? null
      : {
        invalid: {
          message:
            'Username must start with a capital letter, one number, one special character, and be at least 8 characters long.',
        },
      };
  }

}
