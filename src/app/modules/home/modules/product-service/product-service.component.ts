import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "@app/shared/service/api.service";
import { HttpService } from "@app/shared/service/http.service";
import { StateService } from "@app/shared/service/state.service";
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ToastrService } from 'ngx-toastr';

class Page {
  // The number of elements in the page
  size: number = 0;
  // The total number of elements
  totalElements: number = 0;
  // The total number of pages
  totalPages: number = 0;
  // The current page number
  pageNumber: number = 0;
}

@Component({
  selector: 'app-product-service',
  templateUrl: './product-service.component.html',
  styleUrls: ['./product-service.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProductServiceComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private readonly router: Router,
    private httpService: HttpService,
    private apiService: ApiService,
    private stateService: StateService,
    private datePipe:DatePipe,
    private toastr: ToastrService
  ) {}
  
  @ViewChild("allServiceTable") allServiceTable: any;
  

 
active = 1;
  statusColors: any = {
    Active: "background: #44CC3B 0% 0% no-repeat padding-box;",
    InActive: "background: #FF4B3A 0% 0% no-repeat padding-box;",
    Pending: "background: #FDAF00 0% 0% no-repeat padding-box;",
    "On Hold": "background: #FDAF00 0% 0% no-repeat padding-box;",
  };
  // dataSource!:any;
  dataSource!: MatTableDataSource<any>;
  expandedElement = null;
  columnsToDisplay = ["serviceGroup","serviceType","productName","createdTimestamp","subscribers","action"];
  nestedRows!:any[];
  // types = [
  //   { label: "Platform Developer" },
  //   { label: "Platform Developer" },
  //   { label: "Platform Developer" },
  //   { label: "Platform Developer" },
  // ];
  // serviceName = "apiController";
  // serviceType = "apiController";
  // product = "apiController";

  // serviceTypes = [
  //   { id: 1, value: "apiController", label: "API controller" },
  //   { id: 2, value: "dummyController", label: "dummy controller" },
  // ];

  // status = [{ label: "Active" }, { label: "Inactive" }];

  page = new Page();
  statusItems!:any[];

  ngOnInit(): void {
    this.page.pageNumber = 0;
    this.page.size = 10;
    this.commonApiCall(
      `${this.apiService.apiList.serviceManagement.servicegroup}?page=${this.page.pageNumber}&limit=${this.page.size}`,
      "getMethod",
      {},
      "listService",
      {},
      false
    );
  }

  public productName: Array<any> = [];
  public productName1: Array<any> = [];

  public serviceTypeBox: Array<any> = [];
  public serviceTypeBox1: Array<any> = [];

  viewUser(element:any) {
    this.router.navigate([`/content/home/productservice/view/${element.serviceId}`]);
  }

  public serviceName: Array<any> = [];
  public serviceName1: Array<any> = [];
  serviceIdValue:any
  listService(data: any, params: any) {
    console.log(data, params);
    data = data.result.content.map((item:any)=>{
      item['isOpen'] = false;
      item.createdTimestamp = this.datePipe.transform(item.createdTimestamp,'mediumDate')
      return item;
    });
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //  this.dataSource.filterPredicate =
    //    (data: any, filtersJson: string) => {
    //      const matchFilter: any = [];
    //      const filters = JSON.parse(filtersJson);

    //      filters.forEach((filter: any) => {
    //        const val = data[filter.id] === null ? '' : data[filter.id];
    //        matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
    //      });
    //     return matchFilter.every(Boolean);
    //    };

    data = data.map((item: any) => {
      item.createdTimestamp = this.datePipe.transform(item.createdTimestamp, 'mediumDate')
      this.productName1.push(item.productName);
      this.serviceTypeBox1.push(item.serviceType);
      this.serviceName1.push(item.serviceGroup);
      return item;
    });

    this.productName = this.productName1;
    console.log("after", this.productName);
    this.serviceTypeBox = this.serviceTypeBox1;
    console.log("after", this.productName);
    this.serviceName = this.serviceName1;
    console.log("afterServiceType", this.serviceName);
    // this.commonApiCall(
    //   `${this.apiService.apiList.serviceManagement.statusList}`,
    //   "getMethod",
    //   {},
    //   "statusList",
    //   {},
    //   false
    // );

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // applyFilter1(event: Event) {
  //   console.log(event);
  //   const tableFilters = [];
  //   if (event == undefined) {
  //     this.dataSource.filter = "";
  //     return
  //   }
  //   tableFilters.push({
  //     id: 'serviceType',
  //     value: event
  //   });
  //   this.dataSource.filter = JSON.stringify(tableFilters);
  // }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // applyFilter2(event: Event) {
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
  //     id: 'serviceGroup',
  //     value: event
  //   });
  //   this.dataSource.filter = JSON.stringify(tableFilters);
  // }

  // statusList(data:any){
  //   console.log(data);
  //   this.statusItems = data;
  // }

  // getStatus(element:any){
  //   let status = this.statusItems.find((item)=>item.statusCode == element.serviceStatus).statusName;
  //   return status;
  // }

  getNestedRowStatus(element:any){
    let status = this.statusItems.find((item)=>item.statusCode == element.apiStatus).statusName;
    return status;
  }

  public panelOpenState = false;
  expandData(row:any){
      this.dataSource.filteredData.map((x: any)=>{
        if(x.serviceId == row.serviceId) {
          x.isOpen = !x.isOpen;
        } else {
          x.isOpen = false;
       }
      })
    if(row.nestedRows && row.nestedRows.length >0){
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

  displayServices(data: any, params: any){
    params.nestedRows = data.map((item:any)=>{
      item.createdTimestamp = this.datePipe.transform(item.createdTimestamp,'mediumDate')
      return item;
    });
  }

  getCellStyle(element:any,nav:any,cellName:any){
    let width = this.allServiceTable._document.querySelector(`.mat-column-${cellName}`).getBoundingClientRect().width;
    if(cellName === 'serviceGroup') {
      width = width - 24;
    }
    width +="px";
    return {width,padding:"0.75rem 0rem"};
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
  

  // viewPerformanceService(selectedItem:any) {
  //   this.router.navigate([`/content/home/performance-services/view/${selectedItem.serviceDetailsId}`],{
  //     queryParams: { serviceId:selectedItem.serviceId },
  //   });
  // }
  // subscribedValues!:any;
  subscriberEvent(data:any){
    let payload = {
      userId:localStorage.getItem('userId'),
      serviceId:data.serviceId,
      serviceDetailsId:data.serviceDetailsId,
      userName:localStorage.getItem('userName')
    }
    console.log(payload)
    this.commonApiCall(
      `${this.apiService.apiList.subscriberService.save}`,
      "postMethod",
       payload,
      "subscribed",
      {},
      false
    );
  }

  subscribed(data:any){
    this.toastr.success(data.message,"Success");
    window.location.reload();  
  }

}
