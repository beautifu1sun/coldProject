import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StorviewComponent } from './storview.component';

describe('StorviewComponent', () => {
  let component: StorviewComponent;
  let fixture: ComponentFixture<StorviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorviewComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});