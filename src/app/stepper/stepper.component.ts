import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

function trimValidator(control: FormControl) {
  if (control.value.startsWith(' ')) {
    console.log(control.value.startsWith);

    return {
      'trimError': { value: 'control has leading whitespace' }
    };
  }
  if (control.value.endsWith(' ')) {
    return {
      'trimError': { value: 'control has trailing whitespace' }
    };
  }

  return null;
}

export enum StepperSteps {
  intro = 1,
  contact,
  id,
  password
}

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})

export class StepperComponent {
  stepId: number = 1;
  formSubmitted = false;
  Vsregister!: FormGroup;
  contactWidth: number = 79
  idWidth: number = 158
  passwordWidth: number = 238

  stepperDetails = [
    {
      id: StepperSteps.intro,
      stepName: 'Intro'
    },
    {
      id: StepperSteps.contact,
      stepName: 'Contact'
    },
    {
      id: StepperSteps.id,
      stepName: 'Id'
    },
    {
      id: StepperSteps.password,
      stepName: 'Password'
    }
  ]
  activeStep: StepperSteps = StepperSteps.intro;
  StepperSteps = StepperSteps

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.Vsregister = this.formBuilder.group({
      Intro: this.formBuilder.group({
        fName: ['', [Validators.required, Validators.minLength(4), trimValidator]],
        mName: ['', Validators.required],
        lName: ['', [Validators.required, Validators.minLength(4)]]
      }),
      Contact: this.formBuilder.group({
        userName: ['', Validators.required],
        Email: ['', [Validators.required, Validators.email]],
        PhnNumber: ['', Validators.required],
      }),
      ID: this.formBuilder.group({
        add1: ['', Validators.required],
      }),
      passwordd:
        this.formBuilder.group({
          passwd: ['', Validators.required],
          cEmail: ['', Validators.required],
        }),

    });

  }

  stepClicked(step: StepperSteps): void {
    this.activeStep = step;
  }

  nextSteps() {
    this.formSubmitted = true
    /**
     * 
     */
    const forms: any = {
      1: (this.Vsregister.get('Intro') as FormGroup),
      2: (this.Vsregister.get('Contact') as FormGroup),
      3: (this.Vsregister.get('ID') as FormGroup),
      4: (this.Vsregister.get('passwordd') as FormGroup)
    }
    if (forms[this.activeStep].invalid) {
      return
    }
    this.formSubmitted = false
    if (this.activeStep !== StepperSteps.password) {
      this.activeStep = this.activeStep + 1
    }
  }

  previousSteps() {
    if (this.activeStep !== StepperSteps.intro) {
      this.activeStep = this.activeStep - 1
    }
  }

  submitStepper() {
    this.formSubmitted = true
    if (this.Vsregister.invalid) {
      return
    }
    alert("Success")
  }
}
