import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFacturaComponent } from './page-factura.component';

describe('PageFacturaComponent', () => {
  let component: PageFacturaComponent;
  let fixture: ComponentFixture<PageFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageFacturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
