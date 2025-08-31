import { NgTemplateOutlet } from '@angular/common';
import {
	Component,
	contentChild,
	input,
	model,
	output,
	TemplateRef,
	HostListener,
	ElementRef,
	inject
} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AccordionPanelHeaderDirective } from '../../directives/accordion-panel-header.directive';
import { CollapseEvent } from '../../models/collapse-event';

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
	host: { class: 'hub-accordion-panel' },
	animations: [
		trigger('slideInOut', [
			state('expanded', style({
				height: '*',
				opacity: 1,
				overflow: 'visible'
			})),
			state('collapsed', style({
				height: '0px',
				opacity: 0,
				overflow: 'hidden'
			})),
			transition('collapsed => expanded', [
				style({ overflow: 'hidden' }),
				animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({
					height: '*',
					opacity: 1
				})),
				style({ overflow: 'visible' })
			]),
			transition('expanded => collapsed', [
				style({ overflow: 'hidden' }),
				animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({
					height: '0px',
					opacity: 0
				}))
			])
		])
	]
})
export class AccordionPanelComponent {
	/**
	 * The position of this panel within its parent accordion.
	 *
	 * @type {number}
	 */
	index!: number;

	/**
	 * ElementRef for accessing the native element.
	 * @private
	 */
	private elementRef = inject(ElementRef);

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
	collapsedChange = output<CollapseEvent>();

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
			collapsed: this.collapsed(),
			uncollapsed: !this.collapsed(),
			value: this.value()
		});
	}

	/**
	 * Handles keyboard navigation for the accordion panel.
	 * Supports Arrow keys, Home, End, Space, and Enter.
	 * 
	 * @param event - The keyboard event
	 */
	@HostListener('keydown', ['$event'])
	onKeyDown(event: KeyboardEvent) {
		// Only handle keyboard events on the button element
		const target = event.target as HTMLElement;
		if (!target.classList.contains('hub-accordion-button')) {
			return;
		}

		switch (event.key) {
			case 'ArrowDown':
				this.focusNextPanel();
				event.preventDefault();
				break;
			case 'ArrowUp':
				this.focusPreviousPanel();
				event.preventDefault();
				break;
			case 'Home':
				this.focusFirstPanel();
				event.preventDefault();
				break;
			case 'End':
				this.focusLastPanel();
				event.preventDefault();
				break;
			case ' ':
			case 'Enter':
				this.toggleCollapse();
				event.preventDefault();
				break;
		}
	}

	/**
	 * Focuses the next accordion panel button.
	 * @private
	 */
	private focusNextPanel() {
		const allPanels = this.getAllPanelButtons();
		const currentIndex = this.getCurrentPanelIndex(allPanels);
		const nextIndex = (currentIndex + 1) % allPanels.length;
		allPanels[nextIndex]?.focus();
	}

	/**
	 * Focuses the previous accordion panel button.
	 * @private
	 */
	private focusPreviousPanel() {
		const allPanels = this.getAllPanelButtons();
		const currentIndex = this.getCurrentPanelIndex(allPanels);
		const previousIndex = currentIndex === 0 ? allPanels.length - 1 : currentIndex - 1;
		allPanels[previousIndex]?.focus();
	}

	/**
	 * Focuses the first accordion panel button.
	 * @private
	 */
	private focusFirstPanel() {
		const allPanels = this.getAllPanelButtons();
		allPanels[0]?.focus();
	}

	/**
	 * Focuses the last accordion panel button.
	 * @private
	 */
	private focusLastPanel() {
		const allPanels = this.getAllPanelButtons();
		allPanels[allPanels.length - 1]?.focus();
	}

	/**
	 * Gets all accordion panel buttons within the parent accordion.
	 * @private
	 * @returns Array of button elements
	 */
	private getAllPanelButtons(): HTMLButtonElement[] {
		const accordionElement = this.elementRef.nativeElement.closest('.hub-accordion');
		if (!accordionElement) {
			return [];
		}
		return Array.from(accordionElement.querySelectorAll('.hub-accordion-button'));
	}

	/**
	 * Gets the current panel's index within all panel buttons.
	 * @private
	 * @param allPanels - Array of all panel buttons
	 * @returns Current panel index or 0 if not found
	 */
	private getCurrentPanelIndex(allPanels: HTMLButtonElement[]): number {
		const currentButton = this.elementRef.nativeElement.querySelector('.hub-accordion-button');
		return Math.max(0, allPanels.indexOf(currentButton));
	}
}
