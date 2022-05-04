import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RandomPasswordGeneratorService } from '../random-password-generator.service';

@Component({
  selector: 'app-random-password-generator',
  templateUrl: './random-password-generator.component.html',
  styleUrls: ['./random-password-generator.component.scss']
})
export class RandomPasswordGeneratorComponent implements OnInit {


  // Main settings form which will have sizeForm and configurationForm in it
  settingsForm!: FormArray;

  // sizeForm will control the slider for selecting the length of the password
  sizeForm!: FormControl;

  // configurationForm will control the types of characters needed for the password
  configurationForm!: FormGroup;


  // Contains states of the action icons which moves through [copy, spinner, done, copy] states whenever it's clicked on
  actionIconState = {
    copy: true,
    spinner: false,
    done: false,
  }


  // A set to hold the current configuration for the types of characters needed
  neededCharTypes: Set<string> = new Set<string>();

  
  // The generated password
  generatedPassword: string = 'dasfaofuh023rfrh3inlasknc21';


  // Strength of generated password
  passwordStrength!: 'Strong' | 'Medium' | 'Weak' |  'Worst';


  constructor(
    private randomPassGenServ: RandomPasswordGeneratorService,
    private snackB: MatSnackBar
  ) { }


  ngOnInit(): void {

    this.initAllForms();

    this.setListenerForForm();

    this.updateConfiguration(this.settingsForm);

  }

  
  // Initializes all the required forms
  initAllForms(): void {

    // sizeForm only has control of the slider
    this.sizeForm = new FormControl(20);

    // configurationForm has control over a group of items which can be toggled off an on
    this.configurationForm = new FormGroup({
        lowerCase: new FormControl(false),
        upperCase: new FormControl(true),
        number: new FormControl(false),
        specialCharacter: new FormControl(true),
    });

    // The above two will be wrapped inside a formArray which will subscribe to changes in any of 
    // these two forms and update the password as and when needed
    this.settingsForm = new FormArray([
      this.sizeForm,
      this.configurationForm
    ]);

  }


  // Subscribes to the settingsForm (formArray) and updates the password if there is any change in the needed
  // configuration for the password
  setListenerForForm(): void {

    const _this = this;

    this.settingsForm.valueChanges.subscribe({

      next() {
        console.log(
          'VALUE CHANGED =>', _this.settingsForm
          );
          _this.updateConfiguration(_this.settingsForm);
      }
        
    })

  }


  // Updates the configuration for the needed password and calls the service with the requirements to get a new password based on the same
  updateConfiguration(newConfig: FormArray): void {
    
    console.log(newConfig.controls);

    Object.keys((newConfig.controls[1] as FormGroup).controls).forEach((control) => {
     
      this.configurationForm.controls[control].value ? this.neededCharTypes.add(control) : this.neededCharTypes.delete(control);

    });

    this.refresh();

  }


  // Refresh and return a new password
  refresh() {

    this.generatedPassword = this.randomPassGenServ.getNewRandomPass(this.sizeForm.value, this.neededCharTypes);
  
    this.passwordStrength = this.randomPassGenServ.determineStrength(this.generatedPassword, this.neededCharTypes);

  }


  // Changes state for actionIconState which results in a little animation 
  animateIcon(): void {
    
    this.actionIconState.copy = false;
    this.actionIconState.spinner = true;

    setTimeout(() => {
      this.actionIconState.spinner = false;
      this.actionIconState.done = true;
      this.snackB.open('Copied!', 'Okay' , {
          panelClass: ['blueSnackB'], 
          duration: 2000
      });
    }, 1000);

    setTimeout(() => {
      this.actionIconState.done = false;
      this.actionIconState.copy = true;
    }, 3000);

  }


  // Open developers linked-in page
  openLinkedIn(): void {
      window.open('https://in.linkedin.com/in/aadway-sinha-b1808214b', "_blank");
  }

}
