import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  item: any = {
    name : 'Tanuja',
    lastname:'Tiwari',
    email:'tanuja.virtualgain11@gmail.com',
    address:'ramnagar',
    number:'8909897890'
  }

  oldItemData = {
    name : 'Tanuja',
    lastname:'Tiwari',
    email:'tanuja.virtualgain11@gmail.com',
    address:'ramnagar',
    number:'8909897890'
  } 

 

  editModeToggle =false;
  
  edit(item: any) {
    this.editModeToggle = true;
    //this.oldItemData = this.item;
    this.oldItemData = JSON.parse(JSON.stringify(this.item)); //OK
    console.log('------ edit activate -------')
    console.log('old item:', this.oldItemData.name);
    console.log('item:', this.item.name);
  }

  saveChanges(item: any) {
    // some stuff happens
    this.editModeToggle = false;
    console.log('------ save -------')
    console.log('old item:', this.oldItemData.name);
    console.log('item:', this.item.name);
  }

  cancelEdit() {
    this.editModeToggle = false;
    this.item = this.oldItemData;
    console.log('------ cancel -------')
    console.log('old item:', this.oldItemData.name);
    console.log('item:', this.item.name);
  }


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
      this.registerForm = this.formBuilder.group({
        
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
         address:['', [Validators.required, Validators.minLength(5)]],
            acceptTerms: [false, Validators.requiredTrue]
        }, );
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      // display form values on success
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  
}

