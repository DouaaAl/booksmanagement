import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { inject } from '@angular/core';
import { ServerconnectionService } from '../../services/serverconnection.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReloadComponent } from "../reload/reload.component";


@Component({
    selector: 'app-details',
    standalone: true,
    templateUrl: './details.component.html',
    styleUrl: './details.component.css',
    imports: [CommonModule, ReloadComponent]
})
export class DetailsComponent implements OnInit {
  detailsService = inject(ServerconnectionService);
  billCount: Number = 0;
  productCount: Number = 0;
  categoryCount: Number = 0;
  isLoading: boolean = false;

  getDetails() {
    this.isLoading = true;
    if(localStorage){
      this.detailsService.getDetails().subscribe((res:any)=>{
        this.billCount = res.billCount;
        this.productCount = res.productCount;
        this.categoryCount = res.categoryCount;
        this.isLoading = false;
      })
    }
  }
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)){
      this.getDetails();
    }
  }
    
}
