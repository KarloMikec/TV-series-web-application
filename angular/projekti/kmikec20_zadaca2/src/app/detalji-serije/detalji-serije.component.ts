import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SerijeService } from '../servisi/serije.service';
import { SerijaI } from '../servisi/Serija';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-detalji-serije',
  templateUrl: './detalji-serije.component.html',
  styleUrl: './detalji-serije.component.css'
})
export class DetaljiSerijeComponent implements OnInit{
  odabranaSerija?: SerijaI;
  idSerije?: number | null;
  posterSerije = environment.posteriPutanja

  constructor(private activatedRoute: ActivatedRoute, private serijeService: SerijeService)  {}

  ngOnInit() {
    this.idSerije = Number(this.activatedRoute.snapshot.paramMap.get('idSerije'));
    console.log('this.film id ---> ' + this.idSerije);
  
    this.serijeService.odabranaSerija(this.idSerije)
      .then((odabranaSerija: any) => {
        this.odabranaSerija = odabranaSerija;
      })
      .catch((error: any) => {
        console.error('Došlo je do greške prilikom dohvatanja odabranog filma:', error);
        // Opciono: Dodajte dodatnu logiku za rukovanje greškama.
      });
  }
  
}
