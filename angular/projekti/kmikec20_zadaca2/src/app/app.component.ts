import { Component } from '@angular/core';
import { KorisnikService } from './servisi/korisnik.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(public korisnikService: KorisnikService, private router: Router) {}

  Odjava() {
    this.korisnikService.prijavljen = false;
    this.korisnikService.tipKorisnika = 0;
    localStorage.removeItem("korime");
    this.router.navigate(['/prijava']);
  }
}
