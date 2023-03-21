import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '@app/shared/service/api.service';
import { HttpService } from '@app/shared/service/http.service';
import { StateService } from '@app/shared/service/state.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-user-management',
  templateUrl: './create-user-management.component.html',
  styleUrls: ['./create-user-management.component.scss']
})
export class CreateUserManagementComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private httpService: HttpService,
    private apiService: ApiService,
    private stateService: StateService,
    private datePipe:DatePipe,
    private toastr: ToastrService) {
    this.buildForm();
   }

  createUserForm!:FormGroup
  userGroupData!:any;

  ngOnInit(): void {
    this.commonApiCall(
      `${this.apiService.apiList.userManagement.list}`,
      "getMethod",
       {},
      "userList",
      {},
      false
    );
  }

  userList(data:any){
    this.userGroupData = data.result;
  }

  selectRole($event:any){
    console.log($event);
  }
  
  submitUserData(){
    let {userName,userEmailId,userGroup} = this.createUserForm.value
    let payload = {
      "username":userName,
      "userEmailId":userEmailId,
      "roleType":userGroup,
      "roleTypeId":this.roleTypeIdValue
   }
    console.log(this.createUserForm.value);
    this.commonApiCall(
      `${this.apiService.apiList.userManagement.save}`,
      "postMethod",
       payload,
      "dataSubmitted",
      {},
      false
    );
  }

  get f() {
    return this.createUserForm.controls;
  }
  dataSubmitted(data:any){
    this.toastr.success("User Created","Success");
    this.router.navigate(["content/home/user-management"]);
  }

  buildForm(){
    this.createUserForm = this.formBuilder.group({
      userName: ["", Validators.required],
      userEmailId: ["", Validators.required],
      userGroup: ["", Validators.required],
    });
  }

  commonApiCall(
    apiUrl: string,
    method: string,
    payload?: any,
    callback?: string,
    extraParams?: any,
    isFullUrl: any = false
  ) {
    this.stateService.addCalledApi(apiUrl);
    // @ts-ignore
    this.httpService[method](apiUrl, isFullUrl, payload).subscribe(
      (result: any) => {
        // @ts-ignore
        this[callback](result, extraParams);
      },
      (err: any) => {
        if (err.error?.error && typeof err.error.error === "string") {
           this.toastr.error("err.error.error","Error");
          // this.stateService.showMessage({
          //   type: "message",
          //   message: [err.error.error],
          // });
        }
        this.stateService.removeCalledApi(apiUrl);
      },
      () => {
        this.stateService.removeCalledApi(apiUrl);
      }
    );
  }

  backToPage() {
    this.router.navigate(['/content/home/user-management/']);
  }

  closeDialog(){
    this.currentRole =null;
  }

  public checkRole:any;
  public currentRole:any;
  roleTypeIdValue!:any;
  applyFilter1(event: Event) {
    console.log(event);
    this.checkRole = event;
    
    this.currentRole = this.checkRole.roleType;
    this.roleTypeIdValue = this.checkRole.roleTypeId;
    console.log(this.currentRole,this.roleTypeIdValue);
    // if(this.checkRole.roleType =="Product Owner"){
    //   console.log("Success");
    // }
  }

  navigateBack(){
    this.router.navigate(["content/home/user-management"]);
  }

}
