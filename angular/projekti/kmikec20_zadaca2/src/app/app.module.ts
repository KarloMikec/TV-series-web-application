import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PrijavaComponent } from './prijava/prijava.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { ProfilComponent } from './profil/profil.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { KorisniciComponent } from './korisnici/korisnici.component';
import { DetaljiSerijeComponent } from './detalji-serije/detalji-serije.component';
import { DokumentacijaComponent } from './dokumentacija/dokumentacija.component';

const routes: Routes = [
  { path: 'prijava', component: PrijavaComponent },
  { path: 'registracija', component: RegistracijaComponent},
  { path: 'profil', component: ProfilComponent},
  { path: '', component: PocetnaComponent},
  { path: 'korisnici', component: KorisniciComponent},
  { path: 'detalji-serije/:idSerije', component: DetaljiSerijeComponent},
  { path: 'dokumentacija', component: DokumentacijaComponent},
  { path: '', redirectTo: 'popis', pathMatch: 'full' },
];

@NgModule({
  declarations: [AppComponent, PrijavaComponent, RegistracijaComponent, ProfilComponent, PocetnaComponent, KorisniciComponent, DetaljiSerijeComponent, DokumentacijaComponent],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
