import { Injectable } from "@angular/core";

const apiData = {
  menu:{
    listPrimaryMenu:"api/common/menu/listPrimaryMenu",
    listSecondaryMenu:"api/common/menu/listSecondaryMenu",
    getPrimaryMenu:"api/common/menu/getPrimaryMenu",
    getSecondaryMenu:"api/common/menu/getSecondaryMenu",
  },
  serviceManagement: {
    servicegroup: "transaction/servicegroup/list",
    services:"transaction/servicedetails/getservices",
    servicesDetails:"transaction/servicedetails/getservicedetails",
    actionList:"common/action/list",
    statusList:"common/status/list",
    subscribers: "transaction/performance/getSubscribers",
    hitDetails:"transaction/performance/getHitDetails",
    dateDetails:"transaction/performance/getDateDetails",
    downloadAPIlogs:"/transaction/performance/getLogDetails",
    saveGeneral:"transaction/servicegroup/save",
    saveTechnical:"transaction/servicedetails/save",
    editGeneral:"transaction/servicegroup/update",
    editTechnical:"transaction/servicedetails/update",
    approval:"transaction/subscriber/listapprovals",
    actionAccepted:"transaction/subscriber/approvalaction",
    actionRejected:"transaction/subscriber/approvalreject"
  },
  businessEntity:{
    list:"transaction/businessentity/list",
    getList:"transaction/businessentity/get",
    save:"transaction/businessentity/save",
    delete:"transaction/businessentity/delete",
    update:"transaction/businessentity/update",
    businessList:"transaction/businessentity/list"
  },
  productManagement:{
    list:"transaction/product/list",
    getProduct:"transaction/product/get",
    save:"transaction/product/save",
    delete:"transaction/product/delete/",
    update:"/transaction/product/update"

  },
  userManagement:{
    list:"user/list",
    save:"user/save",
    delete:"user/delete/",
    roleList:"user/role/list",
    update:"user/update",
    get:"user/get/",
    userList:"transaction/userview/list",
  },
  subscriberManagement:{
    adminlist:"transaction/subscriberadmin/list",
  },
  subscriberService:{
    subscriberDetails:"transaction/subscriber/getsubscribers",
    unSubscribe:"transaction/subscriber/unsubscribe",
    save:"transaction/subscriber/save"
  },
  common: {
    logout: "logout",
    login: "api/user/authenticate",
  },
};

@Injectable({
  providedIn: "root",
})
export class ApiService {
  apiList = apiData;
  key = "NQRRP8EQHJ3axutnyg4Gr6uB4udmBNed";
  iv = "S4S8KKbgCp5VZgJZ";
  constructor() {}

  public checkMessage:any;
  sendMessage(message: any) {
    console.log(message);
    this.checkMessage=message;
   }

   public checkPrimaryTabOperation:any;
   TabPrimaryOperation(message: any) {
    console.log(message);
    this.checkPrimaryTabOperation=message;
   }

   public checkSecondaryTabOperation:any;
   TabSecondaryOperation(message: any) {
    console.log(message);
    this.checkSecondaryTabOperation=message;
   }
   

  //   encode(data: any): any {
  //     try {
  //       return CryptoJS.enc.Base64.stringify(
  //         CryptoJS.AES.encrypt(
  //           JSON.stringify(data),
  //           CryptoJS.enc.Utf8.parse(this.key),
  //           {
  //             iv: CryptoJS.enc.Utf8.parse(this.iv),
  //             mode: CryptoJS.mode.CBC,
  //             padding: CryptoJS.pad.Pkcs7,
  //           }
  //         ).ciphertext
  //       );
  //     } catch {
  //       return null;
  //     }
  //   }

  //   request(data: string) {
  //     return { data: this.encode(data) };
  //   }

  //   decode(data: any): any {
  //     try {
  //       return JSON.parse(
  //         CryptoJS.AES.decrypt(data.response, CryptoJS.enc.Utf8.parse(this.key), {
  //           iv: CryptoJS.enc.Utf8.parse(this.iv),
  //           mode: CryptoJS.mode.CBC,
  //           padding: CryptoJS.pad.Pkcs7,
  //         }).toString(CryptoJS.enc.Utf8)
  //       );
  //     } catch {
  //       return null;
  //     }
  //   }
}
