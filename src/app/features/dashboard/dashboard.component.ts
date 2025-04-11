// src/app/features/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChartConfiguration } from 'chart.js';
import { InventoryService } from '../../core/services/inventory.service';
import { SaleService } from '../../core/services/sale.service';
import { ReportService } from '../../core/services/report.service';
import { Inventory } from '../../core/models/inventory.model';
import { Sale } from '../../core/models/sale.model';
import { Report } from '../../core/models/report.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // KPIs
  totalSales: number = 0;
  totalProducts: number = 0;
  totalCustomers: number = 0;
  totalReturns: number = 0;

  // Low stock items
  lowStockItems$: Observable<Inventory[]>;
  
  // Recent sales
  recentSales$: Observable<Sale[]>;
  
  // Charts
  salesChartData: ChartConfiguration['data'];
  salesChartOptions: ChartConfiguration['options'];
  
  isLoading = true;

  constructor(
    private inventoryService: InventoryService,
    private saleService: SaleService,
    private reportService: ReportService
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
    this.setupCharts();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    
    // Get low stock items
    this.lowStockItems$ = this.inventoryService.getLowStockItems();
    
    // Get recent sales
    this.recentSales$ = this.saleService.getRecentSales(10);
    
    // Load KPIs
    forkJoin({
      report: this.reportService.getLatestReport(),
      inventoryCount: this.inventoryService.getInventoryCount(),
      customerCount: this.customerService.getCustomerCount()
    }).subscribe(
      data => {
        this.totalSales = data.report.total_sales;
        this.totalReturns = data.report.total_returns;
        this.totalProducts = data.inventoryCount;
        this.totalCustomers = data.customerCount;
        this.isLoading = false;
      },
      error => {
        console.error('Error loading dashboard data:', error);
        this.isLoading = false;
      }
    );
  }

  setupCharts(): void {
    // Get sales data for the last 7 days for the chart
    this.saleService.getSalesTimelineData(7).subscribe(data => {
      // Setup Sales Chart
      this.salesChartData = {
        labels: data.map(item => item.date),
        datasets: [
          {
            label: 'Sales',
            data: data.map(item => item.amount),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      };
      
      this.salesChartOptions = {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          title: {
            display: true,
            text: 'Sales Last 7 Days'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      };
    });
  }
}
