import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'biggerRepo';
  genders = ['male', 'female'];
  formSignup: FormGroup;

  ngOnInit() {
    this.formSignup = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
      }),
      gender: new FormControl(null, Validators.required),
      hobby: new FormArray([]),
    });

    // this.formSignup.valueChanges.subscribe((value) => console.log(value));
    this.formSignup.statusChanges.subscribe((value) => console.log(value));

    this.formSignup.setValue({
      userData: {
        username: 'Alex',
        email: '15aleksi.mima@gmail.com',
      },
      gender: 'male',
      hobby: [],
    });
  }

  onSubmit() {
    console.log(this.formSignup);
    this.formSignup.reset();
  }

  onNewHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.formSignup.get('hobby')).push(control);
  }

  getControls() {
    return (<FormArray>this.formSignup.get('hobby')).controls;
  }
}
