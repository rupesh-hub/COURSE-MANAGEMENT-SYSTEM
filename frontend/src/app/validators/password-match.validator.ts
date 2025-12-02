import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {Directive, Input} from '@angular/core';

@Directive({
  selector: '[cmsPasswordMatchValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordMatchValidator,
      multi: true
    }
  ],
  standalone: true
})
export class PasswordMatchValidator implements Validator {

  @Input("cmsPasswordMatchValidator") passwordFieldName: string;

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control?.parent) return null;
    const password = control.parent.get(this.passwordFieldName);
    if (!password) return null;
    return password.value === control.value ? null : {mismatch: true};
  }

}
