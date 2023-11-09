import { Component, OnInit } from '@angular/core';
import { ModalServiceService } from './services/modal-service.service';
import { AuthServiceService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  constructor(public modularService: AuthServiceService) { 
    this.writeLocalStorage()
  }

  writeLocalStorage(){
    let nombre:string = "esteban"
    let persona = {
      nombre: "juan",
      edad:18
    }

    localStorage.setItem("nombre",nombre);
    localStorage.setItem("persona",JSON.stringify(persona));
  }

  getLocalStorage(){
    let nombre=localStorage.getItem("nombre");
    let persona = JSON.parse(localStorage.getItem("persona"))

    console.log(nombre),
    console.log(persona)
  }
}
