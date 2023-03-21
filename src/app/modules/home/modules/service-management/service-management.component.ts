import { Component, ElementRef, OnInit, Input, ViewChild, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { HttpService } from "../../../../shared/service/http.service";
import { ApiService } from "../../../../shared/service/api.service";
import { StateService } from "../../../../shared/service/state.service";
import { DatePipe } from "@angular/common";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { MatTableDataSource } from '@angular/material/table';
import { isTemplateMiddle } from "typescript";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
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
  selector: "app-service-management",
  templateUrl: "./service-management.component.html",
  styleUrls: ["./service-management.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ServiceManagementComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private readonly router: Router,
    private httpService: HttpService,
    private apiService: ApiService,
    private stateService: StateService,
    private datePipe: DatePipe,
  ) { }
  @ViewChild("allServiceTable") table: any;
  @ViewChild("allServiceTable") allServiceTable: any;
  ColumnMode = ColumnMode;
  active = 1;
  statusColors: any = {
    Active: "background: #44CC3B 0% 0% no-repeat padding-box;",
    InActive: "background: #FF4B3A 0% 0% no-repeat padding-box;",
    Pending: "background: #FDAF00 0% 0% no-repeat padding-box;",
    "On Hold": "background: #FDAF00 0% 0% no-repeat padding-box;",
  };
  activeServiceValue = "Publish";
  pendingServiceStatus = "Pending";
  activeServiceDropdown: any = {
    Published: ["Block"],
    Block: ["Unblock"],
    Unblock: ["Block"],
  };
  pendingServiceDropdown: any = {
    Pending: ["Accept", "Reject"],
    Accept: ["Pending", "Reject"],
    Reject: ["Accept", "Pending"],
  };
  //dataSource!:any;
  dataSource!: MatTableDataSource<any>;
  dataSource1!: MatTableDataSource<any>;
  // dataSource: any = [];
  // MatTableDataSource<any>
  serviceTypes = [
    { id: 1, value: "apiController", label: "API controller" },
    { id: 2, value: "dummyController", label: "dummy controller" },
  ];
  columnMapping: any = {
    "Service Group": "serviceGroup",
    "Type": "serviceType",
    "Services": "services",
    "Product": "productName",
    "# Subscribers": "subscribers",
    "Date": "createdTimestamp"

  }
  expandedElement = null;
  columns: any = [
    {
      name: "Service Group",
      prop: "serviceGroup",
      width: 100,
    },
    {
      name: "Type",
      prop: "serviceType",
      width: 100,
    },
    {
      name: "Services",
      prop: "services",
      width: 50,
    },
    {
      name: "Product",
      prop: "productName",
      width: 75,
    },
    {
      name: "# Subscribers",
      prop: "subscribers",
      width: 50,
    },
    {
      name: "Date",
      prop: "createdTimestamp",
      width: 75,
    },
  ];
  columnsToDisplay = ["serviceGroup", "serviceType", "services", "productName", "subscribers", "createdTimestamp", "status", "action"];
  columnsToDisplay1 = ["productName", "serviceName", "requesterName", "businessName", "billingCycle", "requestedDate", "status", "action"];

  groupHeader = [
    {
      name: "Pay roll group",
      prop: "serviceGroup",
      width: 50,
    },
    {
      name: "Controller",
      prop: "type",
      width: 50,
    },
    {
      name: 4,
      prop: "services",
      width: 100,
    },
    {
      name: "Q Pay",
      prop: "product",
      width: 100,
    },
    {
      name: 100,
      prop: "subscribers",
      width: 100,
    },
    {
      name: "Date",
      prop: "date",
      width: 100,
    },
  ];

  // "Controller",
  // 4,
  // "Q Pay",
  // 100,
  // "18 Nov 2021",
  // "Inactive",
  page = new Page();

  nestedRows!: any[];
  serviceName = "apiController";
  serviceType = "apiController";
  product = "apiController";

  types = [
    { label: "Platform Developer" },
    { label: "Platform Developer" },
    { label: "Platform Developer" },
    { label: "Platform Developer" },
  ];

  status = [{ label: "Active" }, { label: "Inactive" }];
  options:any = [ 
    { 
      id:1,
      name: 'Accept'
    },
    {
      id:2,
       name: 'Reject'
    }
  ];

  // options = ["Accept","Reject"];
  actionItems!: any[];
  statusItems!: any[];
  copyActionitems!: any[];
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

    this.commonApiCall(
      `${this.apiService.apiList.serviceManagement.approval}`,
      "getMethod",
      {},
      "listApproval",
      {},
      false
    );

  }

  public listData: any;
  listApproval(data: any) {
    this.listData = data;
    console.log("List Approval", this.listData);

    data = data.map((item: any) => {
      item.createdTimestamp = this.datePipe.transform(item.createdTimestamp, 'mediumDate')
      return item;
    });
    this.dataSource1 = new MatTableDataSource(data);
    console.log(this.dataSource1);
  }

  actionList(data: any) {
    console.log(data);
    this.actionItems = data;
    this.copyActionitems = JSON.parse(JSON.stringify(this.actionItems));

    // this.activeServiceStatus = this.actionItems.find((item:any)=>item.actionName == this.serviceDetails.action).actionName;
    // this.actionItems = this.actionItems.filter((item:any)=>item.actionName !== this.serviceDetails.action)
  }

  statusList(data: any) {
    console.log(data);
    this.statusItems = data;
  }

  getStatus(element: any) {
    let status = this.statusItems.find((item) => item.statusCode == element.serviceStatus).statusName;
    return status;
  }

  getNestedRowStatus(element: any) {
    let status = this.statusItems.find((item) => item.statusCode == element.apiStatus).statusName;
    return status;
  }

  public productName: Array<any> = [];
  public productName1: Array<any> = [];

  public serviceTypeBox: Array<any> = [];
  public serviceTypeBox1: Array<any> = [];

  public serviceNamee: Array<any> = [];
  public serviceNamee1: Array<any> = [];
  listService(data: any, params: any) {
    console.log(data, params);
    if (data.status = true && data.message == "ServiceView List") {
      data = data.result.content.map((item: any) => {
        item['isOpen'] = false;
        item.createdTimestamp = this.datePipe.transform(item.createdTimestamp, 'mediumDate')
        return item;
      });
    }
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

    data = data.map((item: any) => {
      item.createdTimestamp = this.datePipe.transform(item.createdTimestamp, 'mediumDate')
      this.productName1.push(item.productName);
      this.serviceTypeBox1.push(item.serviceType);
      this.serviceNamee1.push(item.serviceGroup);
      return item;
    });

    this.productName = this.productName1;
    console.log("after", this.productName);
    this.serviceTypeBox = this.serviceTypeBox1;
    console.log("after", this.productName);
    this.serviceNamee = this.serviceNamee1;
    console.log("afterServiceType", this.serviceNamee);
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

  displayServices(data: any, params: any) {
    params.nestedRows = data.map((item: any) => {
      item.createdTimestamp = this.datePipe.transform(item.createdTimestamp, 'mediumDate')
      item.actionItems = this.actionItems.map((status: any) => ({ ...status })).filter((status: any) => status.actionName !== item.action);
      return item;
    });
  }

  getCellStyle(element: any, nav: any, cellName: any) {
    let width = nav._document.querySelector(`.mat-column-${cellName}`).getBoundingClientRect().width;
    if (cellName === 'serviceGroup') {
      width = width - 24;
    }
    width += "px";
    return { width, padding: "0.75rem 0rem" };
  }

  public panelOpenState = false;
  expandData(row: any) {
    // console.log(this.dataSource);
    this.dataSource.filteredData.map((x: any) => {
      // console.log(row.isOpen);
      // console.log(x.isOpen);
      if (x.serviceId == row.serviceId) {
        x.isOpen = !x.isOpen;
      } else {
        x.isOpen = false;
      }
      // console.log(x);
    })
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

  viewServiceManagement(selectedItem: any) {
    this.router.navigate([`/content/home/service-management/view/${selectedItem.serviceDetailsId}`], {
      queryParams: { serviceId: selectedItem.serviceId },
    });
  }

  viewApproval(data: any) {
    this.router.navigate([`/content/home/service-management/view-approval/${data.serviceId}`]);
  }

  viewPendingServiceManagement(status: string) {
    this.router.navigate(["/content/home/service-management/view/1"], {
      queryParams: { status },
    });
  }

  editServiceManagement(selectedItem: any) {
    this.router.navigate([`/content/home/service-management/edit/${selectedItem.serviceId}`], {
      queryParams: { serviceDetailsId: selectedItem.serviceDetailsId },
    });
  }

  toggleExpandGroup(group: any) {
    console.log("Toggled Expand Group!", group);
    this.table.groupHeader.toggleExpandGroup(group);
  }

  onDetailToggle(event: any) {
    console.log("Detail Toggled", event);
  }

  selectActiveServiceStatus(item: string) {
    this.activeServiceValue = item;
  }

  selectPendingServiceStatus(item: string) {
    this.pendingServiceStatus = item;
  }

  setPage(page: Page) { }

  createServiceManagement() {
    this.router.navigate(["/content/home/service-management/create"]);
  }

  onResize(event: any) {
    this.columns.find((col: any) => col.name == event.column.name).width =
      event.newValue;
  }

  getWidth(rowName: any, group?: any) {
    // let val =
    //   this.columns?.find((col: any) => col.prop == rowName).width + "px";
    console.log(group)
    let width = this.table?.headerComponent?._columns.find((col: any) => col.prop === rowName).width + "px";
    return { width, padding: "0.75rem" };
  }

  getGroupData(group: any) {
    const value = group.value[0]
    let groupData = [{
      name: value.serviceGroup,
      prop: 'serviceGroup'
    },
    {
      name: value.serviceType,
      prop: 'serviceType'
    },
    {
      name: value.services,
      prop: 'services'
    },
    {
      name: value.productName,
      prop: 'productName'
    },
    {
      name: value.subscribers,
      prop: 'subscribers'
    },
    {
      name: value.createdTimestamp,
      prop: 'createdTimestamp'
    }];
    return groupData;
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
      window.location.reload();
    }

    actionRejected(){
      window.location.reload();
    }
}