import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Piece } from '../models/piece';

@Injectable({
  providedIn: 'root',
})
export class PieceService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getPieces(): Observable<Piece[]> {
    return this.http.get<any>(`${this.apiServerUrl}piece/all`);
  }

  public addPiece(piece: Piece): Observable<Piece> {
    return this.http.post<Piece>(`${this.apiServerUrl}piece/add`, piece);
  }

  public updatePiece(piece: Piece): Observable<Piece> {
    return this.http.put<Piece>(`${this.apiServerUrl}piece/update`, piece);
  }

  public deletePiece(pieceId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}piece/delete/${pieceId}`
    );
  }

  getPieceById(id: number): Observable<Piece | undefined> {
    return this.getPieces().pipe(
      map((pieces) =>
        pieces.find((piece) => {
          return piece.idPiece === id;
        })
      )
    );
  }
}
