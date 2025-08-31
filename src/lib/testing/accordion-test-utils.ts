import { ComponentFixture, tick } from '@angular/core/testing';
import { AccordionComponent } from '../components/accordion/accordion.component';
import { AccordionPanelComponent } from '../components/accordion-panel/accordion-panel.component';
import { AccordionGlobalConfig } from '../services/accordion-config.service';

/**
 * Utility class for testing accordion components.
 * Provides helper methods for common testing scenarios.
 * 
 * @example
 * ```typescript
 * import { AccordionTestUtils } from 'ng-hub-ui-accordion/testing';
 * 
 * it('should handle panel interactions', async () => {
 *   await AccordionTestUtils.waitForAnimation(fixture);
 *   AccordionTestUtils.simulateKeyboardNavigation(panelElement, 'ArrowDown');
 *   expect(component.selectedPanel).toBe('panel2');
 * });
 * ```
 */
export class AccordionTestUtils {
	/**
	 * Creates a mock accordion component with default or custom configuration.
	 * 
	 * @param config - Optional partial configuration for the mock component
	 * @returns Mock accordion component instance
	 * @example
	 * ```typescript
	 * const mockAccordion = AccordionTestUtils.createMockAccordion({
	 *   multiple: true,
	 *   options: { flush: true }
	 * });
	 * ```
	 */
	static createMockAccordion(config?: Partial<AccordionComponent>): Partial<AccordionComponent> {
		return {
			value: [],
			multiple: () => false,
			options: () => ({ flush: false }),
			compareWith: () => (a: any, b: any) => a === b,
			onChange: () => {},
			onTouch: () => {},
			writeValue: () => {},
			registerOnChange: () => {},
			registerOnTouched: () => {},
			handleValue: () => {},
			...config
		};
	}

	/**
	 * Creates a mock accordion panel with default or custom configuration.
	 * 
	 * @param config - Optional partial configuration for the mock panel
	 * @returns Mock panel component instance
	 * @example
	 * ```typescript
	 * const mockPanel = AccordionTestUtils.createMockPanel({
	 *   title: () => 'Test Panel',
	 *   collapsed: () => false
	 * });
	 * ```
	 */
	static createMockPanel(config?: Partial<AccordionPanelComponent>): Partial<AccordionPanelComponent> {
		return {
			index: 0,
			title: () => 'Mock Panel',
			value: () => 'mock-value',
			collapsed: () => true,
			toggleCollapse: () => {},
			...config
		};
	}

	/**
	 * Waits for accordion animations to complete.
	 * Useful when testing animated transitions.
	 * 
	 * @param fixture - Component fixture
	 * @param animationDuration - Animation duration in milliseconds (default: 300)
	 * @returns Promise that resolves when animations complete
	 * @example
	 * ```typescript
	 * await AccordionTestUtils.waitForAnimation(fixture);
	 * expect(panelElement.classList).toContain('expanded');
	 * ```
	 */
	static async waitForAnimation(fixture: ComponentFixture<any>, animationDuration: number = 300): Promise<void> {
		fixture.detectChanges();
		await fixture.whenStable();
		tick(animationDuration);
		fixture.detectChanges();
	}

	/**
	 * Simulates keyboard navigation on an accordion element.
	 * 
	 * @param element - The HTML element to dispatch the event on
	 * @param key - The keyboard key to simulate
	 * @param options - Optional keyboard event options
	 * @example
	 * ```typescript
	 * AccordionTestUtils.simulateKeyboardNavigation(buttonElement, 'Enter');
	 * AccordionTestUtils.simulateKeyboardNavigation(buttonElement, 'ArrowDown');
	 * ```
	 */
	static simulateKeyboardNavigation(
		element: HTMLElement,
		key: string,
		options?: Partial<KeyboardEventInit>
	): void {
		const event = new KeyboardEvent('keydown', {
			key,
			bubbles: true,
			cancelable: true,
			...options
		});
		element.dispatchEvent(event);
	}

	/**
	 * Simulates a mouse click on an accordion panel button.
	 * 
	 * @param element - The button element to click
	 * @param options - Optional mouse event options
	 * @example
	 * ```typescript
	 * const button = fixture.debugElement.query(By.css('.hub-accordion-button'));
	 * AccordionTestUtils.simulateClick(button.nativeElement);
	 * ```
	 */
	static simulateClick(element: HTMLElement, options?: Partial<MouseEventInit>): void {
		const event = new MouseEvent('click', {
			bubbles: true,
			cancelable: true,
			...options
		});
		element.dispatchEvent(event);
	}

	/**
	 * Gets all accordion panel buttons within a container element.
	 * 
	 * @param container - Container element to search within
	 * @returns Array of button elements
	 * @example
	 * ```typescript
	 * const buttons = AccordionTestUtils.getAllPanelButtons(fixture.nativeElement);
	 * expect(buttons.length).toBe(3);
	 * ```
	 */
	static getAllPanelButtons(container: HTMLElement): HTMLButtonElement[] {
		return Array.from(container.querySelectorAll('.hub-accordion-button'));
	}

	/**
	 * Gets all accordion collapse containers within a container element.
	 * 
	 * @param container - Container element to search within
	 * @returns Array of collapse elements
	 * @example
	 * ```typescript
	 * const collapses = AccordionTestUtils.getAllCollapseContainers(fixture.nativeElement);
	 * const expandedCount = collapses.filter(el => !el.classList.contains('collapsed')).length;
	 * ```
	 */
	static getAllCollapseContainers(container: HTMLElement): HTMLDivElement[] {
		return Array.from(container.querySelectorAll('.hub-accordion-collapse'));
	}

	/**
	 * Checks if a panel is currently expanded by examining its collapse container.
	 * 
	 * @param panelElement - The panel element or its container
	 * @returns True if the panel is expanded, false otherwise
	 * @example
	 * ```typescript
	 * const isExpanded = AccordionTestUtils.isPanelExpanded(panelElement);
	 * expect(isExpanded).toBe(true);
	 * ```
	 */
	static isPanelExpanded(panelElement: HTMLElement): boolean {
		const collapseElement = panelElement.querySelector('.hub-accordion-collapse');
		if (!collapseElement) {
			return false;
		}
		return !collapseElement.getAttribute('style')?.includes('height: 0px');
	}

	/**
	 * Creates a test configuration for accordion global config.
	 * 
	 * @param overrides - Configuration overrides
	 * @returns Test configuration object
	 * @example
	 * ```typescript
	 * const testConfig = AccordionTestUtils.createTestConfig({
	 *   animationsEnabled: false,
	 *   developmentWarnings: false
	 * });
	 * ```
	 */
	static createTestConfig(overrides?: Partial<AccordionGlobalConfig>): AccordionGlobalConfig {
		return {
			animationDuration: 0, // Disable animations in tests by default
			multipleDefault: false,
			flushDefault: false,
			theme: 'default',
			accessibilityEnabled: true,
			developmentWarnings: false, // Reduce console noise in tests
			cssPrefix: 'hub-accordion',
			animationsEnabled: false, // Disable animations in tests by default
			...overrides
		};
	}

	/**
	 * Validates that an accordion component has proper ARIA attributes.
	 * 
	 * @param fixture - Component fixture
	 * @returns Object containing validation results
	 * @example
	 * ```typescript
	 * const validation = AccordionTestUtils.validateAriaAttributes(fixture);
	 * expect(validation.hasValidButtons).toBe(true);
	 * expect(validation.hasValidPanels).toBe(true);
	 * ```
	 */
	static validateAriaAttributes(fixture: ComponentFixture<any>): {
		hasValidButtons: boolean;
		hasValidPanels: boolean;
		errors: string[];
	} {
		const errors: string[] = [];
		const buttons = this.getAllPanelButtons(fixture.nativeElement);
		const panels = this.getAllCollapseContainers(fixture.nativeElement);

		// Check buttons
		let hasValidButtons = true;
		buttons.forEach((button, index) => {
			if (!button.getAttribute('aria-expanded')) {
				errors.push(`Button ${index} missing aria-expanded`);
				hasValidButtons = false;
			}
			if (!button.getAttribute('aria-controls')) {
				errors.push(`Button ${index} missing aria-controls`);
				hasValidButtons = false;
			}
		});

		// Check panels
		let hasValidPanels = true;
		panels.forEach((panel, index) => {
			if (!panel.id) {
				errors.push(`Panel ${index} missing id attribute`);
				hasValidPanels = false;
			}
		});

		return {
			hasValidButtons,
			hasValidPanels,
			errors
		};
	}

	/**
	 * Simulates form value changes for testing ControlValueAccessor integration.
	 * 
	 * @param component - Accordion component instance
	 * @param value - New value to set
	 * @param triggerChange - Whether to trigger change detection
	 * @example
	 * ```typescript
	 * AccordionTestUtils.simulateFormValueChange(component, ['panel1', 'panel2']);
	 * expect(component.value).toEqual(['panel1', 'panel2']);
	 * ```
	 */
	static simulateFormValueChange(
		component: any,
		value: any,
		triggerChange: boolean = true
	): void {
		if (component.writeValue) {
			component.writeValue(value);
		}
		if (triggerChange && component.onChange) {
			component.onChange(value);
		}
	}

	/**
	 * Asserts that accordion state matches expected values.
	 * Useful for comprehensive state validation in tests.
	 * 
	 * @param component - Accordion component instance
	 * @param expectedState - Expected state object
	 * @example
	 * ```typescript
	 * AccordionTestUtils.assertAccordionState(component, {
	 *   selectedValues: ['panel1'],
	 *   expandedPanels: 1,
	 *   isMultiple: false
	 * });
	 * ```
	 */
	static assertAccordionState(
		component: any,
		expectedState: {
			selectedValues?: any[];
			expandedPanels?: number;
			isMultiple?: boolean;
		}
	): void {
		if (expectedState.selectedValues !== undefined) {
			expect(component.value).toEqual(expectedState.selectedValues);
		}
		if (expectedState.isMultiple !== undefined) {
			expect(component.multiple()).toBe(expectedState.isMultiple);
		}
		if (expectedState.expandedPanels !== undefined) {
			const expandedCount = component.panels ? 
				component.panels().filter((p: any) => !p.collapsed()).length : 0;
			expect(expandedCount).toBe(expectedState.expandedPanels);
		}
	}
}