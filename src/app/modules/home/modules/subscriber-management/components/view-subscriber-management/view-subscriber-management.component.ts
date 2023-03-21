import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "@app/shared/service/api.service";
import { HttpService } from "@app/shared/service/http.service";
import { StateService } from "@app/shared/service/state.service";

@Component({
  selector: 'app-view-subscriber-management',
  templateUrl: './view-subscriber-management.component.html',
  styleUrls: ['./view-subscriber-management.component.scss']
})
export class ViewSubscriberManagementComponent implements OnInit {
  actionItems!: any;
  copyActionitems!: any;
  statusItems!: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private apiService: ApiService,
    private stateService: StateService,) {}
  active = 1;
  status: any;
  activeServiceStatus = "Publish";
  activeServiceDropdown: any = {
    Published: ["Block"],
    Block: ["Unblock"],
    Unblock: ["Block"],
  };
  pendingServiceStatus = "Pending";
  pendingServiceDropdown: any = {
    Pending: ["Accept", "Reject"],
    Accept: ["Pending", "Reject"],
    Reject: ["Accept", "Pending"],
  };

  activeSubServiceStatus = "Attendance Input";
  activeSubServiceDropdown: any = {
    "Attendance Input": ["Leave inputs", "Wages inputs", "OT inputs"],
    "Leave inputs": ["Attendance Input", "Wages inputs", "OT inputs"],
    "Wages inputs": ["Attendance Input", "Leave inputs", "OT inputs"],
    "OT inputs": ["Attendance Input", "Leave inputs", "Wages inputs"],
  };

  pendingSubServiceStatus = "Double Wages";
  pendingSubServiceDropdown: any = {
    "Double Wages": ["Holiday", "Night shift inputs"],
    Holiday: ["Double Wages", "Night shift inputs"],
    "Night shift inputs": ["Double Wages", "Holiday"],
  };
  breadcrumbList: any = [];

  titleWithBack: any = {};
  serviceDetailsId:any  = null;
  serviceId:any;
  serviceData!:any;
  copyServiceData!:any;

  ngOnInit(): void {
    this.status = this.activatedRoute.snapshot.queryParamMap.get("status");
    this.serviceId = this.activatedRoute.snapshot.queryParamMap.get("serviceId");
    this.serviceDetailsId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.status === "Pending") {
      this.mainHeading = "View Payroll service pending group";
    } else {
      this.mainHeading = "View Payroll service group";
    }
    this.titleWithBack = { title: this.mainHeading };
    this.breadcrumbList = [
      { label: "Service Management" },
      { label: this.mainHeading },
    ];
    this.commonApiCall(
      `${this.apiService.apiList.serviceManagement.servicesDetails}/${this.serviceDetailsId}`,
      "getMethod",
      {},
      "getDetails",
      {},
      false
    );

  }

  mainHeading = "View Payroll service group";
  serviceDetails!:any;

  editServiceManagement() {
    this.router.navigate(["/content/home/service-management/edit/1"]);
  }

  backToTableList() {
    this.router.navigate(["/content/home/service-management"]);
  }
  selectActiveServiceStatus(item: string) {
    this.activeServiceStatus = item;
  }

  selectPendingServiceStatus(item: string) {
    this.pendingServiceStatus = item;
  }
  selectActiveSubServiceStatus(selectedService:any) {
    this.activeSubServiceStatus = selectedService.apiName;
    this.serviceData = JSON.parse(JSON.stringify(this.copyServiceData));
    this.serviceDetails = this.copyServiceData.find((item:any)=>item.apiName === selectedService.apiName);
    this.serviceData = this.serviceData.filter((item:any)=>item.apiName !== selectedService.apiName);
  }

  selectPendingSubServiceStatus(item: string) {
    this.pendingSubServiceStatus = item;
  }

  getDetails(data:any){
    console.log(data);

    this.serviceDetails = data;
    this.commonApiCall(
      `${this.apiService.apiList.serviceManagement.actionList}`,
      "getMethod",
      {},
      "actionList",
      {},
      false
    );
    this.commonApiCall(
      `${this.apiService.apiList.serviceManagement.statusList}`,
      "getMethod",
      {},
      "statusList",
      {},
      false
    );
    this.commonApiCall(
      `${this.apiService.apiList.serviceManagement.services}/${data.serviceId}`,
      "getMethod",
      {},
      "serviceList",
      {},
      false
    );


  }

  serviceList(data:any){
    this.serviceData = data;
    this.copyServiceData = JSON.parse(JSON.stringify(this.serviceData));
    this.activeSubServiceStatus = this.serviceData.find((item:any)=>item.apiName === this.serviceDetails.apiName).apiName;
    this.serviceData = this.serviceData.filter((item:any)=>item.apiName !== this.serviceDetails.apiName);
  }


  actionList(data:any){
    console.log(data);
    this.actionItems = data;
    this.copyActionitems = JSON.parse(JSON.stringify(this.actionItems));
    this.activeServiceStatus = this.actionItems.find((item:any)=>item.actionName == this.serviceDetails.action).actionName;
    this.actionItems = this.actionItems.filter((item:any)=>item.actionName !== this.serviceDetails.action)
  }

  statusList(data:any){
    console.log(data);
    this.statusItems = data;
  }

  navigateBack(){
    this.router.navigate(["/content/home/subscriber-management"]);
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
          this.stateService.showMessage({
            type: "message",
            message: [err.error.error],
          });
        }
        this.stateService.removeCalledApi(apiUrl);
      },
      () => {
        this.stateService.removeCalledApi(apiUrl);
      }
    );
  }
}
