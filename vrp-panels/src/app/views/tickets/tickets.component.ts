import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../service/ticket.service';
import { AccountService } from '../../service/account.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  constructor(
    private _tickets: TicketService,
    private _account: AccountService
  ) { }

  ngOnInit() {
    this._tickets.getByAccountId(this._account.currentUserId)
      .subscribe(tickets => {
        console.log(tickets);
      })

    this._tickets.getById(1)
      .subscribe(tickets => {
        console.log(tickets);
      })
  }

}
