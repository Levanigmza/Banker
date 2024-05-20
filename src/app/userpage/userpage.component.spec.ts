import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpageComponent } from './userpage.component';

describe('UserpageComponent', () => {
  let component: UserpageComponent;
  let fixture: ComponentFixture<UserpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserpageComponent]
    });
    fixture = TestBed.createComponent(UserpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
