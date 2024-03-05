import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class KorisnikService {
  prijavljen: boolean = false;
  tipKorisnika?: number;



  constructor(private router: Router) {
    let korime = localStorage.getItem("korime")
    if(korime != null)
      this.prijavljen = true;
  }

  async logirajKorisnika(korime: string, lozinka: string, token: string) {
    let tijelo = {
      korime: korime,
      lozinka: lozinka,
      token: token,
    };

    let parametri = {
      method: 'POST',
      body: JSON.stringify(tijelo),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let odgovor = await fetch(`${environment.restServis}baza/korisnici/` + korime + `/prijava`, parametri);
    if (odgovor.status == 201) {
      console.log('uspjesna prijava');
      this.router.navigate(['/']);

      let podaci: any = await odgovor.text();
      podaci = JSON.parse(podaci)
      console.log('podaci ' + podaci);
      localStorage.setItem("korime", podaci.korime)

      this.prijavljen = true;
      this.tipKorisnika = podaci.vrsta_korisnika_id;

      return podaci;
    } else {
      return null;
    }
  }

  async registrirajKorisnika(
    ime: string,
    prezime: string,
    korime: string,
    email: string,
    lozinka: string,
    drzava: string,
    grad: string,
    datum: Date, 
  ){
    let tijelo = {
      ime: ime,
      prezime: prezime,
      korime: korime,
      email: email,
      lozinka: lozinka,
      drzava: drzava,
      grad: grad,
      datum_rodjenja: datum,
    };

    let parametri = {
      method: 'POST',
      body: JSON.stringify(tijelo),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let odgovor = await fetch(`${environment.restServis}registracija`, parametri);
    if (odgovor.status == 200) {
      this.router.navigate(['/prijava']);
    }
  }

  async azurirajKorisnika(
    korime: string,
    novo_ime: string | undefined,
    novo_prezime: string | undefined,
    nova_lozinka: string | undefined,
    novi_email: string | undefined,
    nova_drzava: string | undefined,
    novi_grad: string | undefined,
    novi_datum: Date | undefined,
  ){
    let tijelo = {
      korime: korime,
      ime: novo_ime,
      prezime: novo_prezime,
      lozinka: nova_lozinka,
      email: novi_email,
      drzava: nova_drzava,
      grad: novi_grad,
      datum_rodjenja: novi_datum,
    };

    let parametri = {
      method: 'PUT',
      body: JSON.stringify(tijelo),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await fetch(`${environment.restServis}baza/korisnici/` + korime, parametri);
  }

  async prijavljenKorisnik(korime: string, ){
    let odgovor = await fetch(`${environment.restServis}baza/korisnici/` + korime);
    if(odgovor.status == 200){
      let podaci = await odgovor.text();
      console.log(JSON.parse(podaci))
      return JSON.parse(podaci);
    }else{
      return null;
    }
  }

  async dohvatiKorisnike(){
    return fetch(`${environment.restServis}baza/korisnici/`).then((odgovor) => {
      if(!odgovor.ok){
        throw new Error("Statusni odgovor nije OK");
      }
      return odgovor.json();
    }).then((korisnici) => {
      console.log("Dohvaćeni korisnici:", korisnici);
      return korisnici;
    }).catch((error) =>{
      console.log("Greška prilikom dohvaćanja korisnika:", error);
      return [];
    });
  }

  async obrisiKorisnika(korime: string) {
    try {
      if (korime === "admin") {
        console.log("Admin ne može biti obrisan");
        return;
      }
  
      const parametri = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const odgovor = await fetch(`${environment.restServis}baza/korisnici/` + korime, parametri);
  
      if (odgovor.ok) {
        console.log(`Korisnik ${korime} uspešno obrisan.`);
      } else {
        console.log(`Greška prilikom brisanja korisnika. Status: ${odgovor.status}`);
      }
    } catch (error) {
      console.error("Došlo je do greške prilikom brisanja korisnika:", error);
    }
  }
  
}
