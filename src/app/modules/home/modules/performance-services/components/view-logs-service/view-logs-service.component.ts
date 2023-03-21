import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "@app/shared/service/api.service";
import { HttpService } from "@app/shared/service/http.service";
import { StateService } from "@app/shared/service/state.service";
import { ScaleType } from "@swimlane/ngx-charts";
import { from } from "rxjs";
import { saveAs } from 'file-saver';
@Component({
  selector: "app-view-logs-service",
  templateUrl: "./view-logs-service.component.html",
  styleUrls: ["./view-logs-service.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ViewLogsServiceComponent implements OnInit {
  // breadcrumbList: any = [
  //   { label: "Performance Services" },
  //   { label: "View Logs of service" },
  // ];

  // titleWithBack = { title: "View Logs of Service" };

  active = 1;

  selectSubscribers = [
    { id: 1, value: "", label: "Dummmy 1" },
    { id: 2, value: "", label: "Dummy 2" },
  ];

  displayedColumns: string[] = ['apiInput', 'apiOutput', 'apiUrl'];

  dataSource = [
    { apiInput: 'Qpay', apiOutput: "Jelly Bean", apiUrl: '18 Nov 2020'},
  ];

  monthList = [
    { id: 1, value: "", label: "September" },
    { id: 2, value: "", label: "October" },
  ];

  yearList = [
    { id: 1, value: "", label: "2020" },
    { id: 2, value: "", label: "2021" },
  ];
  statusColors: any = {
    Active: "background: #44CC3B 0% 0% no-repeat padding-box;",
    InActive: "background: #FF4B3A 0% 0% no-repeat padding-box;",
    Pending: "background: #FDAF00 0% 0% no-repeat padding-box;",
    "On Hold": "background: #FDAF00 0% 0% no-repeat padding-box;",
  };
  actionItems!: any;
  copyActionitems!: any;
  statusItems!: any;
  mainHeading: any;
  selectedSubscriber: any;
  sucessHit: any;
  failureHit: any;
  totalHit: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private apiService: ApiService,
    private stateService: StateService,) {}
  
  status: any;
  activeSubServiceStatus = "Attendance Input";
  serviceData!:any;
  copyServiceData!:any;
  serviceDetailsId:any  = null;
  serviceDetails!:any;
  serviceId:any = null;
  chartData:any;
  fromDate = new FormControl(new Date());
  toDate = new FormControl(new Date());

  colorScheme = {
    domain: ['#FFE700', '#A0EF89','#FF0000'],
    name: 'nightLights',
    selectable: true,
    group: ScaleType.Ordinal,
  };
  view: [number,number] = [1000, 313];
  legend: boolean = true;
  
  // chartData = [
  //   {
  //     name: "No. of Hits",
  //     series: [
  //       {
  //         name: "Aug",
  //         value: 14
  //       },
  //       {
  //         name: "Sep",
  //         value: 35
  //       },
  //       {
  //         name: "Oct",
  //         value: 4
  //       },
  //       {
  //         name: "Nov",
  //         value: 17
  //       },
  //       {
  //         name: "Dec",
  //         value: 14
  //       },
  //       {
  //         name: "Jan",
  //         value: 35
  //       }
  //     ]
  //   },
  
  //   {
  //     name: "No. of Success",
  //     "series": [
  //       {
  //         name: "Aug",
  //         value: 364
  //       },
  //       {
  //         name: "Sep",
  //         value: 412
  //       },
  //       {
  //         name: "Oct",
  //         value: 437
  //       },
  //       {
  //         name: "Nov",
  //         value: 437
  //       },
  //       {
  //         name: "Dec",
  //         value: 364
  //       },
  //       {
  //         name: "Jan",
  //         value: 412
  //       }
  //     ]
  //   },
  //   {
  //     name: "No. of Fail",
  //     "series": [
  //       {
  //         name: "Aug",
  //         value: 168
  //       },
  //       {
  //         name: "Sep",
  //         value: 343
  //       },
  //       {
  //         name: "Oct",
  //         value: 512
  //       },
  //       {
  //         name: "Nov",
  //         value: 291
  //       },
  //       {
  //         name: "Dec",
  //         value: 168
  //       },
  //       {
  //         name: "Jan",
  //         value: 343
  //       },
  //     ]
  //   }
  // ]

  ngOnInit(): void {
    this.status = this.activatedRoute.snapshot.queryParamMap.get("status");
    this.serviceId = this.activatedRoute.snapshot.queryParamMap.get("serviceId");
    this.serviceDetailsId = this.activatedRoute.snapshot.paramMap.get('id');
    this.mainHeading = "View Logs of Service"
    // this.titleWithBack = { title: this.mainHeading };
    // this.breadcrumbList = [
    //   { label: "Service Management" },
    //   { label: this.mainHeading },
    // ];
    this.commonApiCall(
      `${this.apiService.apiList.serviceManagement.servicesDetails}/${this.serviceDetailsId}`,
      "getMethod",
      {},
      "getDetails",
      {},
      false
    );
    this.commonApiCall(
      `${this.apiService.apiList.serviceManagement.subscribers}?serviceId=${this.serviceId}&serviceDetailsId=${this.serviceDetailsId}`,
      "getMethod",
      {},
      "getSubscribers",
      {},
      false
    );
  }

  getSubscribers(data:any){
    this.selectSubscribers = data;
    this.selectedSubscriber = data[0]?.subscriberId;
    let fromDate = new Date(this.fromDate.value);
    let formattedFromDate = `${fromDate.getFullYear()}-${fromDate.getMonth()}-${fromDate.getDay()}`;
    let toDate = new Date(this.toDate.value);
    let formattedToDate = `${toDate.getFullYear()}-${toDate.getMonth()}-${toDate.getDay()}`
    let payload = this.getAppliedFilter();
    this.commonApiCall(
      `${this.apiService.apiList.serviceManagement.hitDetails}`,
      "postMethod",
      payload,
      "hitDetails",
      {},
      false
    );

    this.commonApiCall(
      `${this.apiService.apiList.serviceManagement.dateDetails}`,
      "postMethod",
      payload,
      "getChartData",
      {},
      false
    );



  }


  getAppliedFilter(){
    let fromDate = new Date(this.fromDate.value);
    let formattedFromDate = `${fromDate.getFullYear()}-${fromDate.getMonth()}-${fromDate.getDay()}`;
    let toDate = new Date(this.toDate.value);
    let formattedToDate = `${toDate.getFullYear()}-${toDate.getMonth()}-${toDate.getDay()}`
    let payload = {
      "serviceId":this.serviceId,
      "serviceDetailsId":this.serviceDetailsId,
      "subscriberId":this.selectedSubscriber,
      "fromDate":"2021-12-08",
      "toDate":"2021-12-10"
    
    }
    return payload;
  }

  downloadFile(data:any){
    var blob = new Blob([data], {type: 'text/csv' })
    saveAs(blob, "logs.csv");
  }

  downloadLogs(){
    let params = this.getAppliedFilter() as any;
    let payload = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');
    
    this.commonApiCall(
      `${this.apiService.apiList.serviceManagement.downloadAPIlogs}?${payload}`,
      "download",
      payload,
      "downloadFile",
      {},
      false
    );
  }

  getChartData(data:any){
    this.chartData = data;
  }

  hitDetails(data:any){
    this.sucessHit = data.sucessHit;
    this.failureHit = data.failureHit;
    this.totalHit = data.totalHit;
  }
  getStatus(element:any){
    let status = this.statusItems.find((item:any)=>item.statusCode == element.apiStatus).statusName;
    return status;
  }
  serviceList(data:any){
    this.serviceData = data;
    this.copyServiceData = JSON.parse(JSON.stringify(this.serviceData));
    this.activeSubServiceStatus = this.serviceData.find((item:any)=>item.apiName === this.serviceDetails.apiName).apiName;
    this.serviceData = this.serviceData.filter((item:any)=>item.apiName !== this.serviceDetails.apiName);
  }
  
  selectActiveSubServiceStatus(selectedService:any) {
    this.activeSubServiceStatus = selectedService.apiName;
    this.serviceData = JSON.parse(JSON.stringify(this.copyServiceData));
    this.serviceDetails = this.copyServiceData.find((item:any)=>item.apiName === selectedService.apiName);
    this.serviceData = this.serviceData.filter((item:any)=>item.apiName !== selectedService.apiName);
  }
  
 

  statusList(data:any){
    console.log(data);
    this.statusItems = data;
  }

  
  getDetails(data:any){
    console.log(data);

    this.serviceDetails = data;
   
    this.commonApiCall(
      `${this.apiService.apiList.serviceManagement.statusList}`,
      "getMethod",
      {},
      "statusList",
      {},
      false
    );
    this.commonApiCall(
      `${this.apiService.apiList.serviceManagement.services}/${this.serviceId}`,
      "getMethod",
      {},
      "serviceList",
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

  navigateBack(){
    this.router.navigate(["content/home/performance-services"]);
  }
}
