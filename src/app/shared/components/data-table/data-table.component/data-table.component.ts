// src/app/shared/components/data-table/data-table.component.ts
import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @Input() columns: { key: string; header: string; cell?: (item: any) => string }[] = [];
  @Input() data: any[] = [];
  @Input() actions: { label: string; icon: string; action: (item: any) => void }[] = [];
  @Input() pageSize = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 50];
  
  @Output() rowClick = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [];

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.displayedColumns = [...this.columns.map(col => col.key), 'actions'];
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(): void {
    if (this.dataSource) {
      this.dataSource.data = this.data;
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onRowClick(row: any): void {
    this.rowClick.emit(row);
  }
}
