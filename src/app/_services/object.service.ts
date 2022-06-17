import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Objet } from '../models/object';

@Injectable({
  providedIn: 'root',
})
export class ObjectService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getObject(): Observable<Objet[]> {
    return this.http.get<any>(`${this.apiServerUrl}/object/all`);
  }

  public addObject(object: Objet): Observable<Object> {
    return this.http.post<Object>(`${this.apiServerUrl}object/add`, object);
  }

  public updateObject(object: Objet): Observable<Object> {
    return this.http.put<Object>(`${this.apiServerUrl}object/update`, object);
  }

  public deleteObject(objectId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}object/delete/${objectId}`
    );
  }
}
