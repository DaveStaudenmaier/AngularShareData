import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ParksComponent } from './parks/parks.component';
import { DataShareService } from './../../core/services/data-share.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild(ParksComponent)
  public parks: ParksComponent;

  search = new FormControl('');
  useQueryParams = new FormControl(false);

  queryParams: boolean;

  constructor(private dataShareSvc: DataShareService) { }

  ngOnInit() {
    this.dataShareSvc.initializeData();
  }

  ngAfterViewInit() {
    // Subscribe to checkbox changes
    const o: Observable<boolean> = this.useQueryParams.valueChanges;
    o.subscribe(value => {
      this.queryParams = value;
    });
  }

}
