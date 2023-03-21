import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { tap, delay, finalize, catchError } from "rxjs/operators";
import { of, Subscription } from "rxjs";
import { StateService } from "../../../../shared/service/state.service";
import { ApiService } from "../../../../shared/service/api.service";
import { HttpService } from "../../../../shared/service/http.service";
import { environment } from "@env/environment";


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading!: boolean;
  loginForm!: FormGroup;

  private sub = new Subscription();
  menuID = '';
  roleValue: any;
  username:any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private stateService: StateService,
    private apiService: ApiService,
    private httpService: HttpService
  ) {
    this.buildForm();
  }

  ngOnInit() {


  }

  get f() {
    return this.loginForm.controls;
  }

  public checkLogin: any;
  public roleTypeID:any;
  login() {
    this.checkLogin = this.loginForm.value;
    console.log(this.checkLogin);
    this.commonApiCall(
      `${environment.loginUrl}/${this.apiService.apiList.common.login}`,
      "postMethod",
      {
        username: this.checkLogin.username,
        password: this.checkLogin.password,
      },
      "loginSubmitted",
      {},
      true
    );
  }

  // TabChekPrimary(data:any){
  //   this.apiService.TabPrimaryOperation(data);
  //   // data.forEach(function(item: any) {
  //   //   let roleValue = item.roleTypeId;
  //   //   let roleName = item.roleTypeName;
  //   //   localStorage.roleTypeId = roleValue;
  //   //   localStorage.roleType = roleName;
  //   //   console.log("role name...",roleName,"role id...",roleValue);
  //   // });

  //   console.log('menuID', this.menuID);
  //   data.map((x: any,y:any)=>{
  //     if(this.menuID == '') {
  //       if(x.menuId == 2) {
  //         console.log(x.menuId);
  //         this.menuID = x.menuId;
  //       } else if (x.menuId == 3) {
  //         this.menuID = x.menuId;
  //       }
  //     }
  //   });
      
  //   if(this.menuID) {
  //     setTimeout(() => {
  //       this.commonApiCall(
  //         `${environment.serverUrl}/${this.apiService.apiList.menu.getSecondaryMenu}/${this.menuID}/${this.roleTypeID}`,
  //         "getMethod",
  //         {
  //           // menuId: this.menuID,
  //           // roleTypeId: this.roleTypeID,
  //         },
  //         "TabChekSecondary",
  //         {},
  //         true
  //       );
  //     }, 60);
  //   }
  // }

  // TabChekSecondary(data:any){
  //   this.apiService.TabSecondaryOperation(data);
  //   data.forEach(function(item: any) {
  //     let menuID = item.menuId;
  //     console.log("menu id value...",menuID);
  //   })
  // }

  public capturedLoginValues:any;
  loginSubmitted(data: any) {
    this.apiService.sendMessage(data);
    this.capturedLoginValues = data;
    this.roleTypeID=data.roles[0].roleTypeId;
    let roleType=data.roles[0].roleType;
    let userName = data.username;
    let userId = data.userid;
    // this.menuID = data.menus['menuId'];
    // console.log(this.menuID)
    localStorage.userId = userId;
    localStorage.userName = userName;
    localStorage.token = data.token;
    localStorage.roleTypeId = this.roleTypeID;
    localStorage.roleType = roleType;
    // localStorage.menuId = this.menuID
      // this.commonApiCall(
      //   `${environment.serverUrl}/${this.apiService.apiList.menu.getPrimaryMenu}/${this.roleTypeID}`,
      //   "getMethod",
      //   {
      //     // roleTypeId: this.roleTypeID,
      //   },
      //   "TabChekPrimary",
      //   {},
      //   true
      //   );

        if(this.roleTypeID == "1"){
          this.router.navigate(['/content/home/business-entity']);        
        }else if(this.roleTypeID == "2" || this.roleTypeID == "3" || this.roleTypeID == "5"){
          this.router.navigate(['/content/home/service-management']);        
        }else if(this.roleTypeID == "4"){
          this.router.navigate(['/content/home/productservice']);   
        }else if(this.roleTypeID == "6"){
          this.router.navigate(['/content/home/product-management']);   
        }
  }

  commonApiCall(
    apiUrl: string,
    method: string,
    payload?: any,
    callback?: string,
    extraParams?: any,
    isFullUrl: boolean = false
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

  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
