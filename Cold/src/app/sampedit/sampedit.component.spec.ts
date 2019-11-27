import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SampeditComponent } from './sampedit.component';

describe('SampeditComponent', () => {
  let component: SampeditComponent;
  let fixture: ComponentFixture<SampeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampeditComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});