import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { HubService } from '@sieval-hub/hub.service';
import {
  ConfiguratorProject,
  Customer,
  HubApplication,
  InputProjectBuilder,
  Material,
  MaterialBrowseRequest,
  Polygon
} from '@sieval/hub-client';
import { BehaviorSubject } from 'rxjs';
import { MaterialsDialogComponent } from 'src/app/components/materials-dialog/materials-dialog.component';
import { config } from 'src/config';

import { CustomerFormDialogComponent } from '../components/customer-form-dialog/customer-form-dialog.component';

@Component({
  selector: 'sds-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent implements OnInit {
  private readonly KEY_PROJECT = 'shoppingCartProject';

  constructor(
    private router: Router,
    private hubService: HubService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  isLoading$ = new BehaviorSubject<boolean>(false);

  polygonsDataSource: MatTableDataSource<Polygon>;

  materials: Material[] = [];

  applications: HubApplication[] = [];

  project: ConfiguratorProject | null = null;

  displayedColumns = ['modelDescription', 'width', 'height', 'totalPrice', 'edit'];

  async ngOnInit() {
    this.isLoading$.next(true);

    try {
      const project = localStorage.getItem(this.KEY_PROJECT);
      if (project) {
        this.processProject(JSON.parse(project) as ConfiguratorProject);
      }

      this.applications = await this.hubService.getUserApplications().toPromise();

      const request: MaterialBrowseRequest = {
        filter: {
          categoryId: 2001,
          pageSize: 200,
          pageIndex: 0
        }
      };

      const response = await this.hubService
        .browseMaterials(request, this.applications[0].applicationId)
        .toPromise();

      this.materials = response.items;
    } catch (err) {
      console.error(err);

      const message = 'Something went wrong. :(';
      this.snackbar.open(message, 'ok');
    } finally {
      this.isLoading$.next(false);
    }
  }

  onEditPolygon(polygon: Polygon) {
    this.router.navigate(['/configurator'], {
      queryParams: {
        polygonId: polygon.referenceId
      }
    });
  }

  onAddPolygon() {
    const dialog = this.dialog.open(MaterialsDialogComponent);
    const component = dialog.componentInstance;
    component.materials = this.materials;

    dialog.afterClosed().subscribe(material => {
      if (material) {
        this.onSubmitMaterial(material);
      }
    });
  }

  onClearCache() {
    localStorage.clear();
    this.project = null;
    this.polygonsDataSource = new MatTableDataSource([]);
  }

  onCancel() {}

  onSubmitMaterial(material: Material) {
    // this.isModalVisible = false;
    this.router.navigate(['/configurator'], {
      queryParams: {
        materialCode: material.code
      }
    });
  }

  onEnterCustomerDetails() {
    const dialog = this.dialog.open(CustomerFormDialogComponent);
    dialog.afterClosed().subscribe((customer: Customer) => {
      if (customer) {
        this.project.projects.forEach(prj => (prj.deliveryAddress = customer.mainAddress));
        this.onSaveProject(customer);
      }
    });
  }

  // This needs to happen server-side
  async onSaveProject(customer: Customer) {
    this.isLoading$.next(true);

    let snackbarMessage: string = null;
    try {
      await this.hubService.getToken(config.emailAddress, config.password).toPromise();
      const inputProjectBuilder = new InputProjectBuilder();
      const inputProject = inputProjectBuilder.buildInputConfiguratorProject(this.project);
      const savedProject = await this.hubService
        .saveProject({
          inputProject,
          customer
        })
        .toPromise();

      localStorage.setItem(this.KEY_PROJECT, JSON.stringify(savedProject));
      this.processProject(savedProject);

      snackbarMessage = `Project has been saved with Id: ${this.project.hubProjectId}`;
    } catch (err) {
      console.error(err);

      snackbarMessage = 'Something went wrong. :(';
    } finally {
      this.isLoading$.next(false);
      this.snackbar.open(snackbarMessage, 'ok');
    }
  }

  // This needs to happen server-side
  async onSendProject() {
    this.isLoading$.next(true);

    let snackbarMessage: string = null;
    try {
      await this.hubService.getToken(config.emailAddress, config.password).toPromise();
      await this.hubService.sendProject(this.project.hubProjectId).toPromise();
    } catch (err) {
      console.error(err);

      snackbarMessage = 'Something went wrong. :(';
      snackbarMessage = `Project Id: ${this.project.hubProjectId} has been sent.`;
    } finally {
      this.isLoading$.next(false);
      this.snackbar.open(snackbarMessage, 'ok');
    }
  }

  private processProject(project: ConfiguratorProject) {
    this.project = project;
    const polygons = project.projects.map(prj => prj.polygons).reduce((a, b) => a.concat(b));
    this.polygonsDataSource = new MatTableDataSource(polygons);
  }
}
