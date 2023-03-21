import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/shared/service/api.service';
import { HttpService } from '@app/shared/service/http.service';
import { StateService } from '@app/shared/service/state.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  constructor(
    private httpService: HttpService,
    private apiService: ApiService,
    private stateService: StateService,
    private datePipe:DatePipe,
    private activatedRoute:ActivatedRoute
  ) { }
  userId!:any;
  currentUser!:any;
  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.commonApiCall(
      `${this.apiService.apiList.userManagement.get}/${this.userId}`,
      "getMethod",
      {},
      "userInfo",
      {},
      false
    );
  }

  displayedColumns: string[] = ['product', 'serviceName','userType'];
  dataSource = [
    { product: 'Qpay', serviceName: "Employee information", userType:"Platform developer"},
    { product: 'Qpay', serviceName: "Employee information", userType:"Platform developer"},
    { product: 'Qpay', serviceName: "Employee information", userType:"Platform developer"},
  
  ];
  statusColors: any = {
    Active: "background: #44CC3B 0% 0% no-repeat padding-box;",
    InActive: "background: #FF4B3A 0% 0% no-repeat padding-box;",
    Pending: "background: #FDAF00 0% 0% no-repeat padding-box;",
    "On Hold": "background: #FDAF00 0% 0% no-repeat padding-box;",
  };
  
  userStatus :any= {
    "1":"Active",
    "0":"InActive"
  }
  userInfo(data:any){
    this.currentUser = data;
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
