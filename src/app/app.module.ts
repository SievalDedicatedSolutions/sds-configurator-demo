import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, APP_INITIALIZER } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HubService } from '@sieval-hub/hub.service';

import { AppComponent } from './app.component';
import { CustomerFormDialogComponent } from './components/customer-form-dialog/customer-form-dialog.component';
import { MaterialsDialogComponent } from './components/materials-dialog/materials-dialog.component';
import { ConfiguratorPageComponent } from './configurator-page/configurator-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MaterialModule } from './material.module';
import { config } from 'src/config';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ConfiguratorPageComponent,
    MaterialsDialogComponent,
    CustomerFormDialogComponent
  ],
  entryComponents: [MaterialsDialogComponent, CustomerFormDialogComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: HomePageComponent },
      { path: 'configurator', component: ConfiguratorPageComponent },
      { path: '**', component: HomePageComponent }
    ])
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: function(service: HubService) {
        return () => service.getToken(config.emailAddress, config.password).toPromise();
      },
      deps: [HubService],
      multi: true
    },
    HubService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
