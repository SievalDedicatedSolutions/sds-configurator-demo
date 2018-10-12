import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguratorPageComponent } from './configurator-page.component';

describe('ConfiguratorPageComponent', () => {
  let component: ConfiguratorPageComponent;
  let fixture: ComponentFixture<ConfiguratorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguratorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
