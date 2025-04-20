import { ComponentRef, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionComponent } from './accordion.component';

describe('AccordionComponent', () => {
	let component: AccordionComponent;
	let componentRef: ComponentRef<AccordionComponent>;
	let fixture: ComponentFixture<AccordionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: []
		}).compileComponents();

		fixture = TestBed.createComponent(AccordionComponent);
		component = fixture.componentInstance;
		componentRef = fixture.componentRef;

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize with default values', () => {
		expect(component.value).toEqual([]);
		expect(component.multiple()).toBeFalse();
		expect(component.options()).toEqual({ flush: false });
	});

	it('should handle writeValue correctly in single selection mode', () => {
		componentRef.setInput('multiple', false);
		component.writeValue('test');
		expect(component.value).toEqual(['test']);
	});

	it('should handle writeValue correctly in multiple selection mode', () => {
		componentRef.setInput('multiple', true);
		component.writeValue(['test1', 'test2']);
		expect(component.value).toEqual(['test1', 'test2']);
	});

	it('should register onChange callback', () => {
		const mockFn = jasmine.createSpy('onChange');
		component.registerOnChange(mockFn);
		expect(component.onChange).toBe(mockFn);
	});

	it('should register onTouched callback', () => {
		const mockFn = jasmine.createSpy('onTouched');
		component.registerOnTouched(mockFn);
		expect(component.onTouch).toBe(mockFn);
	});

	it('should handle panel collapse in single selection mode', () => {
		const mockPanel = {
			index: 0,
			value: signal('test'),
			collapsed: { set: jasmine.createSpy('set') }
		};
		componentRef.setInput('multiple', false);
		componentRef.setInput('panels', [mockPanel]);

		component.handlePanelCollapse({ index: 0, collapsed: false });
		expect(component.value).toEqual(['test']);
	});

	it('should handle panel collapse in multiple selection mode', () => {
		const mockPanel = {
			index: 0,
			value: signal('test'),
			collapsed: { set: jasmine.createSpy('set') }
		};
		componentRef.setInput('multiple', true);
		componentRef.setInput('panels', [mockPanel]);

		component.handlePanelCollapse({ index: 0, collapsed: false });
		expect(component.value).toContain('test');
	});

	it('should collapse other panels in single selection mode', () => {
		const mockPanels = [
			{
				index: 0,
				value: signal('test1'),
				collapsed: { set: jasmine.createSpy('set') }
			},
			{
				index: 1,
				value: signal('test2'),
				collapsed: { set: jasmine.createSpy('set') }
			}
		];
		componentRef.setInput('multiple', false);
		componentRef.setInput('panels', mockPanels);

		component.handlePanelCollapse({ index: 0, collapsed: false });
		expect(mockPanels[1].collapsed.set).toHaveBeenCalledWith(true);
	});

	it('should apply flush class when option is enabled', () => {
		componentRef.setInput('options', { flush: true });
		expect(component.haveFlushClass).toBeTrue();
	});
});
