import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  nombre = 'unknow';
  constructor(private localStorageService: LocalStorageService, private router: Router){
    this.nombre = localStorageService.getItem("nombre")
  }
  private breakpointObserver = inject(BreakpointObserver);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Web)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  cerrarSesion() { 
    this.localStorageService.setItem('isLoggedIn', false);
    this.localStorageService.setItem('isRegistered', false);
    this.router.navigate(['/']);
    location.reload();
  }
}
