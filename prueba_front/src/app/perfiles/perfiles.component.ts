import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserModel } from '../models/user.model';
import { ApiService } from '../services/api.service';
import { NgForm } from '@angular/forms';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import { ChartOptions } from 'highcharts';

HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);
const PROHIBIDA = 'DOUBLEVPARTNERS';//“doublevpartners”.

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent implements OnInit,AfterViewInit {
  public users?:UserModel[] = [];
  public username?:any;
  follow?:string;

  errorMessage: string = '';
  showError: boolean = false;

  Highcharts = Highcharts;
  chartOptions={};
  
  constructor(private apiService: ApiService,) {}
  
  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
    /*setTimeout(()=>{
      this.barras();
    },1500) */
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
    this.apiService.getUsers(this.username)
    .subscribe({
       next:(resp:any)=>{    
        if(!resp){
          this.users = [];
          return;
        }
        this.users = resp.slice(0, 10);
         setTimeout(()=>{
            this.barras();
          },1500) 
        //this.barras();
       },error:(e?:any)=>{         
          console.log(e);
       },complete(){
       },
     });
 }


   // Validador de longitud mínima
   onSubmit(form: NgForm): void {
       if(this.username.length < 4 ){                
        this.showError = true;
        this.errorMessage = 'El tamaño del texto de busqueda debe ser mínimo 4 caracteres'
        return;
      }
      if (this.username.toUpperCase() === PROHIBIDA || this.username === 'doublev') {
        this.showError = true;
        this.errorMessage = `La palabra ${PROHIBIDA} esta vetada`;
        return;
      }
      this.showError = false;
      this.errorMessage = '';
      this.getUsuarios();
  }

  closeError(): void {
    this.showError = false;
  }



    private barras() {
     // if(this.users && this.users.length > 0) {
        let logins = this.users?.map((d) => d.login);
        let seguidores = this.users?.map((d) => d.followers);
        console.info(this.users);
          this.chartOptions = Highcharts.chart('chart-column2' as any, {
            chart: {
              type: 'column',
            },
            title: {
              text: 'Número de seguidores por usuario',
            },
            xAxis: {
              categories: logins,
            },
            yAxis: {
              title: {
                text: 'Número de seguidores',
              },
            },
            series: [ {
              name: 'Seguidores',
              data: seguidores,
            },
          ],
        } as any);
    //}
  return;
  }



}

