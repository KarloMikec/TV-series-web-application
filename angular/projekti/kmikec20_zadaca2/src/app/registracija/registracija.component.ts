import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../servisi/korisnik.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrl: './registracija.component.css'
})

export class RegistracijaComponent {
ime?: string;
prezime?: string;
korime?: string;
email?: string;
lozinka?: string;
drzava?: string;
grad?: string;
datum?: Date;

constructor(private korisnikService: KorisnikService, private router: Router) {}

registracija(){
  this.korisnikService.registrirajKorisnika(
    this.ime!,
    this.prezime!,
    this.korime!,
    this.email!,
    this.lozinka!,
    this.drzava!,
    this.grad!,
    this.datum!
  );
}

odustani(){
  this.router.navigate(['']);
}
}
