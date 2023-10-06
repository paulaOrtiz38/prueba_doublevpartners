import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil/perfil.component';
import { PerfilesComponent } from './perfiles/perfiles.component';
import {Routes, RouterModule} from '@angular/router';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { ScoreGuard } from './score.guard';
import { ApiService } from './services/api.service';

const routes: Routes = [
  // Otras rutas pueden estar presentes aquí
  { path: '', component: PerfilesComponent },
  { path: 'perfil/:login', component: PerfilComponent,canActivate: [ScoreGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    PerfilComponent,
    PerfilesComponent,
    ErrorMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [ScoreGuard,ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
