import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Article1Component } from './article1.component';

describe('ReadArticleComponent', () => {
  let component: Article1Component;
  let fixture: ComponentFixture<Article1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Article1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Article1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
