import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-side-nav-bar",
  templateUrl: "./side-nav-bar.component.html",
  styleUrls: ["./side-nav-bar.component.scss"],
})
export class SideNavBarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  sidebarItems = [
    {
      pageName: "Dashboard",
      imgUrl: "/assets/images/space_dashboard_black_24dp.svg",
      link: "/content/home/dashboard",
    },
    // {
    //   pageName:'Business Entity',
    //   imgUrl:'/assets/images/business_center_black_24dp.svg',
    //   link:'/content/home/bussiness-entity'
    // },
    // {
    //   pageName:'Product Management',
    //   imgUrl:'/assets/images/product.png',
    //   link:'/content/home/product-management'
    // },
    // {
    //   pageName:'User Management',
    //   imgUrl:'/assets/images/person_outline_black_24dp.svg',
    //   link:'/content/home/user-management'
    // },
    {
      pageName: "Service Management",
      imgUrl: "/assets/images/service_active.png",
      link: "/content/home/service-management",
    },
    {
      pageName: "Performance of services",
      imgUrl: "/assets/images/leadership.png",
      link: "/content/home/performance-services",
    },
    {
      pageName: "Reports",
      imgUrl: "/assets/images/report.png",
      link: "/content/home/reports",
    },
  ];

  logout(){
    localStorage.token = "";
    this.router.navigate(['/auth/login']);
  }
}
