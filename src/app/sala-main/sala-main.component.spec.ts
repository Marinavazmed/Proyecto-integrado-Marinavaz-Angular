import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaMainComponent } from './sala-main.component';

describe('SalaMainComponent', () => {
  let component: SalaMainComponent;
  let fixture: ComponentFixture<SalaMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
