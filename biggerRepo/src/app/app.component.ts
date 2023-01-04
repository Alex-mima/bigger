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
  }

  onSubmit() {
    console.log(this.formSignup);
  }

  onNewHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.formSignup.get('hobby')).push(control);
  }

  getControls() {
    return (<FormArray>this.formSignup.get('hobby')).controls;
  }
}
