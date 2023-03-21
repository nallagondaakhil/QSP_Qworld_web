import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@app/shared/service/api.service';
import { HttpService } from '@app/shared/service/http.service';
import { StateService } from '@app/shared/service/state.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-view-user-management',
  templateUrl: './view-user-management.component.html',
  styleUrls: ['./view-user-management.component.scss']
})
export class ViewUserManagementComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private httpService: HttpService,
    private apiService: ApiService,
    private stateService: StateService,
    private datePipe: DatePipe) { }

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
      "listProduct",
      {},
      false
    );
  }
  status = ["Active", "Inactive"];
  types = [
    { label: "Platform Developer" },
    { label: "Business Entity Admin" },
    { label: "Product Developer" },
    { label: "Product Owner" },
    { label: "Subcriber" },
  ];
  statusColors: any = {
    Active: "background: #44CC3B 0% 0% no-repeat padding-box;",
    InActive: "background: #FF4B3A 0% 0% no-repeat padding-box;"
  };
  displayedColumns: string[] = ['username', 'type', 'createdTimestamp', 'lastLoginDate', 'status', 'action'];
  // dataSource = [
  //   { bussinessEntityName: 'Qpay', bussinessEntityAdmin: "Jelly Bean", createdDate: '18 Nov 2020',status:"Active"},
  //   { bussinessEntityName: 'Qpay', bussinessEntityAdmin: "Jelly Bean", createdDate: '18 Nov 2020',status:"Active"},
  //   { bussinessEntityName: 'Qpay', bussinessEntityAdmin: "Jelly Bean", createdDate: '18 Nov 2020',status:"Active"},
  //   { bussinessEntityName: 'Qpay', bussinessEntityAdmin: "Jelly Bean", createdDate: '18 Nov 2020',status:"Active"},
  //   { bussinessEntityName: 'Qpay', bussinessEntityAdmin: "Jelly Bean", createdDate: '18 Nov 2020',status:"Active"},
  //   { bussinessEntityName: 'Qpay', bussinessEntityAdmin: "Jelly Bean", createdDate: '18 Nov 2020',status:"Active"},
  // ];
  dataSource!: MatTableDataSource<any>;
  statusItems!: any;
  createUser() {
    this.router.navigate(['/content/home/user-management/create']);
  }
  editUser(element: any) {
    this.router.navigate([`/content/home/user-management/edit/${element.userid}`]);
  }
  viewUser(element: any) {
    this.router.navigate([`/content/home/user-management/view/${element.userid}`], {
      queryParams: { roleId: element.roleId }
    });
  }
  public typeName: Array<any> = [];
  public typeName1: Array<any> = [];
  listUser(data: any) {
    if (data.status = true && data.message == "UserView Details List") {
      data = data.result.map((item: any) => {
        let createdTimestamp = new Date(item.createdTimestamp);
        item.createdTimestamp = this.datePipe.transform(createdTimestamp, 'mediumDate');
        // console.log(item.roleType);
        this.typeName1.push(item.roleType);
        // console.log(this.typeName1)
        return item;
      });
    }
    // console.log("after", this.typeName1);
    this.typeName = this.typeName1;
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //  this.dataSource.filterPredicate =
    //   (data: any, filtersJson: string) => {
    //     const matchFilter: any = [];
    //    const filters = JSON.parse(filtersJson);

    //   filters.forEach((filter: any) => {
    //      const val = data[filter.id] === null ? '' : data[filter.id];
    //       matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
    //     });
    //     return matchFilter.every(Boolean);
    //   };
    // console.log(this.dataSource);
    this.commonApiCall(
      `${this.apiService.apiList.serviceManagement.statusList}`,
      "getMethod",
      {},
      "statusList",
      {},
      false
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public form_model: FormGroup = new FormGroup({
    Active: new FormControl(),
    Inactive: new FormControl(),
  });

  public checkBoxFilter: any;
  public status1: any;
  applyFilter1(event: Event) {
    this.checkBoxFilter = this.form_model.value;
    this.checkBoxFilter = event;
    // console.log(this.checkBoxFilter);
    // console.log(event);
    const tableFilters = [];
    if (this.checkBoxFilter.Active == true && this.checkBoxFilter.Inactive == true) {
      this.dataSource.filter = "";
      return
    }
    if (this.checkBoxFilter == "Active") {
      // this.status1 = "1";
      this.dataSource.filter = "";
      return
    }
    if (this.checkBoxFilter == "Inactive") {
      this.status1 = "0";
    }
    tableFilters.push({
      id: 'status',
      value: this.status1
    });
    this.dataSource.filter = JSON.stringify(tableFilters);
  }


  getStatus(element: any) {
    if (!element.status) {
      return "";
    }
    let status = this.statusItems.find((item: any) => item.statusCode == element.status).statusName;
    return status;
  }

  statusList(data: any) {
    // console.log(data);
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

  // applyFilter2(event: Event) {
  //   this.checkBoxFilter = this.form_model.value;
  //   this.checkBoxFilter = event;
  //   console.log(this.checkBoxFilter);
  //   console.log(event);
  //   const tableFilters = [];
  //   if (event == undefined) {
  //     this.dataSource.filter = "";
  //     return
  //   }

  //   tableFilters.push({
  //     id: 'roleType',
  //     value: event
  //   });
  //   this.dataSource.filter = JSON.stringify(tableFilters);
  // }
  onChange(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  public products: Array<any> = [];
  public products1: Array<any> = [];
  listProduct(data: any) {
    if (data.status = true && data.message == "ProductView List") {
      data = data.result.map((item: any) => {
        item.createdTimestamp = this.datePipe.transform(item.createdTimestamp, 'mediumDate')
        // console.log(item.productName);
        this.products1.push(item.productName);
        // console.log(this.products1)
        return item;
      });
    }
    // console.log("after", this.products1);
    this.products = this.products1;
  }

}
