import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GatewayService } from '../../../core/gateway/gateway';

interface KPI {
  total: number;
  new: number;
  processed: number;
  archived: number;
  misrouted: number;
}

interface InboxRecord {
  _id: string;
  record_id: string;
  status: string;
  created_at: string;
  created_by: string;
  data: any;
}

interface RecordsResponse {
  records: InboxRecord[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

@Component({
  selector: 'app-inbox',
  standalone: false,
  templateUrl: './inbox.html',
  styleUrl: './inbox.scss',
})
export class Inbox implements OnInit {
  appId: number = 1;
  kpi: KPI = { total: 0, new: 0, processed: 0, archived: 0, misrouted: 0 };
  records: InboxRecord[] = [];
  totalPages = 1;
  currentPage = 1;
  pageSize = 10;
  total = 0;
  isLoading = false;
  searchTerm = '';
  selectedStatus = '';

  kpiCards = [
    { label: 'All Records', key: 'total', color: '#4f46e5' },
    { label: 'New', key: 'new', color: '#0ea5e9' },
    { label: 'Processed', key: 'processed', color: '#10b981' },
    { label: 'Archived', key: 'archived', color: '#f59e0b' },
    { label: 'Misrouted', key: 'misrouted', color: '#ef4444' },
  ];

  constructor(
    private gateway: GatewayService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.appId = +this.route.parent?.snapshot.paramMap.get('appId')! || 1;
    this.loadKPI();
    this.loadRecords();
  }

  loadKPI(): void {
    this.gateway.call<KPI>('GET_INBOX_KPI', { appId: this.appId }).subscribe({
      next: (res) => this.kpi = res,
      error: (err) => console.error(err),
    });
  }

  loadRecords(): void {
    this.isLoading = true;
    this.gateway.call<RecordsResponse>('GET_INBOX_RECORDS', {
      appId: this.appId,
      page: this.currentPage,
      pageSize: this.pageSize,
      status: this.selectedStatus || undefined,
      search: this.searchTerm || undefined,
    }).subscribe({
      next: (res) => {
        this.records = res.records;
        this.total = res.total;
        this.totalPages = res.totalPages;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadRecords();
  }

  onStatusFilter(status: string): void {
    this.selectedStatus = status;
    this.currentPage = 1;
    this.loadRecords();
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadRecords();
  }

  viewRecord(recordId: string): void {
    this.router.navigate(['/record', this.appId, recordId]);
  }

  addRecord(): void {
    this.router.navigate(['/record', this.appId, 'new']);
  }

  getKpiValue(key: string): number {
    return this.kpi[key as keyof KPI] || 0;
  }

  getStatusClass(status: string): string {
    const map: { [key: string]: string } = {
      'New': 'badge-new',
      'Processed': 'badge-processed',
      'Archived': 'badge-archived',
      'Misrouted': 'badge-misrouted',
    };
    return map[status] || 'badge-default';
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}