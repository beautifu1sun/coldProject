import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SampviewComponent } from './sampview.component';

describe('SampviewComponent', () => {
  let component: SampviewComponent;
  let fixture: ComponentFixture<SampviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampviewComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});