import { Component, OnInit } from '@angular/core';
import { SerijeService } from '../servisi/serije.service';
import { SerijaI } from '../servisi/Serija';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrl: './pocetna.component.css'
})

export class PocetnaComponent implements OnInit {


    constructor(private serijeService: SerijeService, private router: Router){}
    pretrazivanje: string = '';
    dohvaceneSerije = new Array<SerijaI>
    posterSerije = environment.posteriPutanja


    async onSearchChange(event: any){
      this.pretrazivanje = event.target.value;
      setTimeout(() => {
        this.prikaziSerije();
      }, 500);
    }

    async ngOnInit() {
     this.prikaziSerije();
    }

    async prikaziSerije(){
        await this.serijeService.SerijeTMDB(this.pretrazivanje).then(
          (serije)=> {
            /* for(let s of JSON.parse(serije).results){
              this.dohvaceneSerije.push(s as SerijaI);
            } */
            this.dohvaceneSerije = serije
        });
      //console.log(this.dohvaceneSerije);
    }

    prikaziDetalje(serijaID: number) {
      this.router.navigate(['/detalji-serije/' + serijaID]);
    }
}
