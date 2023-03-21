import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@app/shared/service/api.service';
import { HttpService } from '@app/shared/service/http.service';
import { StateService } from '@app/shared/service/state.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product-management',
  templateUrl: './edit-product-management.component.html',
  styleUrls: ['./edit-product-management.component.scss']
})
export class EditProductManagementComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private httpService: HttpService,
    private apiService: ApiService,
    private stateService: StateService,
    private datePipe:DatePipe,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService) {
    this.buildForm();
   }

  editProductForm!:FormGroup

  userList = [];
  selectUser!:any;
  selectedEntity!:any;
  businessList = [];
  // productList = [];
  editProduct!:any;
  productId!:any;
  businessEntityId!:any;
  businessEntity!:any;
  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.commonApiCall(
      `${this.apiService.apiList.userManagement.list}`,
      "getMethod",
      {},
      "listUser",
      {},
      false
    );
    this.commonApiCall(
      `${this.apiService.apiList.productManagement.getProduct}/${this.productId}`,
      "getMethod",
      {},
      "getProduct",
      {},
      false
    );
  }

  productList!:any;
  getProduct(data:any){
    this.productList = data;
    const{ productName,businessName,productStatus } =  this.productList;
    this.editProductForm.setValue({
      productName:productName,
      businessEntity: businessName,
      isActive: productStatus === 1 ? "Y" : "N"
    });
    console.log(this.editProductForm.value)
  }

  listUser(data:any){
    this.userList = data.result;
  }

  selectBusinessEntity(event:any){
    this.selectedEntity = event;
  }

  // selectUserAdmin(event:any){
  //   this.selectUser = {...event};
  //   this.f.businessEntityAdminEmail.setValue(event.userEmailId);
  // }

  submitProductData(){
    let {productName,isActive} = this.editProductForm.value
    let payload = {
      "productId": this.productList.productId,
      "productMapId": this.productList.productMapId,
      "productName": productName,
      "productStatus": isActive,
      "businessEntityId": this.productList.businessEntityId,
      "businessName": this.productList.businessName,
      "userId": localStorage.getItem('userId'),
      "userName": localStorage.getItem('userName')
    }
    console.log(this.editProductForm.value);
    this.commonApiCall(
      `${this.apiService.apiList.productManagement.update}`,
      "postMethod",
       payload,
      "dataSubmitted",
      {},
      false
    );
  }

  get f() {
    return this.editProductForm.controls;
  }
  dataSubmitted(data:any){
    this.toastr.success("Product Updated Successfully","Success");
    this.router.navigate(["content/home/product-management"]);
  }
  discardButton(){
    this.router.navigate(["content/home/product-management"]);
  }
  buildForm(){
    this.editProductForm = this.formBuilder.group({
      productName: ["", Validators.required],
      businessEntity: ["", Validators.required],
      // businessEntity: ["", Validators.required],
      // businessEntityAdmin: ["", Validators.required],
      // businessEntityAdminEmail: [{value: '', disabled: true}],
      isActive: ["N", Validators.required],
    });
  }

  navigateBack(){
    this.router.navigate(["content/home/product-management"]);
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
