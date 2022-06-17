import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Objet } from '../models/object';
import { PieceObject } from '../models/pieceobject';

@Injectable({
  providedIn: 'root',
})
export class PieceobjectService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getPieceObject(): Observable<PieceObject[]> {
    return this.http.get<any>(`${this.apiServerUrl}/pieceobject/all`);
  }

  public addPieceObject(pieceobject: PieceObject): Observable<PieceObject> {
    return this.http.post<PieceObject>(
      `${this.apiServerUrl}pieceobject/add`,
      pieceobject
    );
  }

  public updatePieceObject(pieceobject: PieceObject): Observable<PieceObject> {
    return this.http.put<PieceObject>(
      `${this.apiServerUrl}pieceobject/update`,
      pieceobject
    );
  }

  public deletePieceObject(pieceobjectId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}pieceobject/delete/${pieceobjectId}`
    );
  }

  public findObjectsByIdPiece(pieceId: number): Observable<Objet[]> {
    return this.http.get<any>(
      `${this.apiServerUrl}pieceobject/findobjects/${pieceId}`
    );
  }

  public comparePiece(pieceId: number): Observable<Map<String, number>> {
    return this.http.get<any>(
      `${this.apiServerUrl}pieceobject/compare/${pieceId}`
    );
  }
}
