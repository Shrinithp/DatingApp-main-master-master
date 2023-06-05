import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Member } from 'src/app/_models/member';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit{
  //passing to child component
  //member passed as an input property comes a little later so we can
  //give it as undefined.
  @Input() member: Member | undefined;

  
  constructor(){}

  ngOnInit(): void {
  }
  

}
