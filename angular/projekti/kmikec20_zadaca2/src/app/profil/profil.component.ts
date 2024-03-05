import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../servisi/korisnik.service';
import { Router } from '@angular/router';
import { KorisnikI } from '../servisi/KorisnikI';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {

  prijavljenKorisnik: KorisnikI = {};
  korime?: string | null;

  constructor(private korisniciServis: KorisnikService, private router: Router){}

  ngOnInit(): void {
    this.korime = localStorage.getItem("korime")
    this.korisniciServis.prijavljenKorisnik(this.korime!).then(
      (korisnik) => {
        if(korisnik != null) {
          this.prijavljenKorisnik = korisnik;
          this.prijavljenKorisnik!.lozinka = "";
        }
      }
    );
  }

  azurirajProfil() {
      this.korisniciServis.azurirajKorisnika(
        this.korime!,
        this.prijavljenKorisnik.ime,
        this.prijavljenKorisnik.prezime,
        this.prijavljenKorisnik.lozinka,
        this.prijavljenKorisnik.email,
        this.prijavljenKorisnik.drzava,
        this.prijavljenKorisnik.grad,
        this.prijavljenKorisnik.datum_rodjenja,
      );
  }

  odustani() {
    this.router.navigate(['/']);
  }
}
  