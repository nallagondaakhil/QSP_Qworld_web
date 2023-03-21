import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@app/shared/service/api.service';
import { HttpService } from '@app/shared/service/http.service';
import { StateService } from '@app/shared/service/state.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-approval',
  templateUrl: './view-approval.component.html',
  styleUrls: ['./view-approval.component.scss']
})
export class ViewApprovalComponent implements OnInit {

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

  serviceIdValue!:any;
  selectedValue!:any;
  ngOnInit(): void {
    this.serviceIdValue = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.serviceIdValue)
    this.commonApiCall(
      `${this.apiService.apiList.serviceManagement.approval}`,
      "getMethod",
      {},
      "listApproval",
      {},
      false
    );
  }
  options = [{ name: "Accept" }, { name: "Reject" }];
  listApproval(data:any){
    this.selectedValue = data.find((item: any) => item.serviceId == this.serviceIdValue)
    console.log(this.selectedValue);
  }

  selectedActions(data: any) {
    let result = JSON.stringify(this.options)
    console.log(result)
    if(result.includes('Accept')){
      console.log("Sucess")
      this.commonApiCall(
        `${this.apiService.apiList.serviceManagement.actionAccepted}/${data.subscriberId}`,
        "putMethod",
        {},
        "actionAccepted",
        {},
        false
      );
    }
     else if(result.includes('Reject')){
      console.log("Failure")
        this.commonApiCall(
          `${this.apiService.apiList.serviceManagement.actionRejected}/${data.subscriberId}`,
          "putMethod",
          {},
          "actionRejected",
          {},
          false
        );
      }
    }

    actionAccepted(){
      this.toastr.success("Action Accepted", "Success");
      this.router.navigate(["content/home/service-management"]);
    }

    actionRejected(){
      this.toastr.success("Action rejected", "Success");
      this.router.navigate(["content/home/service-management"]);
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
    this.router.navigate(["content/home/service-management"]);
  }

}
