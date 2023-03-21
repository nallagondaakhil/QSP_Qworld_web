import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@app/shared/service/api.service';
import { HttpService } from '@app/shared/service/http.service';
import { StateService } from '@app/shared/service/state.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-billing',
  templateUrl: './product-billing.component.html',
  styleUrls: ['./product-billing.component.scss']
})
export class ProductBillingComponent implements OnInit {

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
  displayedColumns: string[] = ['productname', 'servicetype', 'billingcycle', 'billingamount', 'action'];
  dataSource = [
    { productname: 'Qpay', servicetype: "Jelly Bean", billingcycle: '18 Nov 2020',billingamount:"Active"},
    { productname: 'Qpay', servicetype: "Jelly Bean", billingcycle: '18 Nov 2020',billingamount:"Active"},
    { productname: 'Qpay', servicetype: "Jelly Bean", billingcycle: '18 Nov 2020',billingamount:"Active"},
  ];
  //dataSource!: MatTableDataSource<any>;
  statusItems!: any;
  // createUser() {
  //   this.router.navigate(['/content/home/user-management/create']);
  // }
  // editUser(element: any) {
  //   this.router.navigate([`/content/home/user-management/edit/${element.userid}`]);
  // }
  viewUser(element: any) {
    this.router.navigate(['/content/home/product-billing/view/1']);
  }
  // dataSource!:any;
  listUser(data: any) {
    // data = data.map((item: any) => {
    //   let createdTimestamp = new Date(item.createdTimestamp);
    //   item.createdTimestamp = this.datePipe.transform(createdTimestamp, 'mediumDate')
    //   return item;
    // });
  //  this.dataSource = new MatTableDataSource(data);
    // this.dataSource.filterPredicate =
      // (data: any, filtersJson: string) => {
      //   const matchFilter: any = [];
      //   const filters = JSON.parse(filtersJson);

      //   filters.forEach((filter: any) => {
      //     const val = data[filter.id] === null ? '' : data[filter.id];
      //     matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
      //   });
      //   return matchFilter.every(Boolean);
      // };
    console.log(this.dataSource);
    this.commonApiCall(
      `${this.apiService.apiList.serviceManagement.statusList}`,
      "getMethod",
      {},
      "statusList",
      {},
      false
    );
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  public form_model: FormGroup = new FormGroup({
    Active: new FormControl(),
    Inactive: new FormControl(),
  });


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

  public products: Array<any> = [];
  public products1: Array<any> = [];
  listProduct(data: any) {
    data = data.result.map((item: any) => {
      item.createdTimestamp = this.datePipe.transform(item.createdTimestamp, 'mediumDate')
      console.log(item.productName);
      this.products1.push(item.productName);
      console.log(this.products1)
      return item;
    });
    console.log("after", this.products1);
    this.products = this.products1;
  }

}
