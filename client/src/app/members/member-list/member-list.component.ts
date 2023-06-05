import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {


// Observable<Member[]>, which means it is an observable that emits arrays of Member objects
// members$: Observable<Member[]> | undefined;
members:Member[]=[];
pagination: Pagination| undefined;
userParams: UserParams | undefined;
user: User|undefined;


constructor(private memberService: MembersService, private accountService: AccountService){
  this. accountService.currentUser$.pipe(take(1)).subscribe({
    
  })
} {

}

ngOnInit(): void{
  //getmembers return async so use obervable member.
  // this.members$ = this.memberService.getMembers();
  this.loadMembers();
}

loadMembers() {
  this.memberService.getMembers(this.pageNumber, this.pageSize).subscribe({
    next: response=>{
      if(response.result && response.pagination) {
        this.members = response.result;
        this.pagination = response.pagination;
        // this is from member service where i have set result and pagination.
      }
    }
  })
}

pageChanged(event: any){
  if(this.pageNumber!==event.page){
    this.pageNumber = event.page;
    this.loadMembers();
  }
  
}


}
