import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "@app/shared/service/api.service";
import { HttpService } from "@app/shared/service/http.service";
import { StateService } from "@app/shared/service/state.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-view-subscribed-service',
  templateUrl: './view-subscribed-service.component.html',
  styleUrls: ['./view-subscribed-service.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewSubscribedServiceComponent implements OnInit {

  breadcrumbList: any = [
    { label: "Performance Services" },
    { label: "View Logs of service" },
  ];

  titleWithBack = { title: "View Logs of Service" };

  active = 1;



  statusColors: any = {
    Active: "background: #44CC3B 0% 0% no-repeat padding-box;",
    InActive: "background: #FF4B3A 0% 0% no-repeat padding-box;",
    Pending: "background: #FDAF00 0% 0% no-repeat padding-box;",
    "On Hold": "background: #FDAF00 0% 0% no-repeat padding-box;",
  };
  statusItems!: any;
  selectedSubscriber: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private apiService: ApiService,
    private stateService: StateService,
    private toastr: ToastrService) { }

  status: any;
  activeSubServiceStatus = "Attendance Input";
  serviceData!: any;
  copyServiceData!: any;
  serviceDetailsId: any = null;
  serviceDetails = [{
    serviceName: 'test',
    businessName: 'test',
    services: 'test',
    createdTimestamp: 'test',
    productName: 'test'
  }];
  serviceId: any = null;

  fromDate = new FormControl(new Date());
  toDate = new FormControl(new Date());


  ngOnInit(): void {
    this.commonApiCall(
      `${this.apiService.apiList.serviceManagement.servicesDetails}/1`,
      "getMethod",
      {},
      "ServiceDetails",
      {},
      false
    );
  }

  public serviceDetailsData:any;
  ServiceDetails(data:any){
    this.serviceDetailsData = data;
    console.log(data);
  }
  routeValue:any;
  unSubscribe(data:any){
    this.routeValue = this.activatedRoute.snapshot.paramMap.get('id');
    let subscriberIdValue =  this.routeValue
    console.log(subscriberIdValue)
    this.commonApiCall(
      `${this.apiService.apiList.subscriberService.unSubscribe}/${this.routeValue}`,
      "putMethod",
      {},
      "unSubscribeData",
      {},
      false
    );
  }
  unSubscribeData(){
    this.toastr.success("SuccessFully UnSubscribed","Success");
    this.router.navigate(["content/home/subscribedservice"]);
  }
  getAppliedFilter() {
    let fromDate = new Date(this.fromDate.value);
    let formattedFromDate = `${fromDate.getFullYear()}-${fromDate.getMonth()}-${fromDate.getDay()}`;
    let toDate = new Date(this.toDate.value);
    let formattedToDate = `${toDate.getFullYear()}-${toDate.getMonth()}-${toDate.getDay()}`
    let payload = {
      "serviceId": this.serviceId,
      "serviceDetailsId": this.serviceDetailsId,
      "subscriberId": this.selectedSubscriber,
      "fromDate": "2021-10-04",
      "toDate": "2021-10-20"

    }
    return payload;
  }

  getStatus(element: any) {
    let status = this.statusItems.find((item: any) => item.statusCode == element.apiStatus).statusName;
    return status;
  }

  selectActiveSubServiceStatus(selectedService: any) {
    this.activeSubServiceStatus = selectedService.apiName;
    this.serviceData = JSON.parse(JSON.stringify(this.copyServiceData));
    this.serviceDetails = this.copyServiceData.find((item: any) => item.apiName === selectedService.apiName);
    this.serviceData = this.serviceData.filter((item: any) => item.apiName !== selectedService.apiName);
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

  navigateBack() {
    this.router.navigate(["content/home/subscribedservice"]);
  }
}
