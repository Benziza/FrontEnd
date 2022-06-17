import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Piece } from '../models/piece';
import { PieceService } from '../_services/piece.service';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css'],
})
export class LiveComponent implements OnInit {
  public pieces!: Piece[];
  public maxId: number = 0;
  public myUrl: string = '';
  public isReady: boolean = false;

  constructor(private pieceService: PieceService) {}

  ngOnInit(): void {
    this.getPieces();
  }

  public getPieces(): void {
    this.pieceService.getPieces().subscribe(
      (response: Piece[]) => {
        response.forEach((value) => {
          if (this.maxId < value.idPiece) {
            this.maxId = value.idPiece;
          }
        });
        this.isReady = true;
        this.myUrl = '../../assets/' + this.maxId + '.mp4';
        console.log(this.myUrl);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
}
