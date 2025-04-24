import {
	Component,
	contentChildren,
	effect,
	forwardRef,
	HostBinding,
	input
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CollapseEvent } from '../../models/collapse-event';
import { AccordionPanelComponent } from '../accordion-panel/accordion-panel.component';

/**
 * A component that implements an accordion UI pattern, allowing users to show and hide
 * sections of related content. Supports single or multiple expanded panels and flush styling.
 * Implements ControlValueAccessor for form integration.
 *
 * @example
 * ```html
 * <hub-accordion [multiple]="true" [options]="{flush: true}">
 *   <hub-accordion-panel>...</hub-accordion-panel>
 *   <hub-accordion-panel>...</hub-accordion-panel>
 * </hub-accordion>
 * ```
 *
 * @implements {ControlValueAccessor}
 * @extends {SelectMultipleControlValueAccessor}
 */
@Component({
	selector: 'hub-accordion',
	templateUrl: './accordion.component.html',
	host: { class: 'hub-accordion' },
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => AccordionComponent),
			multi: true
		}
	]
})
export class AccordionComponent implements ControlValueAccessor {
	/**
	 * The current value of the accordion component.
	 * An array that may contain any type of data.
	 */
	value: any[] = [];

	/**
	 * Input binding that configures the property or attribute to bind to.
	 * Defines the property that will be bound to the value of the accordion.
	 * @default undefined
	 */
	bindValue = input<string>();

	/**
	 * Configuration options for the accordion component.
	 *
	 * @property {Object} options - The options object for configuring the accordion.
	 * @property {boolean} options.flush - When true, removes some borders and rounded corners to render
	 * accordions edge-to-edge with their parent container. Defaults to false.
	 */
	options = input<{ flush: boolean }>({ flush: false });

	/**
	 * Defines a comparison function to determine if two accordion items are equal.
	 * Used to track identity of objects in accordion selections.
	 *
	 * @param o1 First object to compare
	 * @param o2 Second object to compare
	 * @returns {boolean} True if objects are considered equal, false otherwise
	 * @defaultValue Default implementation uses strict equality (===)
	 */
	readonly compareWith = input<(o1: any, o2: any) => boolean>(
		(o1, o2) => o1 === o2
	);

	/**
	 * When true, expanding an accordion item will close all other expanded items.
	 * Defaults to false.
	 */
	multiple = input(false);

	/**
	 * Collection of child AccordionPanelComponent instances within this accordion.
	 * Uses Angular's contentChildren query to obtain all panel components.
	 * @type {QueryList<AccordionPanelComponent>}
	 */
	panels = contentChildren(AccordionPanelComponent);

	/**
	 * Effect that manages panel changes and their subscriptions.
	 * Initializes panel indices and subscribes to collapse events for each panel.
	 * This effect runs whenever the panels signal changes.
	 *
	 * For each panel:
	 * - Sets its index based on array position
	 * - Subscribes to panel collapse events to handle state changes
	 */
	panelsChangeEffect = effect(() => {
		this.panels().forEach((panel, index) => {
			panel.index = index;
			panel.collapsedChange.subscribe((event) => {
				this.handlePanelCollapse(event);
			});
		});
	});

	/**
	 * Gets whether the accordion has the flush styling option enabled
	 * @returns {boolean} True if the flush option is enabled, false otherwise
	 */
	@HostBinding('class.hub-accordion-flush')
	get haveFlushClass() {
		return this.options().flush;
	}

	onChange: any = () => {};
	onTouch: any = () => {};

	/**
	 * Implements the ControlValueAccessor interface to write a new value to the form control.
	 * If multiple selection is not enabled, wraps the value in an array.
	 * @param obj The value to be written to the form control
	 */
	writeValue(obj: any): void {
		if (!obj) {
			this.value = [];
			return;
		}
		this.value = !this.multiple() ? [obj] : obj;
		this.handleValue();
	}

	/**
	 * Registers a callback function that is invoked when the control's value changes in the UI.
	 * This is part of the ControlValueAccessor interface implementation.
	 * @param fn - The callback function to register. This function will be called with the new value when the control's value changes.
	 */
	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	/**
	 * Registers a callback function that is called when the control receives a touch event.
	 * Part of the ControlValueAccessor interface implementation.
	 * @param fn - The callback function to register. Gets called when the control is touched.
	 */
	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	/**
	 * Updates the collapse state of all panels based on the current value.
	 * Each panel is collapsed if its value is not found in the accordion's value array using the compareWith function.
	 * @internal
	 */
	handleValue() {
		for (const panel of this.panels()) {
			panel.collapsed.set(
				!this.value.find((v) => this.compareWith()(v, panel.value()))
			);
		}
	}

	/**
	 * Handles the collapse/expand event of an accordion panel.
	 * If the panel is being expanded and multiple is enabled,
	 * all other panels will be collapsed.
	 *
	 * @param {CollapseEvent} param0 - Object containing panel index and collapse state
	 * @param {number} param0.index - The index of the panel being toggled
	 * @param {boolean} param0.collapsed - The new collapse state of the panel
	 * @param {boolean} param0.value - The panel value
	 */
	handlePanelCollapse({ index, collapsed, value }: CollapseEvent) {
		if (!Array.isArray(this.value)) {
			this.value = [];
		}

		if (collapsed) {
			this.value = this.value.filter(
				(item) => !this.compareWith()(item, value)
			);
		} else {
			this.value = !this.multiple() ? [value] : [...this.value, value];
		}
		if (!collapsed && !this.multiple()) {
			for (const panel of this.panels()) {
				if (panel.index === index) {
					continue;
				}
				panel.collapsed.set(true);
			}
		}
		this.onChange(
			!this.multiple() ? (this.value.at(0) ?? null) : this.value
		);
	}
}
