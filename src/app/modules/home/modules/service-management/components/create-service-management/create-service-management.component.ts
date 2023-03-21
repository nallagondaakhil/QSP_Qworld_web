import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from '@app/shared/service/api.service';
import { HttpService } from "@app/shared/service/http.service";
import { StateService } from '@app/shared/service/state.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from "@angular/common";

class Page {
  // The number of elements in the page
  size: number = 0;
  // The total number of elements
  totalElements: number = 0;
  // The total number of pages
  totalPages: number = 0;
  // The current page number
  pageNumber: number = 0;
}

@Component({
  selector: "app-create-service-management",
  templateUrl: "./create-service-management.component.html",
  styleUrls: ["./create-service-management.component.scss"],
})
export class CreateServiceManagementComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
    private router: Router, 
    private apiService: ApiService,
    private stateService: StateService,
    private toastr: ToastrService,
    private datePipe:DatePipe,
    private httpService: HttpService,) {
    this.buildForm();
  }
  createGeneralServiceForm!: FormGroup;
  createTechnicalServiceForm!: FormGroup;

  breadcrumbList: any = [
    { label: "Service Management" },
    { label: "Create Service Details" },
  ];

  titleWithBack = { title: "Create Service Details" };

  page = new Page();

  ngOnInit(): void {
    this.page.pageNumber = 0;
    this.page.size = 10;
    this.commonApiCall(
      `${this.apiService.apiList.serviceManagement.servicegroup}?page=${this.page.pageNumber}&limit=${this.page.size}`,
      "getMethod",
      {},
      "listService",
      {},
      false
    );
    this.commonApiCall(
      `${this.apiService.apiList.businessEntity.list}`,
      "getMethod",
      {},
      "businessList",
      {},
      false
    );
  }

  active = 1;
  dataSource!:any;
  selectedValue!:any;
  // selectedBusinessId:any;
  selectedBusinessIdValue!:any;
  serviceTypes=[];
  public fetchService: Array<any> = [];
  fetchService1:any;
  // public businessEnitities:Array<any> = [];
  // businessEnitities1:any
  public products:Array<any> = [];
  products1:any;
  productIdValue:any;
  serviceStatus:any;
  businessValues=[];
  businessEntityIdValue:any;

  listService(data: any) {
    if(data.status = true && data.message == "ServiceView List"){
      this.serviceTypes = data.result.content;
        this.serviceTypes.forEach(function(item:any){
        let serviceTypes = item.serviceType;
        let productIdValue = item.productId;
        let serviceStatus = item.serviceStatus
      });
    }
    
    this.serviceTypes.map((item:any)=>{
          this.fetchService.push(item.serviceGroup);
          this.products.push(item.productName);
    });
    this.fetchService1 = this.fetchService;
    this.products1 =  this.products
  }

  selectType(event:any){
    this.selectedValue = {...event};
    console.log(this.selectedValue)
  }

  get f() {
    return this.createGeneralServiceForm.controls;
  }

  businessList(data:any){
    if(data.status = true && data.message == "Business List"){
      this.businessValues = data.result;
      this.businessValues.forEach(function(item:any){
      let businessValues = item.businessName;
    });
  }
}
  selectBusinessId(event:any){
    this.selectedBusinessIdValue = {...event};
    console.log(this.selectedBusinessIdValue)
  }
  transactionPeriods = [
    { id: 1, value: "Month", label: "Month" },
    { id: 2, value: "Year", label: "Year" },
  ];

  buildForm() {
    this.createGeneralServiceForm = this.formBuilder.group({
      serviceTypeValue: ["", Validators.required],
      serviceGroupValue: ["", Validators.required],
      serviceName: ["", Validators.required],
      serviceDescription: ["", Validators.required],
      businessEntity: ["", Validators.required],
      product: ["", Validators.required],
      unitCost: ["", Validators.required],
      transactionLimitPeriod: ["", Validators.required],
      transactionLimit: ["", Validators.required],
    });
    this.createTechnicalServiceForm = this.formBuilder.group({
      apiName: ["", Validators.required],
      apiDescription: ["", Validators.required],
      apiMethod: ["", Validators.required],
      apiFormat: ["", Validators.required],
      apiInput: ["{}",Validators.required],
      apiOutput: ["{}", Validators.required],
      apiUrl:["#",Validators.required],
      apiSlug: ["", Validators.required],
    });
  }

  submitGeneralServiceData() {
    // let {generalServiceName} = this.createGeneralServiceForm.value
    // console.log(generalServiceName);
    let payload = {
      businessEntityId:this.selectedBusinessIdValue.businessEntityId,
      productId: this.selectedValue.productId,
      serviceStatus: this.selectedValue.serviceStatus,
      serviceType: this.createGeneralServiceForm.value.serviceTypeValue,
      serviceGroup: this.createGeneralServiceForm.value.serviceGroupValue,
      //serviceName: this.createGeneralServiceForm.value.serviceName,
      serviceDesc: this.createGeneralServiceForm.value.serviceDescription,
      //businessEntity: this.createGeneralServiceForm.value.businessEntity,
      //product: this.createGeneralServiceForm.value.product,
      unitCost: this.createGeneralServiceForm.value.unitCost,
      transactionLimitPeriod: this.createGeneralServiceForm.value.transactionLimitPeriod,
      transactionLimit: this.createGeneralServiceForm.value.transactionLimit,
    }
    console.log(this.createGeneralServiceForm.value);
    console.log(payload)
    this.commonApiCall(
      `${this.apiService.apiList.serviceManagement.saveGeneral}`,
      "postMethod",
       payload,
      "generalDataSubmitted",
      {},
      false
    );
   }
  submitTechnicalServiceData() {
    // let {generalServiceName} = this.createTechnicalServiceForm.value
    // console.log(generalServiceName);
    let payload = {
      serviceId: this.selectedValue.serviceId,
      serviceName: this.createGeneralServiceForm.value.serviceName,
      apiName:this.createTechnicalServiceForm.value.apiName,
      apiDesc: this.createTechnicalServiceForm.value.apiDescription,
      apiMethod: this.createTechnicalServiceForm.value.apiMethod,
      apiFormat: this.createTechnicalServiceForm.value.apiFormat,
      apiInput: this.createTechnicalServiceForm.value.apiInput,
      apiOutput: this.createTechnicalServiceForm.value.apiOutput,
      apiUrl: this.createTechnicalServiceForm.value.apiUrl,
      apiStatus: this.selectedValue.apiStatus,
      unitCost:this.createGeneralServiceForm.value.unitCost,
      transactionLimit: this.createGeneralServiceForm.value.transactionLimit,
      transactionLimitPeriod : this.createGeneralServiceForm.value.transactionLimitPeriod,
      // apiSlug: this.createTechnicalServiceForm.value.apiSlug,
    }
    console.log(this.createGeneralServiceForm.value);
    console.log(payload)
    this.commonApiCall(
      `${this.apiService.apiList.serviceManagement.saveTechnical}`,
      "postMethod",
       payload,
      "technicalDataSubmitted",
      {},
      false
    );
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
        console.log(result);
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
  generalDataSubmitted(){
    this.toastr.success("Successfully created General Information","Success");
  }
  technicalDataSubmitted(data:any){
    this.toastr.success("Successfully created Technical Information","Success");
    this.createGeneralServiceForm.reset();
    this.router.navigate(["/content/home/service-management"]);
  }

  backtoTableList() {
    this.router.navigate(["/content/home/service-management"]);
  }
}
