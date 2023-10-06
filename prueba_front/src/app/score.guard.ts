import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ScoreGuard implements CanActivate {

  constructor(private router: Router, private scoreService: ApiService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      const userScore: number = this.scoreService.getScore();
      console.info('guard ',userScore);
      if (userScore >= 30.0) {
        return true; 
      } else {
       
        this.router.navigate(['/']);
        return false; 
      }
  }
  
}
