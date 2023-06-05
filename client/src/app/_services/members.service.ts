import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { map, of } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { UserParams,  } from '../_models/userParams';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  //I should use environment here but im using hard code here
  //baseUrl=environment.apiUrl;

  baseUrl = "http://localhost:5001/api/";
  //to store the state of members
  members: Member[] = [];


  constructor(private http: HttpClient) { }

  getMembers(userParams: UserParams) {
    //httpparams is class given by angular to set query string parameters with http
    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);



    //this is for storing state
    // if(this.members.length>0) return of(this.members);
    return this.getPaginatedResult<Member[]>(this.baseUrl+'users', params)

    //we also need to send token with this. so we use gethttpoptions


  }

  private getPaginatedResult<T>(url: string, params: HttpParams) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>;
    return this.http.get<T>(this.baseUrl + 'users', { observe: 'response', params }).pipe(
      map(response => {
        if (response.body) {
          paginatedResult.result = response.body;
        }

        const pagination = response.headers.get('Pagination');
        if (pagination) {
          paginatedResult.pagination = JSON.parse(pagination);
        }
        return paginatedResult;
      })
    );
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();


      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);
    return params;
  }

  getMember(username: string) {
    // this is for storing state
    const member = this.members.find(x=>x.userName === username);
    //of operator creates an observable that emits a single value and completes
    if(member) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/'+ username)
  }

  //I have made a interceptor for tokens so that i dont have to do send again and again


  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() =>{
        const index = this.members.indexOf(member);
        //spread operator takes all of elements inside the members
        this.members[index] = {...this.members[index], ...member}
      })
    )
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);

}
}