import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreditComponent } from './storedit.component';

describe('StoreditComponent', () => {
  let component: StoreditComponent;
  let fixture: ComponentFixture<StoreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreditComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});