import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@app/shared/service/api.service';
import { HttpService } from '@app/shared/service/http.service';
import { StateService } from '@app/shared/service/state.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user-management',
  templateUrl: './edit-user-management.component.html',
  styleUrls: ['./edit-user-management.component.scss']
})
export class EditUserManagementComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private httpService: HttpService,
    private apiService: ApiService,
    private stateService: StateService,
    private datePipe:DatePipe,
    private activatedRoute:ActivatedRoute,
    private toastr: ToastrService) {
    this.buildForm();
   }

  editUserForm!:FormGroup;
  userGroupData!:any;
  userId!:any;
  currentUser!:any;
  selectedRole!:any;
  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    
    this.commonApiCall(
      `${this.apiService.apiList.userManagement.list}`,
      "getMethod",
       {},
      "userList",
      {},
      false
    );
  }

  selectRole(data:any){
    this.selectedRole = data
    console.log(this.selectedRole);
  }

  userList(data:any){
    this.userGroupData = data.result;
    this.commonApiCall(
      `${this.apiService.apiList.userManagement.get}${this.userId}`,
      "getMethod",
      {},
      "userInfo",
      {},
      false
    );
  }

  userInfo(data:any){
    this.currentUser = data;
    this.editUserForm.setValue({
      userName: this.currentUser.username,
      userEmailId: this.currentUser.userEmailId,
      userGroup: this.currentUser.roleType,
      isActive: this.currentUser.status === "1" ? "Y" : "N",
      lastLoginDate:this.currentUser.lastLoginDate
    })
  }


  get f() {
    return this.editUserForm.controls;
  }

  submitUserData(){
    let {userName,userEmailId,userGroup} = this.editUserForm.value
    let payload = {
      username:userName,
      userEmailId:userEmailId,
      roleType:userGroup,
      userid: this.currentUser.userid,
      roleId: this.currentUser.roleId,
      roleTypeId : this.selectedRole.roleTypeId,
      status: this.currentUser.status
   }
    console.log(this.editUserForm.value);
    console.log(payload)
    this.commonApiCall(
      `${this.apiService.apiList.userManagement.update}`,
      "putMethod",
       payload,
      "dataSubmitted",
      {},
      false
    );
  }

  dataSubmitted(data:any){
    this.toastr.success("Updated User Details","Success");
    this.router.navigate(["content/home/user-management"]);
  }
  discardButton(){
    this.router.navigate(["content/home/user-management"]);
  }
  buildForm(){
    this.editUserForm = this.formBuilder.group({
      userName: ["", Validators.required],
      userEmailId: ["", Validators.required],
      userGroup: ["", Validators.required],
      isActive: ["N", Validators.required],
      lastLoginDate:["", Validators.required]
    });
  }

  navigateBack(){
    this.router.navigate(["content/home/user-management"]);
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


}
