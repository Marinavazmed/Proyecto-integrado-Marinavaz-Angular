import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinSalaComponent } from './join-sala.component';

describe('JoinSalaComponent', () => {
  let component: JoinSalaComponent;
  let fixture: ComponentFixture<JoinSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinSalaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
