import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogaddiamanteComponent } from './dialogaddiamante.component';

describe('DialogaddiamanteComponent', () => {
  let component: DialogaddiamanteComponent;
  let fixture: ComponentFixture<DialogaddiamanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogaddiamanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogaddiamanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
