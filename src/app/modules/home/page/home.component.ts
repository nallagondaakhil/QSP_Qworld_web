import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { Router } from '@angular/router';
import { ApiService } from '@app/shared/service/api.service';
import { environment } from '@env/environment';
import { StateService } from '@app/shared/service/state.service';
import { HttpService } from '@app/shared/service/http.service';
import {
  Router,
  ActivatedRoute,
  NavigationStart,
  NavigationEnd,
  Event as NavigationEvent,
} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // tabItems: any;
  primeMenuName: any;
  subMenuList: any;
  token:any;
  roleTypeID:any;
  menuID = '';
  active = 0;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private apiService: ApiService,
    private stateService: StateService,
    private httpService: HttpService
  ) { }

  public homeCheckMessage: any;
  public adminName: any;

  public checkPrimaryTabOperation: any;
  public checkSecondaryTabOperation: any;
  public tab: any;
  isShown:boolean = false;
  activeMenu = '';

  ngOnInit() {
    this.homeCheckMessage = localStorage.getItem('userName');
    this.adminName = localStorage.getItem('roleType');
    this.token = localStorage.getItem('token');
    this.roleTypeID = localStorage.getItem('roleTypeId');
    console.log(this.homeCheckMessage,this.adminName);

    this.commonApiCall(
      `${environment.serverUrl}/${this.apiService.apiList.menu.getPrimaryMenu}/${this.roleTypeID}`,
      "getMethod",
      {},
      "primaryMenu",
      {},
      true
    );

    // setTimeout(() => {
    //   this.primeMenuName = this.apiService.checkPrimaryTabOperation;
    //   console.log("primary menu",this.primeMenuName);
    // }, 1000);

    // setTimeout(() => {
    //   this.subMenuList = this.apiService.checkSecondaryTabOperation;
    //   console.log("secondary menu", this.subMenuList);

    //   this.router.events.subscribe((event: NavigationEvent) => {
    //     if (event instanceof NavigationEnd) {
    //       let url = event?.urlAfterRedirects || event.url;
    //       let urlSplit = url.split('?')[0];
    //       console.log(event.url);
                        
    //       if(urlSplit){
    //         this.subMenuList.map((f : any,i : any)=>{
    //           if(f.linkName == urlSplit){
    //             this.activeMenu = f.menuName;
    //             console.log("Values are ...",this.activeMenu,f.menuName)
    //           }
    //         });
    //       } 
    //     }
    //   });
    // }, 2000);
  }
  primaryMenu(data: any){
    this.primeMenuName = data;
    // console.log(this.primeMenuName)
    // console.log('menuID', localStorage);
    data.map((x: any,y:any)=>{
      if(localStorage.menuId == '' || localStorage.menuId == undefined) {
        if(x.menuId == 2) {
          localStorage.menuId = x.menuId;
          // console.log(x.menuId);
        } else if (x.menuId == 3) {
          localStorage.menuId = x.menuId;
        }
      }
    });

    if(localStorage.menuId) {
      this.commonApiCall(
       `${environment.serverUrl}/${this.apiService.apiList.menu.getSecondaryMenu}/${localStorage.menuId}/${this.roleTypeID}`,
       "getMethod",
       {},
       "secondaryMenu",
       {},
       true
     );
    }
  }

  secondaryMenu(data:any){
    let manuValue = '';
    let navigateLink = '';
    // console.log(data)
    this.subMenuList = data;
    this.subMenuList.forEach(function(item: any,index: any) {
      if(index == 0){
        manuValue = item.menuId;
        navigateLink = item.linkName;
      }
        let menuID = item.menuId;
        // console.log("menu id value...",menuID);
    })
    this.primeMenuName.map((f : any,i : any)=>{
      if(f.menuId == manuValue){
       f.linkName = navigateLink;
      }
    });
    // console.log("values are......",this.primeMenuName);

    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {
        let url = event?.urlAfterRedirects || event.url;
        let urlSplit = url.split('?')[0];
        // console.log(event.url);
                      
        if(urlSplit){
          this.subMenuList.map((f : any,i : any)=>{
            if(f.linkName == urlSplit){
              this.activeMenu = f.menuName;
              // console.log("Values are ...",this.activeMenu,f.menuName)
            }
          });
        } 
      }
    });
  }

  clickSubMenu(menuValue: any) {
    // console.log("click value...",localStorage.menuId)
    localStorage.menuId = menuValue;
    this.commonApiCall(
      `${environment.serverUrl}/${this.apiService.apiList.menu.getSecondaryMenu}/${localStorage.menuId}/${this.roleTypeID}`,
      "getMethod",
      {},
      "TabChekSecondary",
      {},
      true
    );
  }

  TabChekSecondary(data: any) {
      // this.apiService.TabSecondaryOperation(data);
      this.subMenuList = data;
      // console.log("after click data",this.subMenuList)
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

  // subTabList!: any;

  // tabItems = [
  // {
  //   name: "Dashboard",
  //   imgUrl: "/assets/images/space_dashboard_black_24dp.svg",
  //   link: "/content/home/dashboard",
  //   active: false
  // },
  // {
  //   name: "Business",
  //   imgUrl: "/assets/images/business_center_white_24dp.svg",
  //   link: "/content/home/dashboard",
  //   active: false
  // },
  // {
  //   name: "Service",
  //   imgUrl: "/assets/images/service-white.png",
  //   link: "/content/home/dashboard",
  //   active: false
  // },
  // {
  //   name: "Reports",
  //   imgUrl: "/assets/images/report.png",
  //   link: "/content/home/dashboard",
  //   active: false
  // },
  // ];

  // businessTabsList = [
  //   {
  //     name: "Business Entity",
  //     link: "/content/home/business-entity"
  //   },
  //   {
  //     name: "Product Management",
  //     link: "/content/home/product-management"
  //   },
  //   {
  //     name: "User Management",
  //     link: "/content/home/user-management"
  //   }
  // ];

  // subMenuList = [
  //   {
  //     name: "Service Management",
  //     link: "/content/home/service-management"
  //   },
  //   {
  //     name: "Subscriber Management",
  //     link: "/content/home/subscriber-management"
  //   },
  //   {
  //     name: "Performance of services",
  //     link: "/content/home/performance-services"
  //   }
  // ];

  // public BussinessPrimary: Array<any> = ['Service'];
  // public Business: Array<any> = ['Business Entity'];
  // public count: any = 0;
  // selectedTab(tab: any) {

  // this.checkPrimaryTabOperation = this.checkPrimaryTabOperation.map((item: any) => {
  //   this.BussinessPrimary.push(item.menuName);

  //   return item;
  // });
  // console.log(this.BussinessPrimary)

  // this.primeMenuName = this.primeMenuName.map((tabItem: any) => {
  //   //tabItem.active = tab.name === tabItem.name;
  //   if (this.BussinessPrimary.includes(tabItem.menuName)) {
  //     tabItem.active = tab.menuName === tabItem.menuName;
  //     return tabItem;
  //   } else {
  //     return null;
  //   }
  // });
  // this.primeMenuName = this.primeMenuName.filter((i: any) => i !== null);
  // console.log(this.primeMenuName);
  // let current = tab.menuName;
  // if (current === "business") {

  //   this.checkSecondaryTabOperation = this.checkSecondaryTabOperation.map((item: any) => {
  //     this.Business.push(item.menuName);
  //     console.log(this.Business)
  //     return item;
  //   });

  //   this.subTabList = this.checkSecondaryTabOperation.map((tab: any) => {
  //     if (this.Business.includes(tab.menuName)) {
  //       return tab;
  //     } else {
  //       return null;
  //     }
  //   });

  //   this.subTabList = this.subTabList.filter((i: any) => i !== null);
  //   console.log(this.subTabList);
  //   this.active = 0;
  //   this.router.navigate(["/content/home/business-entity"])
  // }
  // else if (current === 'service') {
  //   this.active = 0;
  //   this.subTabList = this.subMenuList.map((tab: any) => ({ ...tab }));
  //   this.subTabList[0].active = true;
  //   this.router.navigate(["/content/home/service-management"]);
  // }
  // }
  userName() {
    if (this.adminName) {
      this.isShown = !this.isShown;
    } else {
      this.isShown = false;
    }
  }
  logoutRoute() {
    localStorage.removeItem('userName')
    localStorage.removeItem('token');
    localStorage.removeItem('roleType')
    localStorage.removeItem('roleTypeId');
    localStorage.removeItem('menuId');
    localStorage.removeItem('userId');
    console.log("success")
    this.router.navigate(["/auth/login"]);
  }
  // navigate(tab: any) {
  //   this.router.navigate([tab.link]);
  // }
}


