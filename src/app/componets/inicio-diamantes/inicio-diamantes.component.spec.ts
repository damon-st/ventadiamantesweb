import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioDiamantesComponent } from './inicio-diamantes.component';

describe('InicioDiamantesComponent', () => {
  let component: InicioDiamantesComponent;
  let fixture: ComponentFixture<InicioDiamantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioDiamantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioDiamantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
