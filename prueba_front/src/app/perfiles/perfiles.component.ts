import { Component, OnInit } from '@angular/core';
import { UserModel } from '../models/user.model';
import { ApiService } from '../services/api.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent {
  public users?:UserModel[] = [];
  public username?:any;

  errorMessage: string = '';
  showError: boolean = false;

  prohibida: string = 'DOUBLEVPARTNERS';
  
  constructor(private apiService: ApiService,) {}
  
  ngOnInit() {
  }

  score(scoreUser:any){
    console.info('hace click', scoreUser);
    this.showError = false;
    this.errorMessage = '';
    //this.apiService.setScore(35);
    this.apiService.setScore(scoreUser.score);

    if(scoreUser.score < 30 ){
      this.showError = true;
      this.errorMessage = 'El score debe ser superior o igual a 30';
    }
    
  }

  public getUsuarios(){
    this.apiService.getUsers(this.username).subscribe((res: any) => {
      this.users = res;
    });
  }

   // Validador de longitud mínima
   osubmit() {
       if(this.username.length < 4 ){                
        this.showError = true;
        this.errorMessage = 'El tamaño del texto de busqueda debe ser mínimo 4 caracteres'
        return;
      }
      if (this.username.toUpperCase() === this.prohibida || this.username === 'doublev') {
        this.showError = true;
        this.errorMessage = `La palabra ${this.prohibida} esta prohibida`;
        return;
      }
      this.showError = false;
      this.errorMessage = '';
      this.getUsuarios();
  }

  closeError(): void {
    this.showError = false;
  }
}

