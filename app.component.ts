import { Component, OnInit } from '@angular/core';
import * as signalR from '@aspnet/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'app';
  ngOnInit() {
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl("http://localhost:57313/notify")
      .build();
    connection.start().then(function () {
      console.log('Connected!');
    }).catch(function (err) {
      return console.error(err.toString());
    });

    connection.on("BroadcastMessage", (type: string, payload: string) => {
      console.log({ severity: type, summary: payload, detail: 'Via SignalR' });
    });
  }
}
