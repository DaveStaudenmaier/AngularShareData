import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { DataShareService, INationalParks } from './../../../core/services/data-share.service';

@Component({
  selector: 'app-parks',
  templateUrl: './parks.component.html',
  styleUrls: ['./parks.component.scss']
})
export class ParksComponent implements OnInit {
  // Get data passed from the parent component
  @Input() search: string;
  @Input() useQueryParams: boolean;

  // Small demo subset of national parks
  nationalParks: Array<INationalParks> = [
    {name: 'Acadia', state: 'Maine', established: 'February 26, 1919', area: '49,076.63 acres', visitors: '3,437,286'},
    {name: 'American Samoa', state: 'American Samoa', established: 'October 31, 1988', area: '8,256.67 acres', visitors: '60,006'},
    {name: 'Arches', state: 'Utah', established: 'November 12, 1971', area: '76,678.98 acres', visitors: '1,659,702'},
    {name: 'Badlands', state: 'South Dakota', established: 'November 10, 1978', area: '	242,755.94 acres', visitors: '970,998'},
    {name: 'Big Bend', state: 'Texas', established: 'June 12, 1944', area: '801,163.21 acres', visitors: '463,832'},
    {name: 'Biscayne', state: 'Florida', established: 'June 28, 1980', area: '172,971.11 acres', visitors: '708,522'},
    {name: 'Black Canyon of the Gunnison', state: 'Colorado', established: 'October 21, 1999', area: '30,779.83 acres', visitors: '432,818'},
    {name: 'Bryce Canyon', state: 'Utah', established: 'February 25, 1928', area: '35,835.08 acres', visitors: '2,594,904'},
    {name: 'Canyonlands', state: 'Utah', established: 'September 12, 1964', area: '337,597.83 acres', visitors: '733,996'},
    {name: 'Capitol Reef', state: 'Utah', established: 'December 18, 1971', area: '241,904.50 acres', visitors: '1,226,519'},
    {name: 'Carlsbad Caverns', state: 'New Mexico', established: 'May 14, 1930', area: '46,766.45 acres', visitors: '440,691'},
    {name: 'Channel Islands', state: 'California', established: 'March 5, 1980', area: '	249,561.00 acres', visitors: '409,630'},
    {name: 'Conaree', state: 'South Carolina', established: 'November 10, 2003', area: '26,476.47 acres', visitors: '159,445'},
    {name: 'Crater Lake', state: 'Oregon', established: 'May 22, 1902', area: '183,224.05 acres', visitors: '704,512'},
    {name: 'Cuyahoga Valley', state: 'Idaho', established: 'October 11, 2000', area: '32,571.88 acres', visitors: '2,237,997'},
    {name: 'Death Valley', state: 'Nevada, California', established: 'October 31, 1994', area: '	3,408,406.73 acres', visitors: '1,740,945'},
    {name: 'Denali', state: 'Alaska', established: 'February 26, 1917', area: '4,740,911.16 acres', visitors: '601,152'},
    {name: 'Dry Tortugas', state: 'Florida', established: 'October 26, 1992', area: '	64,701.22 acres', visitors: '79,200'},
    {name: 'Everglades', state: 'Florida', established: 'May 30, 1934', area: '1,508,938.57 acres', visitors: '3,437,286'},
    {name: 'Gates of the Arctic', state: 'Alaska', established: 'December 2, 1980', area: '7,523,897.45 acres', visitors: '10,518'},
    {name: 'Gateway Arch', state: 'Missouri', established: 'February 22, 2018', area: '192.83 acres', visitors: '2,055,309'},
    {name: 'Glacier', state: 'Montana', established: 'May 11, 1910', area: '1,013,125.99 acres', visitors: '3,049,839'},
    {name: 'Glacier Bay', state: 'Alaska', established: 'December 2, 1980', area: '3,223,383.43 acres', visitors: '672,087'},
    {name: 'Grand Canyon', state: 'Arizona', established: 'February 26, 1919', area: '1,201,647.03 acres', visitors: '5,974,411'},
    {name: 'Grand Teton', state: 'Wyoming', established: 'February 26, 1929', area: '310,044.36 acres', visitors: '3,405,614'},
    {name: 'Great Basin', state: 'Nevada', established: 'October 27, 1986', area: '	77,180.00 acres', visitors: '131,802'},
    {name: 'Great Sand Dunes', state: 'Colorado', established: 'September 13, 2004', area: '107,341.87 acres', visitors: '527,546'},
    {name: 'Great Smokey Mountains', state: 'North Carolina, Tennessee', established: 'June 15, 1934', area: '522,426.88 acres', visitors: '12,547,743'},
    {name: 'Guadalupe Mountains', state: 'Texas', established: 'October 15, 1966', area: '86,367.10 acres', visitors: '188,833'},
    {name: 'Haleakalā', state: 'Hawaii', established: 'July 1, 1961', area: '	33,264.62 acres', visitors: '994,394'},
    {name: 'Hawaiʻi Volcanoes', state: 'Hawaii', established: 'August 1, 1916', area: '325,605.28 acres', visitors: '1,368,376'},
    {name: 'Hot Springs', state: 'Arkansas', established: 'March 4, 1921', area: '5,554.15 acres', visitors: '1,467,153'},
    {name: 'Indiana Dunes', state: 'Indiana', established: '15,349.08 acres', area: '49,076.63 acres', visitors: '2,134,285'},
    {name: 'Isle Royale', state: 'Michigan', established: 'April 3, 1940', area: '571,790.30 acres', visitors: '26,410'},
    {name: 'Joshua Tree', state: 'California', established: 'October 31, 1994', area: '795,155.85 acres', visitors: '2,988,547'},
    {name: 'Katmai', state: 'Alaska', established: 'December 2, 1980', area: '3,674,529.33 acres', visitors: '84,167'},
    {name: 'Kenai Fjords', state: 'Alaska', established: 'December 2, 1980', area: '669,650.05 acres', visitors: '356,601'},
    {name: 'Kings Canyon', state: 'California', established: 'March 4, 1940', area: '461,901.20 acres', visitors: '632,110'},
    {name: 'Kabuk Valley', state: 'Alaska', established: 'December 2, 1980', area: '1,750,716.16 acres', visitors: '15,766'},
    {name: 'Lake Clark', state: 'Alaska', established: 'December 2, 1980', area: '2,619,816.49 acres', visitors: '17,157'},
    {name: 'Lasen Volcanic', state: 'California', established: 'August 9, 1916', area: '106,589.02 acres', visitors: '517,039'},
    {name: 'Mammoth Cave', state: 'Kentucky', established: 'July 1, 1941', area: '54,011.91 acres', visitors: '551,590'},
    {name: 'Mesa Verde', state: 'Colorado', established: 'June 29, 1906', area: '52,485.17 acres', visitors: '556,203'},
    {name: 'Mount Rainier', state: 'Washington', established: 'March 2, 1899', area: '236,381.64 acres', visitors: '1,501,621'},
    {name: 'North Cascades', state: 'Washington', established: 'October 2, 1968', area: '504,780.94 acres', visitors: '38,208'},
    {name: 'Olympic', state: 'Washington', established: 'June 29, 1938', area: '922,649.41 acres', visitors: '3,245,806'},
    {name: 'Petrified Forest', state: 'Arizona', established: 'December 9, 1962', area: '	221,390.21 acres', visitors: '643,588'},
    {name: 'Pinnacles', state: 'California', established: 'January 10, 2013', area: '26,685.73 acres', visitors: '177,224'},
    {name: 'Redwood', state: 'California', established: 'October 2, 1968', area: '138,999.37 acres', visitors: '504,722'},
    {name: 'Rocky Mountain', state: 'Colorado', established: 'January 26, 1915', area: '265,807.25 acres', visitors: '4,670,053'},
    {name: 'Saguaro', state: 'Arizona', established: 'October 14, 1994', area: '91,715.72 acres', visitors: '1,020,226'},
    {name: 'Sequoia', state: 'California', established: 'September 25, 1890', area: '404,062.63 acres', visitors: '1,246,053'},
    {name: 'Shenandoah', state: 'Virginia', established: 'December 26, 1935', area: '199,223.77 acres', visitors: '1,425,507'},
    {name: 'Theodore Roosevelt', state: 'North Dakota', established: 'November 10, 1978', area: '70,446.89 acres', visitors: '691,658'},
    {name: 'Virgin Islands', state: 'US Virgin Islands', established: 'August 2, 1956', area: '15,052.53 acres', visitors: '133,398'},
    {name: 'Voyageurs', state: '	Minnesota', established: 'January 8, 1971', area: '218,222.35 acres', visitors: '232,974'},
    {name: 'White Sands', state: 'New Mexico', established: 'December 20, 2019', area: '146,344.31 acres', visitors: '608,785'},
    {name: 'Wind Cave', state: 'South Dakota', established: 'January 9, 1903', area: '33,970.84 acres', visitors: '615,350'},
    {name: 'Wrangell–St. Elias', state: 'Alaska', established: 'December 2, 1980', area: '8,323,146.48 acres', visitors: '74,518'},
    {name: 'Yellowstone', state: 'Wyoming, Montana, Idaho', established: 'March 1, 1872', area: '2,219,790.71 acres', visitors: '4,422,861'},
    {name: 'Yosemite', state: 'California', established: 'October 1, 1890', area: '761,747.50 acres', visitors: '4,020,288'},
    {name: 'Zion', state: 'Utah', established: 'November 19, 1919', area: '	147,242.66 acres', visitors: '4,488,268'}
  ];

  parks: Array<INationalParks>;

  constructor(private dataShareSvc: DataShareService,
              private router: Router) { }

  ngOnInit(): void {
    this.parks = this.nationalParks;
  }

  filterParks() {
    this.parks = this.nationalParks;
    if (this.search) {
      this.parks = this.parks.filter(parks => parks.state.includes(this.search));
    }
  }

  onPark(index: number) {
    const useQP = this.useQueryParams;

    if (useQP) {
      this.router.navigate(['/park-detail'],
                            { queryParams: {
                              name: this.parks[index].name,
                              state: this.parks[index].state,
                              established: this.parks[index].established,
                              area: this.parks[index].area,
                              visitors: this.parks[index].visitors
                              }
                            }
      );
    } else {
      this.dataShareSvc.setData('parks', this.parks[index]);
      this.router.navigateByUrl('/park-detail');
    }
  }
}
