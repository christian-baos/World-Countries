import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries-interfaces';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { CountryMapper } from '../../mappers/country.mapper';

// 1. Importa la interfaz asignándole un alias (ej: CountryInterface)
import type { Country } from '../interfaces/country-interface';

const API_URL = 'https://api.restcountries.com/countries/v5';
const API_KEY = 'rc_live_97012876519149268a42ae756435b7c3';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);


  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry>(`${API_URL}/capitals?q=${query}&api-key=${API_KEY}`)
      .pipe(
        map(response => CountryMapper.mapRestCountryArrayToCountryArray(response.data.objects)),
        catchError(error => {
          console.log('Error fetching', error);

          return throwError(() => new Error('No se pudo obtener paises con ese query'));

        })
      );
  }
  searchByCountry(query: string): Observable<Country[]> {
  query = query.toLowerCase();

  return this.http.get<RESTCountry>(`${API_URL}?q=${query}&api-key=${API_KEY}`)
    .pipe(
      map (response => CountryMapper.mapRestCountryArrayToCountryArray(response.data.objects)),
      delay(2000),
      catchError(error => {
        console.log('Error fetching', error);
        return throwError(() => new Error('No se pudo obtener países con ese query'));
      })
    );
}
}
