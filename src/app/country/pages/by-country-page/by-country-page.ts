import { Component, inject, resource, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country';

import { firstValueFrom, map, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-by-country',
  imports: [SearchInput, CountryList],
  templateUrl: './by-country-page.html',

})
export class ByCountryPage {

  countryService = inject(CountryService);
  query = signal('');


  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);

      // 2. Agregamos .pipe() al llamado del servicio
      return this.countryService.searchByCountry(params.query).pipe(
        map(countries => {
          // 3. Validamos si el arreglo viene vacío
          if (countries.length === 0) {
            // Lanzamos el error para que la señal countryResource.error() se active en el HTML
            throw new Error(`No se encontró un país con la capital "${params.query}"`);
          }

          return countries;
        })
      );
    }
  });

  /* countryResource = resource({
    params: () => ({ query: this.query() }),
    loader: async ({ params }) => {
      if (!params.query) return [];

      const countries = await firstValueFrom(
        this.countryService.searchByCountry(params.query)
      );

      // Si no hay resultados, lanzamos un error para activar countryResource.error()
      if (countries.length === 0) {
        throw new Error(`No se encontró nada con "${params.query}"`);
      }

      return countries;
    },
  }); */

}
