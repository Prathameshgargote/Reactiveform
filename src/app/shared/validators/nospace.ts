import { AbstractControl, ValidationErrors } from '@angular/forms';

export class nospacevalidator {
  static nospace(control: AbstractControl): ValidationErrors | null {
    let val = control.value;

    if (!val) {
      return null;
    }
    if (val.includes(' ')) {
      return {
        nospaceErr: 'userName not allow space in filed!',
      };
    } else {
      return null;
    }
  }
}
