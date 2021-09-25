import {Directive} from '@angular/core';

/**
 * Example:
 *
 * <ng-container *rerender='changingInput'>
 *    this content will be re-rendered everytime `changingInput` changes
 * </ng-container>
 */

import {
  Input,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[rerender]'
})
export class RerenderDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  // if detects changes of the input `val`, clear and rerender the view
  @Input() set rerender(val:any) {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
  }
}
