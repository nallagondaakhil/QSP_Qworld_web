import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "@app/shared/service/api.service";
import { HttpService } from "@app/shared/service/http.service";
import { StateService } from "@app/shared/service/state.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-edit-service-management",
  templateUrl: "./edit-service-management.component.html",
  styleUrls: ["./edit-service-management.component.scss"],
})
export class EditServiceManagementComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, 
    private router: Router,
    private httpService: HttpService,
    private apiService: ApiService,
    private stateService: StateService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute) {
    this.buildEditForm();
  }
  editGeneralServiceForm!: FormGroup;
  editTechnicalServiceForm!: FormGroup;

  breadcrumbList: any = [
    { label: "Service Management" },
    { label: "Edit Payroll Group" },
  ];

  titleWithBack = { title: "Edit Payroll service pending Group" };
  serviceIdValue!:any;
  serviceDetailsIdValue!:any;
  ngOnInit(): void {
    this.serviceIdValue = this.activatedRoute.snapshot.paramMap.get('id');
    this.serviceDetailsIdValue = this.activatedRoute.snapshot.queryParamMap.get('serviceDetailsId');
    console.log(this.serviceIdValue,this.serviceDetailsIdValue)
    this.commonApiCall(
      `${this.apiService.apiList.serviceManagement.services}/${this.serviceIdValue}`,
      "getMethod",
      {},
      "listUser",
      {},
      false
    );
  }

  active = 1;
  editDetails!:any;
  serviceTypes = [];
  serviceGroups = [];
  businessEnitities = [];
  products = [];
  transactionPeriods = [];

  listUser(data: any){
    // console.log(data)
    this.editDetails = data.find((item: any) => item.serviceDetailsId == this.serviceDetailsIdValue)
    console.log(this.editDetails);
    this.editGeneralServiceForm.setValue({
      serviceType:this.editDetails.serviceType,
      serviceGroup:this.editDetails.serviceGroup,
      serviceName:this.editDetails.serviceName,
      serviceDescription:this.editDetails.serviceDesc,
      businessEntity:this.editDetails.businessName,
      product:this.editDetails.productName,
      unitCost:this.editDetails.unitCost,
      transactionLimitPeriod:this.editDetails.transactionLimitPeriod,
      transactionLimit:this.editDetails.transactionLimit,
    })
    this.editTechnicalServiceForm.setValue({
      apiName:this.editDetails.apiName,
      apiDescription:this.editDetails.apiDesc,
      apiMethod:this.editDetails.apiMethod,
      apiFormat:this.editDetails.apiFormat,
      apiInput:this.editDetails.apiInput,
      apiOutput:this.editDetails.apiOutput,
      apiUrl:this.editDetails.apiUrl,
      apiSlug:this.editDetails.apiSlug,
    })
  }
  

  buildEditForm() {
    this.editGeneralServiceForm = this.formBuilder.group({
      serviceType: ["", Validators.required],
      serviceGroup: ["", Validators.required],
      businessEntity: ["", Validators.required],
      product: ["", Validators.required],
      transactionLimitPeriod: ["", Validators.required],
      transactionLimit: ["", Validators.required],
      unitCost: ["", Validators.required],
      serviceDescription: ["", Validators.required],
      serviceName: ["", Validators.required],
    });
    this.editTechnicalServiceForm = this.formBuilder.group({
      apiName: ["", Validators.required],
      apiDescription: ["", Validators.required],
      apiMethod: ["", Validators.required],
      apiFormat: ["", Validators.required],
      apiInput: [ "", Validators.required,],
      apiOutput: ["", Validators.required, ],
      apiUrl:["",Validators.required],
      apiSlug: ["", Validators.required],
    });
  }

  submitGeneralServiceData() {
    let payload = {
      serviceId: this.editDetails.serviceId,
      productId: this.editDetails.productId,
      businessEntityId: this.editDetails.businessEntityId,
      serviceGroup: this.editDetails.serviceGroup,
      serviceDesc: this.editDetails.serviceDesc,
      serviceStatus: this.editDetails.serviceStatus,
      serviceType: this.editDetails.serviceType
    }
    console.log(payload)
    this.commonApiCall(
      `${this.apiService.apiList.serviceManagement.editGeneral}`,
      "putMethod",
      payload,
      "generalDataSubmitted",
      {},
      false
    );
  }
  generalDataSubmitted(data: any) {
    this.toastr.success("Successfuly Updated", "Success");
  }
  submitTechnicalServiceData() {
    let payload = {
      serviceDetailsId:this.editDetails.serviceDetailsId,
      serviceId: this.editDetails.serviceId,
      serviceName: this.editDetails.serviceName,
      apiName:this.editDetails.apiName,
      apiDesc: this.editDetails.apiDesc,
      apiMethod: this.editDetails.apiMethod,
      apiFormat: this.editDetails.apiFormat,
      apiInput: this.editDetails.apiInput,
      apiOutput: this.editDetails.apiOutput,
      apiUrl: this.editDetails.apiUrl,
      apiSlug:this.editDetails.apiSlug,
      action:this.editDetails.action,
      apiStatus:this.editDetails.apiStatus,
      visibility:this.editDetails.visibility,
      unitCost:this.editDetails.unitCost,
      transactionLimitPeriod : this.editDetails.transactionLimitPeriod,
      transactionLimit: this.editDetails.transactionLimit,
    }
    console.log(payload)
    this.commonApiCall(
      `${this.apiService.apiList.serviceManagement.editTechnical}`,
      "putMethod",
       payload,
      "technicalDataSubmitted",
      {},
      false
    );
  }
  technicalDataSubmitted(data:any){
    this.toastr.success("Successfuly Updated", "Success");
    this.router.navigate(["/content/home/service-management"]);
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
          this.toastr.error("err.error.error", "Error");
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

  backtoTableList() {
    this.router.navigate(["/content/home/service-management"]);
  }
}
