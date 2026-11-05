import { Component, inject, resource, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";

// 1. Importa el SERVICIO con un alias (as CountryService) para evitar conflictos
import { CountryService } from '../../services/country';
import { firstValueFrom, map, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
})

export class ByCapitalPage {

  countryService = inject(CountryService);
  query = signal('');

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);

      // 2. Agregamos .pipe() al llamado del servicio
      return this.countryService.searchByCapital(params.query).pipe(
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
        this.countryService.searchByCapital(params.query)
      );
 
      // Si no hay resultados, lanzamos un error para activar countryResource.error()
      if (countries.length === 0) {
        throw new Error(`No se encontró nada con "${params.query}"`);
      }
 
      return countries;
    },
  }); */





  /* isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<Country[]>([]);
 
  onSearch(query: string) {
    if (this.isLoading()) return;
 
    this.isLoading.set(true);
    this.isError.set(null);
 
    this.countryService.searchByCapital(query)
      .subscribe({
        next: (countries) => {
          this.isLoading.set(false);
          
          // Evaluamos si la API devolvió resultados
          if (countries.length > 0) {
            this.countries.set(countries);
            this.isError.set(null); // Todo bien, limpiamos errores
          } else {
            // La petición fue exitosa, pero no hay países que coincidan
            this.countries.set([]);
            this.isError.set(`No se encontró un país con la capital "${query}"`);
          }
        },
        error: (err) => {
          // Este bloque ahora solo se ejecutará si hay problemas de red o caída del servidor
          this.isLoading.set(false);
          this.countries.set([]);
          this.isError.set(`Hubo un error de conexión al buscar "${query}"`);
        },
      });
  } */
}
