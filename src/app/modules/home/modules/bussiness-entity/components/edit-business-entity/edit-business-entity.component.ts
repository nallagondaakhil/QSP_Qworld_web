import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@app/shared/service/api.service';
import { HttpService } from '@app/shared/service/http.service';
import { StateService } from '@app/shared/service/state.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-business-entity',
  templateUrl: './edit-business-entity.component.html',
  styleUrls: ['./edit-business-entity.component.scss']
})
export class EditBusinessEntityComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private apiService: ApiService,
    private stateService: StateService,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute) {
    this.buildForm();
  }

  editBusinessEntityForm!: FormGroup
  selectUser!: any;
  userList = [];
  userId!: any;
  businessEntity!: any;
  businessEntityId!: any;

  ngOnInit(): void {
    this.businessEntityId = this.activatedRoute.snapshot.paramMap.get('id');
    this.commonApiCall(
      `${this.apiService.apiList.businessEntity.getList}/${this.businessEntityId}`,
      "getMethod",
      {},
      "getDetails",
      {},
      false
    );

  }
  getDetails(data:any){
    // console.log(data)
    this.businessEntity = data;
    console.log(this.businessEntity)
    const { businessName, userName, businessStatus,userEmailId } = this.businessEntity;
    this.selectUser = this.userList.find((item: any) => item.userId == this.userId);
    this.editBusinessEntityForm.setValue({
      businessEntityName: businessName,
      businessEntityAdmin: userName,
      businessEntityAdminEmail: userEmailId,
      isActive: businessStatus === 1 ? "Y" : "N"
    })
  }

  dataSubmitted(data: any) {
    // this.editBusinessEntityForm.reset();
    this.toastr.success(data.message, "Success");
    this.router.navigate(['/content/home/business-entity']);   
  }
  discardButton(){
    this.router.navigate(['/content/home/business-entity']);   
  }
  submitBusinessEntityData() {
    let { businessEntityName } = this.editBusinessEntityForm.value
    let payload = {
      businessName: businessEntityName,
      userId: this.businessEntity.userId,
      userName: this.businessEntity.userName,
      businessEntityId: this.businessEntity.businessEntityId,
      businessEntityMapId: this.businessEntity.businessMapId,
      status: this.businessEntity.businessStatus,

    }
    console.log(this.editBusinessEntityForm.value);
    console.log(payload)
    this.commonApiCall(
      `${this.apiService.apiList.businessEntity.update}`,
      "putMethod",
      payload,
      "dataSubmitted",
      {},
      false
    );
  }

  get f() {
    return this.editBusinessEntityForm.controls;
  }

  selectUserAdmin(event: any) {
    this.selectUser = { ...event };
    // this.f.businessEntityAdminEmail.setValue(event.userEmailId);
  }


  buildForm() {
    this.editBusinessEntityForm = this.formBuilder.group({
      businessEntityName: ["", Validators.required],
      businessEntityAdmin: ["", Validators.required],
      businessEntityAdminEmail: [{ value: "", disabled: true }, Validators.required],
      isActive: ["Y"]
    });
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
          this.toastr.error("err.error.error", "Error");
          // this.stateService.showMessage({
          //   type: "message",
          //   message: [err.error.error],
          // });
        }
        this.stateService.removeCalledApi(apiUrl);
      },
      () => {
        this.stateService.removeCalledApi(apiUrl);
      }
    );
  }

  navigateBack() {
    this.router.navigate(["content/home/business-entity"]);
  }
}
