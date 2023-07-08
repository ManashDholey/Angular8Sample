import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,Validators, AbstractControl, FormArray, FormControl} from '@angular/forms';
import {CustomValidators} from '../shared/custom.validators';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from './employee.service';
import { IEmployee } from './IEmployee';
import { ISkill } from './ISkill';
import { Router } from '@angular/router';
 import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
employeeForm: FormGroup;
employee: IEmployee;
pageTitle: string;
// fullNameLength=0;
validationMessages={
  'fullName':
  {
    'required':'Full name is required.',
    'minlength': 'Full name must be greater than 2 characters.',
    'maxlength': 'Full name must be less than 10 characters.'

  },
  'email':{
    'required':'Email is required.',
    'emailDomain':'Email domain should be pragimtech.com.'
  },
  'confirmEmail':{
    'required':'Confirm Email is required.'
  },
  'emailGroup':{'emailMismatch':'Email and Confirm Email do not match.'},
  'phone':{
    'required':'Phone is required.'
  },
  'skillName':{
    'required':'Skill Name is required.'
  },
  'experienceInYears':{'required':'Experience is required.'},
  'proficiency':{
    'required':'Proficiency is required.'
  }
};
formErrors={
  'fullName':'',
  'email':'',
  'confirmEmail': '',
  'emailGroup':'',
  'phone': '',
  'skillName':'',
  'experienceInYears':'',
  'proficiency':''
};
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router,private toastr: ToastrService) { }

  ngOnInit() {

    this.employeeForm = this.fb.group({
      fullName:['',[Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      contactPreference:['email'],
      emailGroup: this.fb.group({
        email:['',[Validators.required, CustomValidators.emailDomain('email.com')]],
        confirmEmail:['',Validators.required]
      },{validator: matchEmails}),
      phone:[''],
      skills: this.fb.array([
        this.addSkillFormGroup() 
      ])
    });
    this.employeeForm.get('contactPreference')
                 .valueChanges.subscribe((data: string) => {
  this.onContactPrefernceChange(data);
});
    this.employeeForm.get('fullName').valueChanges.subscribe((data) => {
     this.logValidationErrors(this.employeeForm);
      // console.log(value);
      // this.fullNameLength=value.length;
    });
    // this.employeeForm = new FormGroup({
    //   fullName: new FormControl(),
    //   email: new FormControl(),
    //   skills: new FormGroup({
    //     skillName: new FormControl(),
    //     experienceInYears:new FormControl(),
    //     proficiency:new FormControl()
    //   }) 
    // });
    this.route.paramMap.subscribe(params => {
      const empId = +params.get('id');
      if (empId) {
        this.pageTitle = 'Edit Employee';
        this.getEmployee(empId);
      } else {
        this.pageTitle = 'Create Employee';
        this.employee = {
          id: null,
          fullName: '',
          contactPreference: '',
          email: '',
          phone: null,
          skills: []
        };
      }
    });

  }

  // getEmployee(id: number) {
  //   this.employeeService.getEmployee(id)
  //     .subscribe(
  //       (employee: IEmployee) => this.editEmployee(employee),
  //       (err: any) => console.log(err)
  //     );
  // }
  getEmployee(id: number) {
    this.employeeService.getEmployee(id)
      .subscribe(
        (employee: IEmployee) => {
          // Store the employee object returned by the
          // REST API in the employee property
          this.employee = employee;
          this.editEmployee(employee);
        },
        (err: any) => console.log(err)
      );
  }

  editEmployee(employee: IEmployee) {
    this.employeeForm.patchValue({
      fullName: employee.fullName,
      contactPreference: employee.contactPreference,
      emailGroup: {
        email: employee.email,
        confirmEmail: employee.email
      },
      phone: employee.phone
    });
    this.employeeForm.setControl('skills', this.setExistingSkills(employee.skills));
  }

  setExistingSkills(skillSets: ISkill[]): FormArray {
    const formArray = new FormArray([]);
    skillSets.forEach(s => {
      formArray.push(this.fb.group({
        skillName: s.skillName,
        experienceInYears: s.experienceInYears,
        proficiency: s.proficiency
      }));
    });
  
    return formArray;
  }


  addSkillButtonClick(): void{
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup());
  }

  addSkillFormGroup(): FormGroup
  {
    return this.fb.group({
      skillName:['',Validators.required],
      experienceInYears:['',Validators.required],
      proficiency:['',Validators.required]
    });
  }

  removeSkillButtonClick(skillGroupIndex): void{
      const skillsFormArray= (<FormArray>this.employeeForm.get('skills'));
      skillsFormArray.removeAt(skillGroupIndex);
      skillsFormArray.markAsDirty();
      skillsFormArray.markAsTouched();
  }

  onContactPrefernceChange(selectedValue: string) {
    // this.formErrors[selectedValue]='';
    const phoneFormControl = this.employeeForm.get('phone');
    if (selectedValue === 'phone') {
      phoneFormControl.setValidators(Validators.required);
    } else {
      phoneFormControl.clearValidators();
    }
    phoneFormControl.updateValueAndValidity();
  }
  // logValidationErrors(group: FormGroup =this.employeeForm):void{
  //   Object.keys(group.controls).forEach((key:string)=>{
  //     const abstractControl=group.get(key);
  //     this.formErrors[key] = '';
  //       if(abstractControl && !abstractControl.valid &&
  //           (abstractControl.touched || abstractControl.dirty || abstractControl.value !== ''))
  //       {
  //         const message=this.validationMessages[key];
  //         for ( const errorKey in abstractControl.errors){
  //           if(errorKey)
  //           {
  //             this.formErrors[key] += message[errorKey] + ' ';
  //           }
  //         }
  //       }
  //     if(abstractControl instanceof FormGroup)
  //     {
  //       this.logValidationErrors(abstractControl);
  //     }
  //     if(abstractControl instanceof FormArray)
  //     {
  //       for(const control of abstractControl.controls){
  //         if(control instanceof FormGroup){
  //               this.logValidationErrors(control);
            
  //         }
  //       }
  //     }

  //   })
  // }
  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
  
      this.formErrors[key] = '';
      // abstractControl.value !== '' (This condition ensures if there is a value in the
      // form control and it is not valid, then display the validation error)
      if (abstractControl && !abstractControl.valid &&
          (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '')) {
        const messages = this.validationMessages[key];
  
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }
  
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
    });
  }
  
  onLoadDataClick():void{
    const formArray= new FormArray([
     new FormControl('John',Validators.required),
     new FormGroup({
       country: new FormControl('',Validators.required)
     }),
     new FormArray([])
    ]);
    console.log(formArray.length);
   // this.logValidationErrors(this.employeeForm);
   // console.log(this.formErrors);
    // this.employeeForm.setValue({
    //   fullName:'Manash Dholey',
    //   email:'chottu.dholey52@gmail.com',
    //    skills:{
    //      skillName:'C#',
    //      experienceInYears: 5,
    //      proficiency:'beginner'
    //    }
    // })
  }

  // onSubmit(): void {
  //   this.mapFormValuesToEmployeeModel();
  
  //   if (this.employee.id) {
  //     this.employeeService.updateEmployee(this.employee).subscribe(
  //       () => this.router.navigate(['list']),
  //       (err: any) => console.log(err)
  //     );
  //   } else {
  //     this.employeeService.addEmployee(this.employee).subscribe(
  //       () => this.router.navigate(['list']),
  //       (err: any) => console.log(err)
  //     );
  //   }
  // }
  onSubmit(): void {
    this.mapFormValuesToEmployeeModel();
    if (this.employee.id) {
      this.employeeService.updateEmployee(this.employee).subscribe(
        () => this.router.navigate(['employees']),
        (err: any) => console.log(err)
      );
    } else {
      this.employeeService.addEmployee(this.employee).subscribe(
        () => this.router.navigate(['employees']),
        (err: any) => console.log(err)
      );
    }
  }
  mapFormValuesToEmployeeModel() {
    this.employee.fullName = this.employeeForm.value.fullName;
    this.employee.contactPreference = this.employeeForm.value.contactPreference;
    this.employee.email = this.employeeForm.value.emailGroup.email;
    this.employee.phone = this.employeeForm.value.phone;
    this.employee.skills = this.employeeForm.value.skills;
  }
}
function matchEmails(group: AbstractControl): { [key: string]: any } | null {
  const emailControl = group.get('email');
  const confirmEmailControl = group.get('confirmEmail');

  if (emailControl.value === confirmEmailControl.value || (confirmEmailControl.pristine && confirmEmailControl.value === '')) {
    return null;
  } else {
    return { 'emailMismatch': true };
  }
}