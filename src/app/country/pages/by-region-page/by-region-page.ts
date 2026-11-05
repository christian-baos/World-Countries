import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountryList } from "../../components/country-list/country-list";

@Component({
  selector: 'app-by-region-page',
  imports: [CountryList],
  templateUrl: './by-region-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionPage { }
