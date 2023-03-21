import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getMethod(url: string, isFullUrl = false): Observable<any> {
    console.log(url, isFullUrl);
    return this.http.get(
      isFullUrl ? url : `${environment.serverUrl}/${environment.version}/${url}`
    );
  }

  postMethod(url: string, isFullUrl = false, data: any = {}): Observable<any> {
    return this.http.post(
      isFullUrl
        ? url
        : `${environment.serverUrl}/${environment.version}/${url}`,
      data
    );
  }

  
  putMethod(url: string, isFullUrl = false, data: any = {}): Observable<any> {
    return this.http.put(
      isFullUrl
        ? url
        : `${environment.serverUrl}/${environment.version}/${url}`,
      data
    );
  }

  postFileMethod(url: string, data: any): Observable<any> {
    let headers = new HttpHeaders();
    // headers.set("Content-Type", null);
    headers.set("Accept", "multipart/form-data");
    return this.http.post(
      `${environment.serverUrl}/${environment.version}/${url}`,
      data,
      {
        headers,
      }
    );
  }

  download(url:string,isFullUrl = false):Observable<any>{
    let downloadUrl =  isFullUrl ? url : `${environment.serverUrl}/${environment.version}/${url}`
    return this.http.get(downloadUrl,{responseType: 'blob'});
  }
}
