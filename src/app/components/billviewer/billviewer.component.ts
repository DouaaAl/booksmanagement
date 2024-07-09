import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PdfServiceService } from '../../services/pdf-service.service';
import { HeaderComponent } from '../header/header.component';
import { ReloadComponent } from "../reload/reload.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-billviewer',
    templateUrl: './billviewer.component.html',
    styleUrls: ['./billviewer.component.css'],
    providers: [PdfServiceService],
    standalone: true,
    imports: [HeaderComponent, ReloadComponent, CommonModule]
})
export class BillviewerComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute, 
    private sanitizer: DomSanitizer, 
    private pdfService: PdfServiceService // Inject PdfServiceService
  ) { }

  id = '';
  isLoading: Boolean = true;
  url: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  private pollingInterval: any;

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.id = id;
      this.startPolling();
    });
  }

  ngOnDestroy(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  }

  startPolling(): void {
    this.pollingInterval = setInterval(() => {
      this.checkPDFExistence();
    }, 5000); // Check every 5 seconds
  }

  checkPDFExistence(): void {
    this.isLoading = true;
    this.pdfService.fetchPdf(this.id).subscribe(
      (pdfBlob: Blob) => {
        clearInterval(this.pollingInterval);
        this.updatePDFUrl(pdfBlob);
      },
      error => {
        console.error('PDF not found', error);
      }
    );
  }

  updatePDFUrl(pdfBlob: Blob): void {
    const pdfUrl = URL.createObjectURL(pdfBlob);
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
    this.isLoading = false;
  }
}