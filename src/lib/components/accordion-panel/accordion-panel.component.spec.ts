import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentRef } from '@angular/core';
import { AccordionPanelComponent } from './accordion-panel.component';

describe('AccordionPanelComponent', () => {
	let component: AccordionPanelComponent;
	let componentRef: ComponentRef<AccordionPanelComponent>;
	let fixture: ComponentFixture<AccordionPanelComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AccordionPanelComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(AccordionPanelComponent);
		component = fixture.componentInstance;
		componentRef = fixture.componentRef;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize with default collapsed state as true', () => {
		expect(component.collapsed()).toBe(true);
	});

	it('should toggle collapse state when toggleCollapse is called', () => {
		const initialState = component.collapsed();
		component.toggleCollapse();
		expect(component.collapsed()).toBe(!initialState);
	});

	it('should emit collapse event with correct data when toggled', () => {
		const emitSpy = spyOn(component.collapsedChange, 'emit');
		component.index = 1;

		component.toggleCollapse();

		expect(emitSpy).toHaveBeenCalledWith({
			index: 1,
			collapsed: false
		});
	});

	it('should accept a title input', () => {
		const testTitle = 'Test Panel';
		componentRef.setInput('title', testTitle);
		expect(component.title()).toBe(testTitle);
	});

	it('should accept a value input', () => {
		const testValue = 'test-value';
		componentRef.setInput('value', testValue);
		expect(component.value()).toBe(testValue);
	});
});
