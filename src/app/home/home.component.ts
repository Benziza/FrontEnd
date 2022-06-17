import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Objet } from '../models/object';
import { Piece } from '../models/piece';
import { PieceService } from '../_services/piece.service';
import { PieceobjectService } from '../_services/pieceobject.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public pieces!: Piece[];
  public objets!: Objet[];
  public showPiece!: Piece;

  url: any;
  isVoid: boolean = true;

  constructor(
    private pieceService: PieceService,
    private pieceobjectService: PieceobjectService
  ) {}

  ngOnInit(): void {
    this.getPieces();
  }
  public getPieces(): void {
    this.pieceService.getPieces().subscribe(
      (response: Piece[]) => {
        this.pieces = response;
        if (this.pieces.length != 0) {
          this.isVoid = false;
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public findObjectsByIdPiece(pieceId: number): void {
    this.objets = [];
    this.pieceobjectService.findObjectsByIdPiece(pieceId).subscribe(
      (response1: Objet[]) => {
        this.objets = response1;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
    this.objets = [];
  }

  public onOpenModal(piece: Piece): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    this.showPiece = piece;

    button.setAttribute('data-target', '#showPieceModal');

    container?.appendChild(button);
    button.click();
  }
}
