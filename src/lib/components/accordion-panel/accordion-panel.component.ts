import { NgTemplateOutlet } from '@angular/common';
import {
	Component,
	contentChild,
	input,
	model,
	output,
	TemplateRef
} from '@angular/core';
import { AccordionPanelHeaderDirective } from '../../directives/accordion-panel-header.directive';
import { collapseEvent } from '../../models/collapse-event';

/**
 * A component that represents a single panel within an accordion.
 * Each panel can be expanded or collapsed independently and contains a header and content section.
 *
 * @example
 * ```html
 * <hub-accordion-panel [title]="'Panel Title'" [value]="panelValue">
 *   <ng-template hubAccordionPanelHeader>Custom Header</ng-template>
 *   Panel Content
 * </hub-accordion-panel>
 * ```
 *
 * @implements {OnInit}
 *
 * @property {number} index - The position of this panel within its parent accordion
 * @property {any} value - The value associated with this panel
 * @property {WritableSignal<boolean>} collapsed - Signal controlling the panel's collapsed state
 * @property {string} title - The title text displayed in the panel's header
 * @property {TemplateRef<any>} headerTpt - Template reference for custom header content
 *
 * @emits {collapseEvent} collapsedChange - Fired when the panel's collapsed state changes
 */
@Component({
	selector: 'hub-accordion-panel',
	imports: [NgTemplateOutlet],
	templateUrl: './accordion-panel.component.html',
	host: { class: 'hub-accordion-panel' }
})
export class AccordionPanelComponent {
	/**
	 * The position of this panel within its parent accordion.
	 *
	 * @type {number}
	 */
	index!: number;

	value: any = input();

	/**
	 * Signal that controls the collapsed state of the accordion panel.
	 * When true, the panel is collapsed. When false, the panel is expanded.
	 * @default true
	 */
	collapsed = model(true);

	/**
	 * The title of the accordion panel.
	 *
	 * @type {string}
	 */
	title = input();

	/**
	 * Reference to the header template of the accordion panel.
	 * Uses contentChild query to find a template marked with AccordionPanelHeaderDirective.
	 * The template reference is read using TemplateRef.
	 */
	headerTpt = contentChild(AccordionPanelHeaderDirective, {
		read: TemplateRef
	});

	/**
	 * Event emitter that fires when the panel's collapsed state changes.
	 * Emits a collapseEvent object containing the collapse state and animation details.
	 * @event
	 */
	collapsedChange = output<collapseEvent>();

	/**
	 * Toggles the collapse state of the accordion panel and emits the change event.
	 * The event includes the panel's index and its new collapsed state.
	 *
	 * @emits collapsedChange - Emits an object containing the panel index and collapsed state
	 */
	toggleCollapse() {
		this.collapsed.update((value) => !value);
		this.collapsedChange.emit({
			index: this.index,
			collapsed: this.collapsed()
		});
	}
}
