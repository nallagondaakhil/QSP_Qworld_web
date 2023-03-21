import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@app/shared/service/api.service';
import { HttpService } from '@app/shared/service/http.service';
import { StateService } from '@app/shared/service/state.service';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-view-management',
  templateUrl: './view-management.component.html',
  styleUrls: ['./view-management.component.scss']
})
export class ViewManagementComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private apiService: ApiService,
    private stateService: StateService,
    private datePipe: DatePipe,
    private toastr: ToastrService,
  ) { }

  createProductForm!: FormGroup;
  userId!:any;
  selectedDetails:any = null;
  userDetails:any;

  ngOnInit(): void {
    // this.roleId = this.activatedRoute.snapshot.queryParamMap.get("roleId");
    // this.selectedDetails = this.activatedRoute.snapshot.paramMap.get('id');
       this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("selected details.....",this.userId)
    this.commonApiCall(
      `${this.apiService.apiList.userManagement.get}/${this.userId}`,
      "getMethod",
      {},
      "listUser",
      {},
      false
    );
  }

  listUser(data: any) {
    data.createdTimestamp = this.datePipe.transform(data.createdTimestamp, 'mediumDate')
    this.userDetails = data;
    console.log(this.userDetails);
    this.commonApiCall(
      `${this.apiService.apiList.serviceManagement.statusList}`,
      "getMethod",
      {},
      "statusList",
      {},
      false
    );

    this.commonApiCall(
      `${this.apiService.apiList.userManagement.userList}/${this.userId}`,
      "getMethod",
      {},
      "userList",
      {},
      false
    );

  }
  status = ["Active", "Inactive"];

  displayedColumns: string[] = ['productName', 'serviceGroup', 'userType'];

  // dataSource = [
  //   { product: 'Qpay', serviceName: "Jelly Bean", userType: '18 Nov 2020' },
  //   { product: 'Qpay', serviceName: "Jelly Bean", userType: '18 Nov 2020' },
  //   { product: 'Qpay', serviceName: "Jelly Bean", userType: '18 Nov 2020' },
  // ];

  dataSource!: MatTableDataSource<any>;

  userList(data:any){
    console.log(data);
    if(data.message = "UserProduct List" && data.status == true){
    data = data.result;
  }
    // data = data.result.map((item: any) => {
    //  // let createdTimestamp = new Date(item.createdTimestamp);
    //  // item.createdTimestamp = this.datePipe.transform(createdTimestamp, 'mediumDate');
    //   return item;
    // });

    this.dataSource = new MatTableDataSource(data);
  }

  statusColors: any = {
    Active: "background: #44CC3B 0% 0% no-repeat padding-box;",
    InActive: "background: #FF4B3A 0% 0% no-repeat padding-box;",
  };

  statusItems!: any;

  getStatus(element: any) {
    if (!element.status) {
      return "";
    }
    let status = this.statusItems.find((item: any) => item.statusCode == element.status).statusName;
    return status;
  }

  statusList(data: any) {
    console.log(data);
    this.statusItems = data;
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

  editUser(element: any) {
    this.router.navigate([`/content/home/user-management/edit/${this.userId}`]);
  }

  navigateBack() {
    this.router.navigate(["content/home/user-management"]);
  }

}
