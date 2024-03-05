import { Component } from '@angular/core';
import { KorisnikService } from '../servisi/korisnik.service';
import { environment } from '../../environments/environment';

declare const grecaptcha: any;

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrl: './prijava.component.css'
})
export class PrijavaComponent {
  inputKorime?: string;
  inputLozinka?: string;
  poruka?: string;

  constructor(private korisnikService: KorisnikService) {}

  prijava() {
    grecaptcha.ready(() => {
      grecaptcha
        .execute(environment.kmikec20_recaptcha.kljuc, {
          action: 'prijava',
        })
        .then(async (token: string) => {
          if(this.inputKorime != null && this.inputLozinka != null)
    {
      this.korisnikService.logirajKorisnika(this.inputKorime!, this.inputLozinka!, token).then(
        (podaci) => {
          if(podaci == null)
          {
            this.poruka = "Neuspješna prijava"
          }
          console.log(podaci)
        }
      )
    }
        });
    });
  }
}
