import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DataShareService, INationalParks } from './../../core/services/data-share.service';

@Component({
  selector: 'app-park-detail',
  templateUrl: './park-detail.component.html',
  styleUrls: ['./park-detail.component.scss']
})
export class ParkDetailComponent implements OnInit, OnDestroy {
  park: INationalParks;
  parkImage: string;

  private routeSubscription: any;

  constructor(private DataShareSvc: DataShareService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Get data passed through a service
    this.park = this.DataShareSvc.getData('parks');
    if (this.park.name) {
      this.selectImage(this.park.name);
      console.log('using service data=', this.park);
    }

    this.listenForParameters();
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  // Subscribe to query parameters on the URL
  private listenForParameters() {
    this.routeSubscription = this.route
    .queryParams
    .subscribe(params => {
      if (params.name) {
        console.log('using query params=', params);
        this.selectImage(params.name);
        this.park.name = params.name;
        this.park.state = params.state;
        this.park.established = params.established;
        this.park.area = params.area;
        this.park.visitors = params.visitors;
      }
    }, error => {
      console.log(error);
    });
  }

  // Just using two images for demo so hard-coding
  private selectImage(park: string) {
    if (park === 'Mount Rainier') {
      this.parkImage = './../../../assets/images/mt-rainier.jpg';
    } else {
      this.parkImage = './../../../assets/images/olympic.jpg';
    }
  }
}
