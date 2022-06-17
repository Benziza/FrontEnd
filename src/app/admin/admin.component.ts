import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Objet } from '../models/object';
import { Piece } from '../models/piece';
import { PieceService } from '../_services/piece.service';
import { PieceobjectService } from '../_services/pieceobject.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public pieces!: Piece[];
  public objets!: Objet[];
  public objetsReference!: Objet[];
  public showPiece!: Piece;
  public editPiece!: Piece;
  public deletePiece!: Piece;
  public comparaisonText: string = '';

  myAlert!: any;
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

  public findObjectsByIdPieceReference(pieceId: number): void {
    this.objets = [];
    this.pieceobjectService.findObjectsByIdPiece(pieceId).subscribe(
      (response1: Objet[]) => {
        this.objetsReference = response1;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
    this.objets = [];
  }

  public comparaison(pieceId: number): void {
    this.objets = [];
    this.pieceobjectService.comparePiece(pieceId).subscribe(
      (response: Map<String, number>) => {
        setTimeout(() => {
          for (const entry of Object.entries(response)) {
            this.comparaisonText +=
              '*' +
              entry[0] +
              ' est à ' +
              entry[1] +
              '% similaire à la piece courante \n';
          }
          this.myAlert = Swal.fire(this.comparaisonText);
          this.comparaisonText = '';
        }, 500);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
    this.objets = [];
  }

  public onUpdatePiece(piece: Piece): void {
    piece.numberOfObjecInPiece = this.editPiece.numberOfObjecInPiece;
    piece.referenceOrNot = this.editPiece.referenceOrNot;
    this.pieceService.updatePiece(piece).subscribe(
      (response: Piece) => {
        this.getPieces();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public onDeletePiece(pieceId: number): void {
    this.pieceService.deletePiece(pieceId).subscribe(
      (response: void) => {
        this.getPieces();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public onOpenModal(piece: Piece, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'show') {
      this.showPiece = piece;
      button.setAttribute('data-target', '#showPieceModal');
    }
    if (mode === 'edit') {
      this.editPiece = piece;
      button.setAttribute('data-target', '#updatePieceModal');
    }
    if (mode === 'delete') {
      this.deletePiece = piece;
      button.setAttribute('data-target', '#deletePieceModal');
    }

    container?.appendChild(button);
    button.click();
  }
}
