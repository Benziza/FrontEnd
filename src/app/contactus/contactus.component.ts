import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Mail } from '../models/mail';
import Swal from 'sweetalert2';
import { MailService } from '../_services/mail.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],
})
export class ContactusComponent implements OnInit {
  public editMail!: Mail;
  clicked = false;

  constructor(private mailService: MailService) {}

  ngOnInit(): void {}

  public onSendMail(mail: Mail): void {
    this.clicked = true;

    if (mail.objet == '' && mail.expediteur == '' && mail.message == '') {
      Swal.fire({
        icon: 'error',
        title: 'Send Email Failed',
      });
    } else {
      this.mailService.addMail(mail).subscribe(
        (response: Mail) => {
          Swal.fire({
            icon: 'success',
            title: 'Send Email Success',
          }).then(() => location.reload());
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      );
    }
  }
}
