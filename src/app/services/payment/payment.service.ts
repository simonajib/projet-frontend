import { Injectable } from '@angular/core';
import { PaymentModel } from '../../models/payment.model';
import { apiURL } from '../../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }
  addPayment(payment: PaymentModel) {
    return this.http.post<PaymentModel>(`${apiURL}/payments`, payment,httpOptions);
  }
}
