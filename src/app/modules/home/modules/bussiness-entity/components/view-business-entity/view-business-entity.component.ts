import { DatePipe } from '@angular/common';
import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@app/shared/service/api.service';
import { HttpService } from '@app/shared/service/http.service';
import { StateService } from '@app/shared/service/state.service';
import {MatTableDataSource} from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-view-business-entity',
  templateUrl: './view-business-entity.component.html',
  styleUrls: ['./view-business-entity.component.scss']
})
export class ViewBusinessEntityComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router:Router,
    private httpService: HttpService,
    private apiService: ApiService,
    private stateService: StateService,
    private datePipe:DatePipe) { }

  ngOnInit(): void {
    this.commonApiCall(
      `${this.apiService.apiList.businessEntity.list}`,
      "getMethod",
      {},
      "listBusinessEntity",
      {},
      false
    );
  }
  businessStatus = [ "Active" , "Inactive" ];
  types = [
    { label: "Platform Developer" },
    { label: "Platform Developer" },
    { label: "Platform Developer" },
    { label: "Platform Developer" },
  ];
  statusColors: any = {
    Active: "background: #44CC3B 0% 0% no-repeat padding-box;",
    InActive: "background: #FF4B3A 0% 0% no-repeat padding-box;"
  };
  displayedColumns: string[] = ['businessName', 'userName', 'createdTimestamp', 'businessStatus','action'];
  // dataSource = [
  //   { bussinessEntityName: 'Qpay', bussinessEntityAdmin: "Jelly Bean", createdDate: '18 Nov 2020',status:"Active"},
  //   { bussinessEntityName: 'Qpay', bussinessEntityAdmin: "Jelly Bean", createdDate: '18 Nov 2020',status:"Active"},
  //   { bussinessEntityName: 'Qpay', bussinessEntityAdmin: "Jelly Bean", createdDate: '18 Nov 2020',status:"Active"},
  //   { bussinessEntityName: 'Qpay', bussinessEntityAdmin: "Jelly Bean", createdDate: '18 Nov 2020',status:"Active"},
  //   { bussinessEntityName: 'Qpay', bussinessEntityAdmin: "Jelly Bean", createdDate: '18 Nov 2020',status:"Active"},
  //   { bussinessEntityName: 'Qpay', bussinessEntityAdmin: "Jelly Bean", createdDate: '18 Nov 2020',status:"Active"},
  // ];
  dataSource!: MatTableDataSource<any>;
  statusItems!:any;
  createBusinessEntity(){
    this.router.navigate(['/content/home/business-entity/create']);
  }
  editBusinessEntity(element:any){
    this.router.navigate([`/content/home/business-entity/edit/${element.businessEntityId}`]);
  }
  listBusinessEntity(data:any){
    // console.log(data.status,data.message,data.result)
    if(data.status = true && data.message == "Business List"){
      data = data.result.map((item:any)=>{
      item.createdTimestamp = this.datePipe.transform(item.createdTimestamp,'mediumDate')
      return item;
    });
  }
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

  // public form_model1: FormGroup = new FormGroup({
  //   Active: new FormControl(),
  //   Inactive: new FormControl(),
  // });

  public checkBoxFilter: any;
  public status1: any;
  applyFilter1(event: Event) {
   // this.checkBoxFilter = this.form_model1.value;
    this.checkBoxFilter = event;
    //console.log(this.checkBoxFilter);
    console.log(event);
    const tableFilters = [];
    // if (this.checkBoxFilter.Active == true && this.checkBoxFilter.Inactive == true) {
    //   this.dataSource.filter = "";
    //   return
    // }
    if (this.checkBoxFilter == "Active") {
      //this.status1 = "1";
      this.dataSource.filter = "";
      return
    }
    if (this.checkBoxFilter == "Inactive") {
      //this.status1 = "100000000001";
      this.status1 = "1";
    }
    tableFilters.push({
      id: 'businessName',
      value: "qpayy"
    });
    this.dataSource.filter = JSON.stringify(tableFilters);
  }


  getStatus(element:any){
    if(!element.businessStatus){
        return "";
    }
    let status = this.statusItems.find((item:any)=>item.statusCode == element.businessStatus).statusName;
    return status;
  }

  statusList(data:any){
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

}
