import { Component, OnInit } from '@angular/core';
import { ModalServiceService } from './services/modal-service.service';
import { LocalStorageService } from './services/local-storage-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  isLoggedIn: any;
  isRegistered: any
  constructor(private localStorageService: LocalStorageService) { 
    this.isLoggedIn = this.localStorageService.getItem('isLoggedIn');
    this.isRegistered = this.localStorageService.getItem('isRegistered');
  }

}
