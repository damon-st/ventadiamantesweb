import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdtipriceComponent } from './edtiprice.component';

describe('EdtipriceComponent', () => {
  let component: EdtipriceComponent;
  let fixture: ComponentFixture<EdtipriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdtipriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdtipriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
