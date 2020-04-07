import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PollsService {

  constructor(private http: HttpClient) { }

  public apiEndPoint = `https://hn.algolia.com/api/v1/search_by_date?tags=story`;
  public getPollsList() {
    return this.http.get(`${this.apiEndPoint}`).pipe(catchError(this.handleError));

  }

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent ) {
      console.error("Something went wrong");
    }
    else {
      console.log("Back end returend error" + error.status);
    }
    return throwError("Something bad happened..."); 
    
  }
}
