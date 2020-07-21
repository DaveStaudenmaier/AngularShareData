import { Injectable } from '@angular/core';

export interface INationalParks {
  name: string;
  state: string;
  established: string;
  area: string;
  visitors: string;
}


export interface IshareData {
  parks: INationalParks;
}

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  private data: IshareData;

  constructor() {
    this.initializeData();
  }

  getData(type: string): any {
    return this.data[type];
  }

  setData(type: string, data: any) {
    this.data[type] = data;
  }

  initializeData() {
    this.data = {
      parks: {
        name: null,
        state: null,
        established: null,
        area: null,
        visitors: null
      }
    };
  }
}
