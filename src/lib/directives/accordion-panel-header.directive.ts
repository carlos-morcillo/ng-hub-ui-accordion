import { Directive, TemplateRef } from '@angular/core';

@Directive({
	selector: '[hubAccordionPanelHeader]'
})
export class AccordionPanelHeaderDirective {
	constructor(public templateRef: TemplateRef<any>) {}
}
