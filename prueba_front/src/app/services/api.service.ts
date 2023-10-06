import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private userScore: number = 0;
  
  constructor(private http: HttpClient) {}

  setScore(score: number): void {
    this.userScore = score;
  }

  getScore(): number {
    return this.userScore;
  }

  getUsers(username:string): Observable<UserModel[]>  {
    return this.http.get(`https://api.github.com/search/users?q=${username}`).pipe(     
        map((res: any) => res.items.slice(0, 10)),
      );
  }

  getUser(username:string): Promise<any> {
    return this.http.get(`https://api.github.com/users/${username}`).toPromise();
  }

}
