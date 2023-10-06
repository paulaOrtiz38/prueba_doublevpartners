import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize, map, take } from 'rxjs';
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

  getUsers2(username:string): Observable<UserModel[]>  {
    return this.http.get(`https://api.github.com/search/users?q=${username}`).pipe(     
        map((res: any) => res.items.slice(0, 10)),
      );
  }

  getUser(username:string): Promise<any> {
    return this.http.get(`https://api.github.com/users/${username}`).toPromise();
  }

  public getseguidores( url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${url}`).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  public getUsers(username:string):Observable<UserModel>{
    return this.http.get<any>(`https://api.github.com/search/users?q=${username}`).pipe(
      finalize(()=>{
           
      }),
      map((resp: any) => {
        resp.items.map((n:any) => {
           this.getseguidores(n.followers_url).then((resp)=>n.followers = resp.length
           ).catch((error) => {
            console.error('Error fetching user:', error);
          }); 
          return n.followers;
      });
        
      return resp.items;
      })
    );
    
  }


}
