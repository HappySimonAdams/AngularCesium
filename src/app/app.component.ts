import { Component, OnInit } from '@angular/core';

import { ViewerService } from "./shared/viewer.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularCesiumDemo';

  constructor(private viewerService: ViewerService) {}

  ngOnInit() {
    this.viewerService.initView('cesiumContainer');
  }
}
