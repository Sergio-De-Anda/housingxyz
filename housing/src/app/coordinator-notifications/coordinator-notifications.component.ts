import { Component, OnInit, ViewChild } from '@angular/core';

import { Notification } from '../../interfaces/account/notification';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'dev-coordinator-notifications',
  templateUrl: './coordinator-notifications.component.html',
  styleUrls: ['./coordinator-notifications.component.scss']
})

// Component to display a table of simplified notifications to a coordinator,
// And allow coordinator to select one for detailed viewing and manipulation.
export class CoordinatorNotificationsComponent implements OnInit {

  displayedColumns = ['expires', 'companyName'];
  // TODO: POPULATE
  dataSource = new MatTableDataSource<Notification>([]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}
