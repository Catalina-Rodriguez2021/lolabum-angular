import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  mostrarMenu: boolean = false;

  toggleMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }
  constructor() { }
}
