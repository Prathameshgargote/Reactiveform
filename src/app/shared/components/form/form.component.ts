import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CustomRegex } from '../../validators/patternvalidtor';
import { nospacevalidator } from '../../validators/nospace';
import { Icountry } from '../../model/country';
import { COUNTRIES_META_DATA } from '../../country/country';
import { Asyncemailvalitor } from '../../validators/emailvalidtor';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  SignUpFrom!: FormGroup;
  GenderArr: Array<string> = ['Male', 'Female', 'Other'];
  countryArr: Array<Icountry> = COUNTRIES_META_DATA;
  skillcontrol = new FormControl();

  constructor() {}

  ngOnInit(): void {
    this.Createform();
    // console.log(this.f['username']);
    this.isaddhhandler();
    this.pathaAdress();
    this.onAdddependant();
    this.confirmpasshandelr();
    this.matchpassword();
  }

  Createform() {
    this.SignUpFrom = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
        Validators.pattern(CustomRegex.username),
        nospacevalidator.nospace,
      ]),
      email: new FormControl(
        null,
        [Validators.required, Validators.pattern(CustomRegex.email)],
        [Asyncemailvalitor.isemailvalitor]
      ),
      empid: new FormControl(null, [
        Validators.required,
        Validators.pattern(CustomRegex.employeeid),
      ]),
      gender: new FormControl(null),
      IsAddsame: new FormControl({ value: null, disabled: true }),
      currentAdress: new FormGroup({
        country: new FormControl(null, Validators.required),
        state: new FormControl(null, Validators.required),
        city: new FormControl(null, Validators.required),
        zipcode: new FormControl(null, [Validators.required,Validators.pattern(CustomRegex.pincode)]),
      }),
      peramanttAdress: new FormGroup({
        country: new FormControl(null, Validators.required),
        state: new FormControl(null, Validators.required),
        city: new FormControl(null, Validators.required),
        zipcode: new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.pincode)]),
      }),
      skills: new FormArray([],Validators.required),
      dependant: new FormArray([]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/
        ),
      ]),
      confirmpassword: new FormControl({ value: null, disabled: true }, [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/
        ),
      ]),
    });
  }

  OnSubmit() {
    console.log(this.SignUpFrom);
    console.log(this.SignUpFrom.value);
  }

  isaddhhandler() {
    this.f['currentAdress'].valueChanges.subscribe((res) => {
      if (this.f['currentAdress'].valid) {
        this.f['IsAddsame'].enable();
      } else {
        this.f['IsAddsame'].reset();
        this.f['IsAddsame'].disable();

      }
    });
  }

  confirmpasshandelr() {
    this.f['password'].valueChanges.subscribe((res) => {
      if (this.f['password'].valid) {
        this.f['confirmpassword'].enable();
      } else {
        this.f['confirmpassword'].disable();
      }
    });
  }

  // matchPassword(FormGroup: AbstractControl): ValidationErrors | null {
  // const password = FormGroup.get('password')?.value;
  // console.log(password);
  // const confirmpassword = FormGroup.get('confirmpassword')?.value;
  // console.log(confirmpassword);

  // return password === confirmpassword ? null : { matchError: true };
  // this.f['confirmpas
  //
  //
  // sword'].valueChanges.subscribe(() => {
  //   const password = this.f['password'].value;
  //   const confirmPassword = this.f['confirmpassword'].value;

  //   if (password === confirmPassword) {
  //     this.f['confirmpassword'].setErrors(null); // Clear errors
  //   } else {
  //     this.f['confirmpassword'].setErrors({ matchError: true });
  //   }
  // });
  // }

  matchpassword() {
    this.f['confirmpassword'].valueChanges.subscribe((res) => {
      if (res === this.f['password'].value) {
        this.f['confirmpassword'].setErrors(null);
      } else {
        this.f['confirmpassword'].setErrors({
          matchErr: ' Counfirm Pass And Confirm password must match!',
        });
      }
    });
  }

  pathaAdress() {
    this.f['IsAddsame'].valueChanges.subscribe((res) => {
      let cuuretval = this.f['currentAdress'].value;
      if (res === true) {
        this.f['peramanttAdress'].patchValue(cuuretval);
        this.f['peramanttAdress'].disable();
      } else {
        this.f['peramanttAdress'].reset();
        this.f['peramanttAdress'].enable();
      }
    });
  }

  addskills() {
    let val = this.skillcontrol.value.trim();
    console.log(val);
    if (val) {
      this.skillcontrol.reset();
      let newcontrol = new FormControl(val);
      this.skillsArr.push(newcontrol);
    }
  }

  onskillremovr(i: number) {
    this.skillsArr.removeAt(i);
  }
  onremovedependent(i: number) {
    this.dependantArr.removeAt(i);
  }

  onAdddependant() {
    let dependantcontrol = new FormGroup({
      fullname: new FormControl(null, Validators.required),
      realationship: new FormControl(null, Validators.required),
      citizenship: new FormControl(null, Validators.required),
      istravalwithyou: new FormControl(null, Validators.required),
    });

    this.dependantArr.push(dependantcontrol);
  }

  get f() {
    return this.SignUpFrom.controls;
  }

  get skillsArr() {
    return this.f['skills'] as FormArray;
  }

  get dependantArr() {
    return this.f['dependant'] as FormArray;
  }
}
