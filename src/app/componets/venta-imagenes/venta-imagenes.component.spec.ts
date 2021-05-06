import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaImagenesComponent } from './venta-imagenes.component';

describe('VentaImagenesComponent', () => {
  let component: VentaImagenesComponent;
  let fixture: ComponentFixture<VentaImagenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentaImagenesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaImagenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
