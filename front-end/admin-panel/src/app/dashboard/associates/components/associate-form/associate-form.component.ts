import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Associate } from '../../models/associate';
import { AssociateService } from '../../services/associate.service';

@Component({
  selector: 'app-associate-form',
  templateUrl: './associate-form.component.html',
  styleUrls: ['./associate-form.component.scss']
})
export class AssociateFormComponent implements OnInit {
  associateForm: any;
  associate: any;
  title = 'New Hr';
  isUnchecked = false;
  constructor(
    private fb : FormBuilder,
    private associateService: AssociateService,
    public snackBar : MatSnackBar,
    private router: Router,
    private activatedROute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.setAssociateToForm();
    
  }

  createForm(){
    this.associateForm = this.fb.group({
      empId: ['', [Validators.required, Validators.pattern('^[0-9]{1,7}$')]],
      name:  ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      location:  ['', Validators.required],
      role:  ['', Validators.required],
      email:  ['', [Validators.required, Validators.email]],
      password:  ['', Validators.required],
      status:  ['']
    })
  }

  onSubmit(){
    // debugger;
    console.log(this.associateForm.value);
    // user wants to edit the invoice
    if(this.associate){
      this.authService.SignUp(this.associateForm.patchValue({
        email: this.Controls.email.value,
        password: this.Controls.password.value

      })).subscribe(
        data => {
          debugger;
          console.log(data);
          // this.jwtService.setToken(data.token);
          // this.router.navigate(['/login']);

          this.snackBar.open('User Created Successfully', 'Success',{
            duration: 2000
          })
        }
        // , err  => this.errorHandler(err, 'Failed to Signup'),
        // () => this.isLoadingResults = false
      )


    }

    else if(this.associate){
      this.associateService.getUpdateAssociate(this.associate._id, this.associateForm.value).subscribe( res => {
        this.snackBar.open('Associate Updated Successfully', 'Success',{
          duration: 3000
        });
        this.router.navigate(['dashboard', 'associates']);
      }, (err: any) => this.errorHandler(err, 'Failed to update associate')

      )

    }else {
      this.associateService.createAssociate(this.associateForm.value).subscribe(res => {
        this.snackBar.open( "New Associates Generated", "Success", {
          duration: 3000
        } );
        this.associateForm.reset();
        this.router.navigate(['dashboard', 'associates'])
        console.log(res);
  
      } , (err: any) => this.errorHandler(err, 'Failed to create new associate' )
      
      )

    }
   

  }

  get Controls(){
    return this.associateForm.controls;
  }

  private errorHandler(error:any, message:any){
    console.log(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000
    })
  }

  setAssociateToForm() {
    // get id of associatethis.
    this.activatedROute.params.subscribe(
      params => {
        let id = params['id'];
        // debugger;
        // console.log(id);
        if(!id) {
          return;
        }
        this.title = 'Edit Hr';
        this.associateService.getAssociateById(id).subscribe(res => {
          
          this.associate = res;
          this.associateForm.patchValue(this.associate);
        },  (err:any) => this.errorHandler(err,'Failed to get Associate')
        )
        if(this.associate){
          this.associateService.getUpdateAssociate(id, this.associateForm.value).subscribe( res => {
            this.snackBar.open('Associate Updated Successfully', 'Success',{
              duration: 3000
            });
            this.router.navigate(['dashboard', 'associates']);
          }, (err: any) => this.errorHandler(err, 'Failed to update associate')
    
          )
    
        }

        
        
      }
    )

  }

  backToListing(){
    return this.router.navigate(['dashboard','associates']);
  }


}

 
  


