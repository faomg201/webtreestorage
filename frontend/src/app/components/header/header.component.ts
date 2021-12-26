import { Component, OnInit,ViewChild } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { FormControl} from '@angular/forms'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  quantity = new FormControl('')

  sumprice = 0
  userid: any
  token: any
  constructor(public local: LocalStorageService ) { 
    this.userid = this.local.get('user').result.id
    this.token = this.local.get('user').token
    
  
  }

  ngOnInit(): void {
  }
  
}
