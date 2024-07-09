import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillviewerComponent } from './billviewer.component';

describe('BillviewerComponent', () => {
  let component: BillviewerComponent;
  let fixture: ComponentFixture<BillviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillviewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
