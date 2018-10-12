import '@sieval/configurator';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfiguratorProject } from '@sieval/hub-client';
import { config } from 'src/config';
import { ConfiguratorConfig } from 'src/interfaces';
import { ConfiguratorLayout } from 'src/interfaces/configurator-layout';

@Component({
  selector: 'sds-configurator-page',
  templateUrl: './configurator-page.component.html',
  styleUrls: ['./configurator-page.component.css']
})
export class ConfiguratorPageComponent implements OnInit {
  private readonly KEY_PROJECT = 'shoppingCartProject';

  constructor(private route: ActivatedRoute, private router: Router) {}

  @ViewChild('configurator', { read: ElementRef })
  configuratorElement: ElementRef;

  configuratorConfig: ConfiguratorConfig;

  apiKey = config.apiKey;

  ngOnInit() {
    const queryParams = this.route.snapshot.queryParams;
    const materialId = queryParams.materialId;
    const materialCode = queryParams.materialCode;
    const polygonId = queryParams.polygonId;
    const configuratorConfig: ConfiguratorConfig = {
      startWithDefaultModel: true,
      defaultHeight: 123,
      defaultWidth: 123,
      settings: {
        // change this to select a layout
        layout: ConfiguratorLayout.Basic
      }
    };

    const project = localStorage.getItem(this.KEY_PROJECT);
    if (project) {
      configuratorConfig.project = JSON.parse(project);
    }

    if (polygonId) {
      configuratorConfig.polygonId = polygonId;
    } else {
      configuratorConfig.material = { materialId, materialCode };
    }

    this.configuratorConfig = configuratorConfig;

    const element = this.configuratorElement.nativeElement as HTMLElement;
    (<any>element).config = configuratorConfig;
    element.addEventListener('addToCart', (event: CustomEvent) => this.onAddToCart(event.detail));
  }

  onAddToCart(project: ConfiguratorProject) {
    const json = JSON.stringify(project);
    localStorage.setItem(this.KEY_PROJECT, json);
    this.router.navigate(['/']);
  }
}
