import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SerijeService {
  constructor() {}

  async SerijeTMDB(hint: string,){
    let odgovor = await fetch(
      `${environment.restServis}api/tmdb/serije?trazi=${hint}&stranica=1`
    );
    let sveSerije = await odgovor.text()
    let serije = JSON.parse(sveSerije).results
    return await serije;
  }

  async odabranaSerija(idSerije: number) {
    try {
      const odgovor = await fetch(`${environment.restServis}api/tmdb/serija?idSerije=` + idSerije);
  
      if (odgovor.status === 200) {
        const podaci = await odgovor.text();
        console.log('podaci ' + podaci);
        return JSON.parse(podaci);
      } else {
        throw new Error('Problem kod preuzimanja podataka:\n' + odgovor.statusText);
      }
    } catch (error: any) {
      alert(error.message);
      throw error; 
    }
  }
}
  
