import { ComponentRef, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionComponent } from './accordion.component';
import { CollapseEvent } from '../../models/collapse-event';

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
		spyOn(component, 'panels').and.returnValue([mockPanel] as any);

		component.handlePanelCollapse(createCollapseEvent(0, 'test', false));
		expect(component.value).toEqual(['test']);
	});

	it('should handle panel collapse in multiple selection mode', () => {
		const mockPanel = {
			index: 0,
			value: signal('test'),
			collapsed: { set: jasmine.createSpy('set') }
		};
		componentRef.setInput('multiple', true);
		spyOn(component, 'panels').and.returnValue([mockPanel] as any);

		component.handlePanelCollapse(createCollapseEvent(0, 'test', false));
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
		spyOn(component, 'panels').and.returnValue(mockPanels as any);

		component.handlePanelCollapse(createCollapseEvent(0, 'test1', false));
		expect(mockPanels[1].collapsed.set).toHaveBeenCalledWith(true);
	});

	it('should apply flush class when option is enabled', () => {
		componentRef.setInput('options', { flush: true });
		expect(component.haveFlushClass).toBeTrue();
	});

	it('should emit bound primitive values when bindValue is configured in multiple mode', () => {
		componentRef.setInput('multiple', true);
		componentRef.setInput('bindValue', 'id');

		const onChangeSpy = jasmine.createSpy('onChange');
		component.registerOnChange(onChangeSpy);

		component.handlePanelCollapse(
			createCollapseEvent(0, { id: 'item-3', name: 'Item 3', description: 'Content for Item 3' }, false)
		);

		expect(component.value).toEqual(['item-3']);
		expect(onChangeSpy).toHaveBeenCalledWith(['item-3']);
	});

	it('should resolve collapsed state using bindValue when writeValue receives primitives', () => {
		componentRef.setInput('multiple', true);
		componentRef.setInput('bindValue', 'id');

		const panelOneCollapsedSpy = jasmine.createSpy('panelOneCollapsed');
		const panelTwoCollapsedSpy = jasmine.createSpy('panelTwoCollapsed');

		const mockPanels = [
			{
				index: 0,
				value: signal({ id: 'item-1', name: 'Item 1' }),
				collapsed: { set: panelOneCollapsedSpy }
			},
			{
				index: 1,
				value: signal({ id: 'item-2', name: 'Item 2' }),
				collapsed: { set: panelTwoCollapsedSpy }
			}
		];

		spyOn(component, 'panels').and.returnValue(mockPanels as any);

		component.writeValue(['item-2']);

		expect(panelOneCollapsedSpy).toHaveBeenCalledWith(true);
		expect(panelTwoCollapsedSpy).toHaveBeenCalledWith(false);
	});
});

function createCollapseEvent(
	index: number,
	value: unknown,
	collapsed: boolean
): CollapseEvent {
	return {
		index,
		value,
		collapsed,
		uncollapsed: !collapsed
	};
}
