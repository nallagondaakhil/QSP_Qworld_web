import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "@app/shared/service/api.service";
import { HttpService } from "@app/shared/service/http.service";
import { StateService } from "@app/shared/service/state.service";
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
@Component({
  selector: 'app-subscriber-management',
  templateUrl: './subscriber-management.component.html',
  styleUrls: ['./subscriber-management.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SubscriberManagementComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private readonly router: Router,
    private httpService: HttpService,
    private apiService: ApiService,
    private stateService: StateService,
    private datePipe: DatePipe
  ) { }

  @ViewChild("allServiceTable") allServiceTable: any;



  active = 1;
  statusColors: any = {
    Active: "background: #44CC3B 0% 0% no-repeat padding-box;",
    InActive: "background: #FF4B3A 0% 0% no-repeat padding-box;",
    Pending: "background: #FDAF00 0% 0% no-repeat padding-box;",
    "On Hold": "background: #FDAF00 0% 0% no-repeat padding-box;",
  };
  // dataSource!:any;

  // dataSource = [
  //   { subscriberName: 'Qpay', serviceName: "Jelly Bean", subscriptionDate: '18 Nov 2020',transactions:"Active",lastLoginDate:"12",status:"Active"},
  //   { subscriberName: 'Qpay', serviceName: "Jelly Bean", subscriptionDate: '18 Nov 2020',transactions:"Active",lastLoginDate:"12",status:"Active"},
  //   { subscriberName: 'Qpay', serviceName: "Jelly Bean", subscriptionDate: '18 Nov 2020',transactions:"Active",lastLoginDate:"12",status:"Active"},
  // ];

  dataSource!: MatTableDataSource<any>;
  expandedElement = null;
  columnsToDisplay = ["subscriberName", "serviceName", "subscriptionDate", "transactions", "lastLoginDate", "status", "action"];
  nestedRows!: any[];
  // types = [
  //   { label: "Platform Developer" },
  //   { label: "Platform Developer" },
  //   { label: "Platform Developer" },
  //   { label: "Platform Developer" },
  // ];
  // // serviceName = "apiController";
  // serviceType = "apiController";
  // product = "apiController";

  serviceTypes = [
    { id: 1, value: "apiController", label: "API controller" },
    { id: 2, value: "dummyController", label: "dummy controller" },
  ];

  status = [{ label: "Active" }, { label: "Inactive" }];

  statusItems!: any[];

  ngOnInit(): void {

    this.commonApiCall(
      `${this.apiService.apiList.subscriberManagement.adminlist}`,
      "getMethod",
      {},
      "SubscriberList",
      false
    );
  }

  public serviceNamee: Array<any> = [];
  public serviceNamee1: Array<any> = [];

  public productName: Array<any> = [];
  public productName1: Array<any> = [];
  public subscriberList: any;
  SubscriberList(data: any) {
    console.log(data);
    if(data.status == true && data.message == "SubscriberAdmin List"){
    data = data.result.map((item: any) => {
      item.createdTimestamp = this.datePipe.transform(item.createdTimestamp, 'mediumDate')
      return item;
    });
  }
  // else if(data.result == null && data.status == false){
  //     this.message = "No SubscriberAdmin List Available";
  // }
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.dataSource.filterPredicate =
    //   (data: any, filtersJson: string) => {
    //     const matchFilter: any = [];
    //     const filters = JSON.parse(filtersJson);

    //     filters.forEach((filter: any) => {
    //       const val = data[filter.id] === null ? '' : data[filter.id];
    //       matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
    //     });
    //     return matchFilter.every(Boolean);
    //   };
    // console.log(this.dataSource);
    data = data.map((item: any) => {
      // item.createdTimestamp = this.datePipe.transform(item.createdTimestamp, 'mediumDate')
      this.serviceNamee1.push(item.serviceName);
      this.productName1.push(item.productName);
      return item;
    });
    this.serviceNamee = this.serviceNamee1;
    console.log("afterServiceType", this.serviceNamee);
    this.productName = this.productName1;
    console.log("productName", this.serviceNamee);
  }


  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  statusList(data: any) {
    console.log(data);
    this.statusItems = data;
  }

  // getStatus(element: any) {
  //   let status = this.statusItems.find((item) => item.statusCode == element.serviceStatus).statusName;
  //   return status;
  // }

  getNestedRowStatus(element: any) {
    let status = this.statusItems.find((item) => item.statusCode == element.apiStatus).statusName;
    return status;
  }

  expandData(row: any) {
    if (row.nestedRows && row.nestedRows.length > 0) {
      return;
    }
    this.commonApiCall(
      `${this.apiService.apiList.serviceManagement.services}/${row.serviceId}`,
      "getMethod",
      {},
      "displayServices",
      row,
      false
    );
  }

  displayServices(data: any, params: any) {
    params.nestedRows = data.map((item: any) => {
      item.createdTimestamp = this.datePipe.transform(item.createdTimestamp, 'mediumDate')
      return item;
    });
  }

  getCellStyle(element: any, nav: any, cellName: any) {
    let width = this.allServiceTable._document.querySelector(`.mat-column-${cellName}`).getBoundingClientRect().width;
    if (cellName === 'serviceGroup') {
      width = width - 24;
    }
    width += "px";
    return { width, padding: "0.75rem 0rem" };
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
  // viewPerformanceService(selectedItem: any) {
  //   this.router.navigate([`/content/home/performance-services/view/${selectedItem.subscriberId}`], {
  //     queryParams: { serviceId: selectedItem.serviceId },
  //   });
  // }

  // editProduct(element: any) {
  //   this.router.navigate(['/content/home/subscriber-management/edit/1']);
  // }

  viewUser(selectedItem: any) {
    this.router.navigate([`/content/home/subscriber-management/view/${selectedItem.serviceDetailsId}`]);
  }

  applyFilter3(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // applyFilter3(event: Event) {
  //   console.log(event);
  //   const tableFilters = [];
  //   if (event == undefined) {
  //     this.dataSource.filter = "";
  //     return
  //   }
  //   tableFilters.push({
  //     id: 'serviceName',
  //     value: event
  //   });
  //   this.dataSource.filter = JSON.stringify(tableFilters);
  // }

  applyFilter4(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // applyFilter4(event: Event) {
  //   console.log(event);
  //   const tableFilters = [];
  //   if (event == undefined) {
  //     this.dataSource.filter = "";
  //     return
  //   }
  //   tableFilters.push({
  //     id: 'productName',
  //     value: event
  //   });
  //   this.dataSource.filter = JSON.stringify(tableFilters);
  // }

}
