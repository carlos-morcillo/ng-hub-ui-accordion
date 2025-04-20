import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appAccordionPanelHeader]',
})
export class AccordionPanelHeaderDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
