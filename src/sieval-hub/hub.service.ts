import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ConfiguratorProject,
  HubApplication,
  Material,
  MaterialBrowseRequest,
  PagedResult,
  SaveProjectRequest
} from '@sieval/hub-client';
import { of as observableOf } from 'rxjs';
import { tap } from 'rxjs/operators';
import { config } from 'src/config';

@Injectable()
export class HubService {
  private readonly apiUrl: string = `${config.baseUrl}/api`;
  private token: { access_token: string; token_type: string } = null;

  constructor(private http: HttpClient) {}

  getUserApplications() {
    const url = `${this.apiUrl}/Configurator/Application/GetEmployeeApplications`;
    const headers = this.createAuthHeaders();
    return this.http.get<HubApplication[]>(url, { headers });
  }

  browseMaterials(request: MaterialBrowseRequest, applicationId: number) {
    const url = `${this.apiUrl}/Configurator/Material/Browse?applicationId=${applicationId}`;
    const headers = this.createAuthHeaders();
    return this.http.post<PagedResult<Material>>(url, request, { headers });
  }

  saveProject(request: SaveProjectRequest) {
    const url = `${this.apiUrl}/Configurator/Project/Save`;
    const headers = new HttpHeaders({
      Authorization: `${this.token.token_type} ${this.token.access_token}`
    });

    return this.http.post<ConfiguratorProject>(url, request, { headers });
  }

  sendProject(hubProjectId: number) {
    const url = `${this.apiUrl}/Configurator/Project/Send?hubProjectId=${hubProjectId}`;
    const headers = new HttpHeaders({
      Authorization: `${this.token.token_type} ${this.token.access_token}`
    });

    return this.http.put<ConfiguratorProject>(url, null, { headers });
  }

  getToken(emailAddress: string, password: string) {
    const body = JSON.stringify({ emailAddress, password });
    const url = `${this.apiUrl}/token`;
    if (this.token) {
      return observableOf(this.token);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.post<any>(url, body, { headers }).pipe(tap(token => (this.token = token)));
  }

  private createAuthHeaders() {
    return new HttpHeaders({ Authorization: config.apiKey });
  }
}
