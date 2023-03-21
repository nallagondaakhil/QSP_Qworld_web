import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '@app/shared/service/api.service';
import { HttpService } from '@app/shared/service/http.service';
import { StateService } from '@app/shared/service/state.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-product-management',
  templateUrl: './create-product-management.component.html',
  styleUrls: ['./create-product-management.component.scss']
})
export class CreateProductManagementComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private httpService: HttpService,
    private apiService: ApiService,
    private stateService: StateService,
    private datePipe:DatePipe,
    private toastr: ToastrService) {
    this.buildForm();
   }

  createProductForm!:FormGroup;
  userList = [];
  selectUser!:any;
  selectedEntity!:any;
  businessList = [];
  ngOnInit(): void {
    this.commonApiCall(
      `${this.apiService.apiList.userManagement.list}`,
      "getMethod",
      {},
      "listUser",
      {},
      false
    );
    this.commonApiCall(
      `${this.apiService.apiList.productManagement.list}`,
      "getMethod",
      {},
      "productList",
      {},
      false
    );
  }
  productList(data:any){
    if(data.status = true && data.message == "ProductView List"){
      this.businessList = data.result;
      this.businessList.forEach(function(item: any){
       let businessList = item.businessName;
      //  console.log(businessList)
      })
    }
  }
  listUser(data:any){
    this.userList = data.result;
    // this.f.businessEntityAdmin.setValue(this.userList[0]['userid']);
  }

  selectBusinessEntity(event:any){
    this.selectedEntity = event;
    console.log(this.selectedEntity)
  }

  // selectUserAdmin(event:any){
  //   this.selectUser = {...event};
  //   this.f.businessEntityAdminEmail.setValue(event.userEmailId);
  // }

  submitProductData(){
    let {productName} = this.createProductForm.value
    let payload = {
      productName: productName,
      businessEntityId: this.selectedEntity.businessEntityId,
      businessName: this.selectedEntity.businessName,
      userId:localStorage.getItem('userId') ,
      userName: localStorage.getItem('userName') ,
    }
    console.log(this.createProductForm.value);
    this.commonApiCall(
      `${this.apiService.apiList.productManagement.save}`,
      "postMethod",
       payload,
      "dataSubmitted",
      {},
      false
    );
  }

  get f() {
    return this.createProductForm.controls;
  }
  dataSubmitted(data:any){
    this.toastr.success("Product Created Successfully","Success");
    // this.createProductForm.reset();
    this.router.navigate(["content/home/product-management"]);
  }
  discrdButton(){
    this.router.navigate(["content/home/product-management"]);
  }
  buildForm(){
    this.createProductForm = this.formBuilder.group({
      productName: ["", Validators.required],
      businessEntity: ["", Validators.required],
      isActive: ["N", Validators.required],
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
    this.router.navigate(["content/home/product-management"]);
  }

}
