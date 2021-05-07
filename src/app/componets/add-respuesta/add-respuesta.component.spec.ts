import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRespuestaComponent } from './add-respuesta.component';

describe('AddRespuestaComponent', () => {
  let component: AddRespuestaComponent;
  let fixture: ComponentFixture<AddRespuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRespuestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
