import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {

  username: any;

  user = new UserModel();

  constructor(private route: ActivatedRoute, private apiService: ApiService,) {}

  ngOnInit(): void {
    // Recibir el usuario del router
    this.username = this.route.snapshot.paramMap.get('login');
    this.getUsuario();
  }

  public getUsuario(){

    const promise = this.apiService.getUser(this.username);
    promise.then((res: any) => {
      this.user = res;
    });
  }

}
