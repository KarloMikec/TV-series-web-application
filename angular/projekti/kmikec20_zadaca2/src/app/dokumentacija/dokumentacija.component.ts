import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dokumentacija',
  templateUrl: './dokumentacija.component.html',
  styleUrl: './dokumentacija.component.css'
})
export class DokumentacijaComponent {
  restServis = environment.restServis;

}
