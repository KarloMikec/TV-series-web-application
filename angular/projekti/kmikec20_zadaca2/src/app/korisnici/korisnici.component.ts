import { Component, OnInit } from '@angular/core';
import { KorisnikService, } from '../servisi/korisnik.service';
import { Router } from '@angular/router';
import { KorisnikI } from '../servisi/KorisnikI';


@Component({
  selector: 'app-korisnici',
  templateUrl: './korisnici.component.html',
  styleUrl: './korisnici.component.css'
})
export class KorisniciComponent implements OnInit {
  userData!: string | null;
  korisnici: any = [];

  constructor(private korisnikService: KorisnikService, private router: Router) {}

  ngOnInit(){
    this.userData = localStorage.getItem('korisnik');
    if(this.userData != null){
      const korisnik = JSON.parse(this.userData) as KorisnikI;
      if(korisnik.vrsta_korisnika_id != 2){
        this.router.navigate(['/pocetna']);
        console.log("Vi niste ADMIN!");
      }
    }
    this.prikaziKorisnike();
  }

  async prikaziKorisnike(){
    this.korisnici = await this.korisnikService.dohvatiKorisnike();
  }

  obrisiKorisnika(korime: string) {
    console.log(korime);
  
    this.korisnikService.obrisiKorisnika(korime)
      .then(() => {
        this.prikaziKorisnike();
      })
      .catch((error) => {
        console.error("Došlo je do greške prilikom brisanja korisnika:", error);
      });
  }
  

}
