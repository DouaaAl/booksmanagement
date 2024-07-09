import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PdfServiceService {

  constructor(private http: HttpClient) { }

  fetchPdf(generateUuid: string) {
    const pdfUrl = `https://booksmanagement-production-304b.up.railway.app/api/bill/pdf/get/${generateUuid}`;
    const uniqueUrl = `${pdfUrl}?t=${new Date().getTime()}`; 

    return this.http.get(uniqueUrl, { responseType: 'blob' });
  }
}