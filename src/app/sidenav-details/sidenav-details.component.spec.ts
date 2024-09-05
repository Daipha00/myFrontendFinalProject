import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavDetailsComponent } from './sidenav-details.component';

describe('SidenavDetailsComponent', () => {
  let component: SidenavDetailsComponent;
  let fixture: ComponentFixture<SidenavDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidenavDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
