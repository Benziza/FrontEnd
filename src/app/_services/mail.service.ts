import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mail } from '../models/mail';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public addMail(mail: Mail): Observable<Mail> {
    return this.http.post<Mail>(`${this.apiServerUrl}mail/add`, mail);
  }
}
