import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

export class Asyncemailvalitor {
  static isemailvalitor(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    let val = control.value;

    const promise = new Promise<ValidationErrors | null>((resolve, reject) => {
      setTimeout(() => {
        if (val === 'jhon@gmail.com') {
          resolve({
            emailexist: 'this email has alredy use ',
          });
        } else {
          resolve(null);
        }
      }, 2000);
    });
    return promise;
  }
}
