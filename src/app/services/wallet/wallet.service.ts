// wallet.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private apiUrl = 'http://127.0.0.1:8000/ayadi/get-wallets/';
  private apiUrl1 = 'http://127.0.0.1:8000/ayadi/demand_payment/';
  constructor(private http: HttpClient) {}

  getWallets(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  makePayment(paymentData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl1, paymentData, { headers });
  }
}
