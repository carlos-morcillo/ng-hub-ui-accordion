import {
	Component,
	contentChildren,
	effect,
	forwardRef,
	HostBinding,
	input,
	OnDestroy
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { OutputRefSubscription } from '@angular/core';
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
export class AccordionComponent implements ControlValueAccessor, OnDestroy {
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
	options = input({ flush: false }, {
		transform: (value: { flush: boolean } | any): { flush: boolean } => {
			// Input validation and sanitization
			if (!value || typeof value !== 'object') {
				console.warn('[AccordionComponent] Invalid options provided, using defaults');
				return { flush: false };
			}

			// Ensure flush is a boolean
			const flush = typeof value.flush === 'boolean' ? value.flush : false;
			
			return { flush };
		}
	});

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
	 * Subject for managing component destruction and cleanup.
	 * @private
	 */
	private destroy$ = new Subject<void>();

	/**
	 * Map to track panel subscriptions for proper cleanup.
	 * @private
	 */
	private panelSubscriptions = new Map<number, OutputRefSubscription>();

	/**
	 * Effect that manages panel changes and their subscriptions.
	 * Initializes panel indices and subscribes to collapse events for each panel.
	 * This effect runs whenever the panels signal changes.
	 * 
	 * Properly manages subscriptions to prevent memory leaks by:
	 * - Unsubscribing from previous panel subscriptions
	 * - Creating new subscriptions for current panels
	 * - Storing subscription references for cleanup
	 */
	panelsChangeEffect = effect(() => {
		// Clean up existing subscriptions
		this.panelSubscriptions.forEach(subscription => subscription.unsubscribe());
		this.panelSubscriptions.clear();

		// Create new subscriptions for current panels
		this.panels().forEach((panel, index) => {
			panel.index = index;
			const subscription = panel.collapsedChange.subscribe((event) => {
				this.handlePanelCollapse(event);
			});
			this.panelSubscriptions.set(index, subscription);
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
	 * Validates and sanitizes the input value before setting it.
	 * @param obj The value to be written to the form control
	 */
	writeValue(obj: any): void {
		// Handle null/undefined values
		if (obj == null) {
			this.value = [];
			this.handleValue();
			return;
		}

		try {
			// Validate and transform the input value
			if (this.multiple()) {
				// Multiple mode: expect an array
				if (Array.isArray(obj)) {
					this.value = [...obj]; // Create a copy to avoid reference issues
				} else {
					console.warn('[AccordionComponent] Expected array for multiple selection mode, received:', typeof obj);
					this.value = [obj]; // Wrap single value in array
				}
			} else {
				// Single mode: wrap in array for internal consistency
				if (Array.isArray(obj)) {
					console.warn('[AccordionComponent] Expected single value for single selection mode, received array. Using first element.');
					this.value = obj.length > 0 ? [obj[0]] : [];
				} else {
					this.value = [obj];
				}
			}

			this.handleValue();
		} catch (error) {
			console.error('[AccordionComponent] Error processing writeValue:', error);
			this.value = [];
			this.handleValue();
		}
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
	 * Component cleanup method. Unsubscribes from all panel subscriptions and
	 * completes the destroy subject to prevent memory leaks.
	 */
	ngOnDestroy(): void {
		// Clean up all panel subscriptions
		this.panelSubscriptions.forEach(subscription => subscription.unsubscribe());
		this.panelSubscriptions.clear();

		// Complete the destroy subject
		this.destroy$.next();
		this.destroy$.complete();
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
	 * Manages state consistently and handles both single and multiple selection modes.
	 *
	 * @param {CollapseEvent} collapseEvent - Object containing panel collapse event data
	 */
	handlePanelCollapse(collapseEvent: CollapseEvent) {
		this.updateAccordionValue(collapseEvent.value, collapseEvent.collapsed);
		
		// Handle single-selection mode: close other panels when one expands
		if (!collapseEvent.collapsed && !this.multiple()) {
			this.closeOtherPanels(collapseEvent.index);
		}
	}

	/**
	 * Updates the accordion's value based on panel state changes.
	 * Maintains consistency between single and multiple selection modes.
	 * 
	 * @param panelValue - The value of the panel being toggled
	 * @param collapsed - Whether the panel is being collapsed (true) or expanded (false)
	 * @private
	 */
	private updateAccordionValue(panelValue: any, collapsed: boolean): void {
		// Ensure value is always an array for consistent processing
		const currentValues = Array.isArray(this.value) ? [...this.value] : [];
		
		if (collapsed) {
			// Remove value from selection
			this.value = currentValues.filter(v => !this.compareWith()(v, panelValue));
		} else {
			// Add value to selection
			if (this.multiple()) {
				// Multiple mode: add if not already present
				if (!currentValues.some(v => this.compareWith()(v, panelValue))) {
					this.value = [...currentValues, panelValue];
				}
			} else {
				// Single mode: replace current selection
				this.value = [panelValue];
			}
		}

		// Emit the appropriate value format based on mode
		this.emitValueChange();
	}

	/**
	 * Closes all panels except the one at the specified index.
	 * Used in single-selection mode to ensure only one panel is open at a time.
	 * 
	 * @param excludeIndex - Index of the panel to keep open
	 * @private
	 */
	private closeOtherPanels(excludeIndex: number): void {
		this.panels().forEach((panel, index) => {
			if (index !== excludeIndex) {
				panel.collapsed.set(true);
			}
		});
	}

	/**
	 * Emits the current value in the appropriate format for the current mode.
	 * Single mode emits a single value or null, multiple mode emits an array.
	 * 
	 * @private
	 */
	private emitValueChange(): void {
		const emittedValue = this.multiple() 
			? this.value 
			: (this.value.length > 0 ? this.value[0] : null);
		
		this.onChange(emittedValue);
	}
}
