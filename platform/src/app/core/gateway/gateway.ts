import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GatewayService {
  private readonly gatewayUrl = `${environment.apiUrl}/gateway`;

  constructor(private http: HttpClient) {}

  call<T>(reqId: string, payload: Record<string, any> = {}): Observable<T> {
    return this.http.post<T>(this.gatewayUrl, { req_id: reqId, payload });
  }
}