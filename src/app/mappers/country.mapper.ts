import type { Country } from "../country/interfaces/country-interface";
import type { CountryItem } from "../country/interfaces/rest-countries-interfaces";

export class CountryMapper {

    static mapRestCountryToCountry(restCountry: CountryItem): Country {
        return {
            // Extraemos la propiedad 'name' de cada objeto capital antes de unirlo con comas
            capital: restCountry.capitals ? restCountry.capitals.map(c => c.name).join(', ') : 'Sin capital',
            uuid: restCountry.uuid,
            flagEmoji: restCountry.flag.emoji,
            flagUrlSvg: restCountry.flag.url_svg,
            name: restCountry.names.translations['spa'].common ?? 'No spanish name',
            population: restCountry.population
        };
    }

    // Agregamos los corchetes [] a CountryItem para indicar que es un arreglo
    static mapRestCountryArrayToCountryArray(restCountries: CountryItem[]): Country[] {
        return restCountries.map(this.mapRestCountryToCountry);
    }
}