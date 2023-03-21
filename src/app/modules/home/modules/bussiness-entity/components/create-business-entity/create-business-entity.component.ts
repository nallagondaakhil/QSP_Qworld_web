import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '@app/shared/service/api.service';
import { HttpService } from '@app/shared/service/http.service';
import { StateService } from '@app/shared/service/state.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-business-entity',
  templateUrl: './create-business-entity.component.html',
  styleUrls: ['./create-business-entity.component.scss']
})
export class CreateBusinessEntityComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private httpService: HttpService,
    private apiService: ApiService,
    private stateService: StateService,
    private datePipe:DatePipe,
    private toastr: ToastrService) {
    this.buildForm();
   }

  createBusinessEntityForm!:FormGroup;
  userList = [];
  selectUser!:any;

  ngOnInit(): void {
    this.commonApiCall(
      `${this.apiService.apiList.businessEntity.list}`,
      "getMethod",
      {},
      "listUser",
      {},
      false
    );
  }

  listUser(data:any){
    if(data.status = true && data.message == "Business List"){
      this.userList = data.result;
      this.userList.forEach(function(item: any){
       let userList = item.userName;
       console.log(userList)
      })
    }
    // this.f.businessEntityAdmin.setValue(this.userList[0]['userid']);
  }

  selectUserAdmin(event:any){
    this.selectUser = {...event};
    this.f.businessEntityAdminEmail.setValue(event.userEmailId);
  }

  submitBusinessEntityData(){
    let {businessEntityName} = this.createBusinessEntityForm.value
    let payload = {
      businessName:businessEntityName,
      userId:this.selectUser.userId ,
      userName: this.selectUser.userName
    }
    console.log(this.createBusinessEntityForm.value);
    this.commonApiCall(
      `${this.apiService.apiList.businessEntity.save}`,
      "postMethod",
       payload,
      "dataSubmitted",
      {},
      false
    );
  }

  get f() {
    return this.createBusinessEntityForm.controls;
  }
  dataSubmitted(data:any){
    // this.createBusinessEntityForm.reset();
    this.toastr.success(data.message,"Success");
    this.router.navigate(["content/home/business-entity"]);
  }
  discardButton(){
    this.router.navigate(["content/home/business-entity"]);
  }
  buildForm(){
    this.createBusinessEntityForm = this.formBuilder.group({
      businessEntityName: ["", Validators.required],
      businessEntityAdmin: ["", Validators.required],
      businessEntityAdminEmail: ["", Validators.required],
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

  navigateBack(){
    this.router.navigate(["content/home/business-entity"]);
  }
}
