# ng-hub-ui-accordion

## 🧩 Library Family `ng-hub-ui`

This library is part of the **ng-hub-ui** ecosystem:

- [**ng-hub-ui-accordion**](https://www.npmjs.com/package/ng-hub-ui-accordion) ← You are here
- [**ng-hub-ui-avatar**](https://www.npmjs.com/package/ng-hub-ui-avatar)
- [**ng-hub-ui-board**](https://www.npmjs.com/package/ng-hub-ui-board)
- [**ng-hub-ui-breadcrumbs**](https://www.npmjs.com/package/ng-hub-ui-breadcrumbs)
- [**ng-hub-ui-calendar**](https://www.npmjs.com/package/ng-hub-ui-calendar)
- [**ng-hub-ui-modal**](https://www.npmjs.com/package/ng-hub-ui-modal)
- [**ng-hub-ui-paginable**](https://www.npmjs.com/package/ng-hub-ui-paginable)
- [**ng-hub-ui-portal**](https://www.npmjs.com/package/ng-hub-ui-portal)
- [**ng-hub-ui-stepper**](https://www.npmjs.com/package/ng-hub-ui-stepper)
- [**ng-hub-ui-utils**](https://www.npmjs.com/package/ng-hub-ui-utils)

---

## 📋 Table of Contents

- [🚀 Quick Start](#-quick-start)
- [✨ Inspiration](#-inspiration)
- [📦 Description](#-description)
- [🎯 Features](#-features)
- [🏗️ Component Architecture](#️-component-architecture)
- [📦 Installation](#-installation)
- [⚙️ Usage](#️-usage)
- [🪄 API Reference](#-api-reference)
- [🎠 Templates](#-templates)
- [🔄 Value Handling](#-value-handling)
- [🎨 Styling](#-styling)
- [⚡ Performance Tips](#-performance-tips)
- [🔧 Troubleshooting](#-troubleshooting)
- [♿ Accessibility](#-accessibility)
- [🧪 Testing Guide](#-testing-guide)
- [📚 Migration Guide](#-migration-guide)
- [❓ FAQ](#-faq)
- [🤝 Contribution](#-contribution)
- [☕ Support](#-support)
- [📊 Changelog](#-changelog)
- [🏆 Contributors](#-contributors)
- [📄 License](#-license)

---

## 🚀 Quick Start

Get up and running with ng-hub-ui-accordion in less than 3 minutes:

### 1. Install

```bash
npm install ng-hub-ui-accordion
```

### 2. Import

```typescript
import { AccordionComponent, AccordionPanelComponent } from 'ng-hub-ui-accordion';

@Component({
  imports: [AccordionComponent, AccordionPanelComponent],
  // ...
})
```

### 3. Use

```html
<hub-accordion>
	<hub-accordion-panel title="Panel 1">Content 1</hub-accordion-panel>
	<hub-accordion-panel title="Panel 2">Content 2</hub-accordion-panel>
</hub-accordion>
```

### 4. Advanced Features

```html
<hub-accordion [multiple]="true" [(ngModel)]="selectedValues">
	<hub-accordion-panel [value]="1" title="Panel 1">Advanced Content</hub-accordion-panel>
	<hub-accordion-panel [value]="2" title="Panel 2">More Content</hub-accordion-panel>
</hub-accordion>
```

**💡 That's it!** You now have a fully functional accordion with form integration and customization options.

---

## ✨ Inspiration

This accordion component was born from the need for a highly flexible, accessible, and form-integrated accordion solution for Angular applications. Built with modern Angular Signals architecture and inspired by Bootstrap's accordion pattern, it provides seamless integration with Angular's reactive forms while maintaining full customization control.

## 📦 Description

`ng-hub-ui-accordion` provides a comprehensive accordion implementation with two main components that work seamlessly together:

- **Accordion Component** (`<hub-accordion>`): Container component that manages panel states and form integration
- **Accordion Panel Component** (`<hub-accordion-panel>`): Individual collapsible panels with custom content and headers

Built as standalone Angular components with full Angular Signals support and complete Bootstrap 5 style compatibility.

---

## 🎯 Features

### Core Features

- **🔄 Full Angular Signals Support**: Built with modern Angular Signals architecture using `model()`, `input()`, `output()`, and `contentChildren()`
- **📋 Single or Multiple Expansion**: Configure whether one or multiple panels can be open simultaneously
- **🎛️ Complete Form Integration**: Implements `ControlValueAccessor` for seamless integration with Angular's reactive forms and template-driven forms
- **♿ Accessibility Ready**: Full ARIA support with proper labels, states, and keyboard navigation
- **🎨 Custom Header Templates**: Use custom templates for panel headers with the `hubAccordionPanelHeader` directive
- **✨ Flush Mode**: Borderless layout option for edge-to-edge rendering
- **🔍 Value Tracking**: Associate values with panels for complex selection logic
- **📱 Responsive Design**: Mobile-friendly design that works across all screen sizes

### Advanced Features

- **🎯 Custom Comparison Logic**: Configure custom comparison functions for value matching
- **🎪 Event Handling**: Comprehensive event system for tracking panel state changes
- **🎨 CSS Variables**: Complete styling control through CSS custom properties
- **🔧 Dynamic Content**: Support for dynamic panel creation and destruction
- **⚡ Performance Optimized**: Efficient change detection with Angular Signals
- **🌍 Framework Integration**: Perfect integration with Bootstrap themes and other CSS frameworks

## 🏗️ Component Architecture

### Library Structure

```
ng-hub-ui-accordion/
├── 📦 Core Components
│   ├── AccordionComponent        - Main container managing panel states
│   └── AccordionPanelComponent   - Individual collapsible panels
├── 📋 Template Directives
│   └── AccordionPanelHeaderDirective - Custom header content
├── 🎯 Models
│   └── CollapseEvent            - Event data structure
└── 🎨 Styles
    └── accordion.scss          - Complete styling with CSS variables
```

### Component Relationships

```
┌─────────────────────────────────────────────────────────────┐
│                 AccordionComponent                          │
│  ┌─────────────────────────────────────────────────────────┤
│  │ Form Integration (ControlValueAccessor)                │
│  │ ├── Value Management                                   │
│  │ ├── Change Detection                                   │
│  │ └── Validation Support                                 │
│  ├─────────────────────────────────────────────────────────┤
│  │ Panel Management                                        │
│  │ ├── contentChildren(AccordionPanelComponent)          │
│  │ ├── Single/Multiple Mode Logic                        │
│  │ ├── Panel Index Assignment                            │
│  │ └── Collapse Event Handling                           │
│  ├─────────────────────────────────────────────────────────┤
│  │ Configuration                                           │
│  │ ├── Multiple Mode Control                             │
│  │ ├── Flush Styling Options                             │
│  │ ├── Custom Comparison Functions                       │
│  │ └── Value Binding Configuration                       │
│  └─────────────────────────────────────────────────────────┤
│                                                             │
│    ┌─────────────────────────────────────────────────┐     │
│    │           AccordionPanelComponent               │     │
│    │ ┌─────────────────────────────────────────────┤     │
│    │ │ Header Section                              │     │
│    │ │ ├── Title Display                          │     │
│    │ │ ├── Custom Template Support                │     │
│    │ │ ├── Expand/Collapse Button                 │     │
│    │ │ └── ARIA Attributes                        │     │
│    │ ├─────────────────────────────────────────────┤     │
│    │ │ Content Section                             │     │
│    │ │ ├── Dynamic Show/Hide                      │     │
│    │ │ ├── Content Projection (ng-content)        │     │
│    │ │ └── Custom Styling Support                  │     │
│    │ ├─────────────────────────────────────────────┤     │
│    │ │ State Management                            │     │
│    │ │ ├── collapsed Signal (model)               │     │
│    │ │ ├── Value Association                      │     │
│    │ │ └── Event Emission                         │     │
│    │ └─────────────────────────────────────────────┤     │
│    └─────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow Architecture

```
┌──────────────────┐    ┌─────────────────┐    ┌──────────────────┐
│   User Input     │    │  Angular Signals│    │  Component State │
│  ┌─────────────┐ │    │ ┌──────────────┐│    │ ┌──────────────┐ │
│  │ Click Panel │ │───▶│ │ collapsed()  ││───▶│ │ Panel States │ │
│  │ Form Value  │ │    │ │ value()      ││    │ │ Form Values  │ │
│  │ Toggle      │ │    │ │ multiple()   ││    │ │ Selection    │ │
│  └─────────────┘ │    │ └──────────────┘│    │ └──────────────┘ │
└──────────────────┘    └─────────────────┘    └──────────────────┘
           │                       │                        │
           │                       ▼                        │
           │            ┌─────────────────┐                 │
           │            │     Effects     │                 │
           │            │ ┌──────────────┐│                 │
           │            │ │ Panel Index  ││                 │
           │            │ │ Assignment   ││                 │
           │            │ │ Event Sub.   ││                 │
           │            │ │ Form Updates ││                 │
           │            │ └──────────────┘│                 │
           │            └─────────────────┘                 │
           │                       │                        │
           └───────────────────────┼────────────────────────┘
                                   ▼
                        ┌─────────────────┐
                        │   Template      │
                        │     Render      │
                        │ ┌──────────────┐│
                        │ │ Panel HTML   ││
                        │ │ Custom Hdrs  ││
                        │ │ Content      ││
                        │ └──────────────┘│
                        └─────────────────┘
```

### Signal-Based Reactivity

The library leverages Angular Signals for optimal performance and reactivity:

```typescript
// Accordion Component - State Management
export class AccordionComponent implements ControlValueAccessor {
	// Input signals for configuration
	multiple = input(false);
	options = input<{ flush: boolean }>({ flush: false });
	compareWith = input<(o1: any, o2: any) => boolean>((o1, o2) => o1 === o2);

	// Content children signal for panels
	panels = contentChildren(AccordionPanelComponent);

	// Effect for managing panel changes
	panelsChangeEffect = effect(() => {
		this.panels().forEach((panel, index) => {
			panel.index = index;
			panel.collapsedChange.subscribe((event) => {
				this.handlePanelCollapse(event);
			});
		});
	});
}

// Accordion Panel - Individual Panel State
export class AccordionPanelComponent {
	// Model signal for two-way binding
	collapsed = model(true);

	// Input signals
	value = input<any>();
	title = input<string>();

	// Output for state changes
	collapsedChange = output<CollapseEvent>();

	// Template content child
	headerTpt = contentChild(AccordionPanelHeaderDirective, {
		read: TemplateRef
	});
}
```

---

---

## 📦 Installation

```bash
npm install ng-hub-ui-accordion
```

### Peer Dependencies

The accordion component requires Angular 19+ with the following peer dependencies:

```json
{
	"@angular/common": ">=19.0.0",
	"@angular/core": ">=19.0.0"
}
```

### Optional Styling

Include the base styles for Bootstrap-compatible styling:

```scss
// In your styles.scss or component styles
@use 'ng-hub-ui-accordion/src/lib/styles/accordion.scss';
```

---

## ⚙️ Usage

### Basic Setup

```typescript
import { Component, signal } from '@angular/core';
import { AccordionComponent, AccordionPanelComponent } from 'ng-hub-ui-accordion';

@Component({
	selector: 'app-example',
	standalone: true,
	imports: [AccordionComponent, AccordionPanelComponent],
	template: `
		<hub-accordion>
			<hub-accordion-panel title="Getting Started">
				Welcome to ng-hub-ui-accordion! This is your first panel.
			</hub-accordion-panel>
			<hub-accordion-panel title="Advanced Features">
				Explore form integration, custom templates, and more.
			</hub-accordion-panel>
		</hub-accordion>
	`
})
export class ExampleComponent {}
```

### Multiple Panels Expansion

```html
<hub-accordion [multiple]="true">
	<hub-accordion-panel [title]="'Panel 1'" [value]="1"> Content for panel 1 </hub-accordion-panel>
	<hub-accordion-panel [title]="'Panel 2'" [value]="2"> Content for panel 2 </hub-accordion-panel>
	<hub-accordion-panel [title]="'Panel 3'" [value]="3"> Content for panel 3 </hub-accordion-panel>
</hub-accordion>
```

### Custom Header Templates

```typescript
import { AccordionPanelHeaderDirective } from 'ng-hub-ui-accordion';

@Component({
  imports: [AccordionComponent, AccordionPanelComponent, AccordionPanelHeaderDirective],
  template: `
    <hub-accordion>
      <hub-accordion-panel [value]="1">
        <ng-template hubAccordionPanelHeader>
          <i class="fas fa-user"></i>
          <strong>User Profile</strong>
          <span class="badge bg-primary ms-2">New</span>
        </ng-template>
        User profile content here...
      </hub-accordion-panel>

      <hub-accordion-panel [value]="2">
        <ng-template hubAccordionPanelHeader>
          <i class="fas fa-cog"></i>
          Settings & Preferences
        </ng-template>
        Settings content here...
      </hub-accordion-panel>
    </hub-accordion>
  `
})
```

### Flush (Borderless) Mode

```html
<hub-accordion [options]="{ flush: true }">
	<hub-accordion-panel title="Borderless Panel 1"> Content without borders for edge-to-edge rendering </hub-accordion-panel>
	<hub-accordion-panel title="Borderless Panel 2">
		Perfect for cards or sections without visual separation
	</hub-accordion-panel>
</hub-accordion>
```

### Dynamic Panels

```typescript
export class DynamicAccordionComponent {
	panels = signal([
		{ id: 1, title: 'Dynamic Panel 1', content: 'First dynamic content' },
		{ id: 2, title: 'Dynamic Panel 2', content: 'Second dynamic content' }
	]);

	addPanel() {
		const newId = this.panels().length + 1;
		this.panels.update((panels) => [
			...panels,
			{
				id: newId,
				title: `Dynamic Panel ${newId}`,
				content: `Content for panel ${newId}`
			}
		]);
	}
}
```

```html
<hub-accordion>
	@for (panel of panels(); track panel.id) {
	<hub-accordion-panel [title]="panel.title" [value]="panel.id"> {{ panel.content }} </hub-accordion-panel>
	}
</hub-accordion>
<button (click)="addPanel()">Add Panel</button>
```

---

## 🪄 API Reference

### Accordion Component (`<hub-accordion>`)

#### Inputs

| Name          | Type                            | Default                 | Description                                                     |
| ------------- | ------------------------------- | ----------------------- | --------------------------------------------------------------- |
| `multiple`    | `boolean`                       | `false`                 | Allows multiple panels to stay open simultaneously.             |
| `options`     | `{ flush: boolean }`            | `{ flush: false }`      | Configuration options. Set `flush: true` for borderless layout. |
| `bindValue`   | `string`                        | `undefined`             | Property name to bind for form control integration.             |
| `compareWith` | `(o1: any, o2: any) => boolean` | `(o1, o2) => o1 === o2` | Custom comparison function for value equality.                  |

#### Form Integration

The accordion component implements `ControlValueAccessor`, enabling seamless integration with Angular's forms:

```typescript
// Template-driven forms
<hub-accordion [(ngModel)]="selectedValue" [multiple]="false">
  <!-- panels -->
</hub-accordion>

// Reactive forms
export class MyComponent {
  form = new FormGroup({
    accordion: new FormControl(null) // Single selection
    // or
    accordion: new FormControl([])   // Multiple selection
  });
}
```

```html
<form [formGroup]="form">
	<hub-accordion formControlName="accordion" [multiple]="true">
		<!-- panels -->
	</hub-accordion>
</form>
```

#### Host Classes

| Class                 | When Applied                   | Description                         |
| --------------------- | ------------------------------ | ----------------------------------- |
| `hub-accordion`       | Always                         | Base accordion styling              |
| `hub-accordion-flush` | When `options.flush` is `true` | Borderless styling for edge-to-edge |

### Accordion Panel Component (`<hub-accordion-panel>`)

#### Inputs

| Name        | Type      | Default     | Description                                                    |
| ----------- | --------- | ----------- | -------------------------------------------------------------- |
| `title`     | `string`  | `undefined` | Panel header title (optional if using custom header template). |
| `value`     | `any`     | `undefined` | Value associated with this panel for selection tracking.       |
| `collapsed` | `boolean` | `true`      | Initial collapsed state (model signal for two-way binding).    |

#### Outputs

| Name              | Type            | Description                                |
| ----------------- | --------------- | ------------------------------------------ |
| `collapsedChange` | `CollapseEvent` | Emitted when panel collapse state changes. |

#### CollapseEvent Interface

```typescript
interface CollapseEvent<T = any> {
	index: number; // Panel index within accordion
	collapsed: boolean; // Current collapsed state
	uncollapsed: boolean; // Opposite of collapsed (convenience)
	value: T; // Panel value
}
```

#### Model Binding

The panel's collapsed state can be bound with two-way binding:

```html
<hub-accordion-panel [(collapsed)]="isCollapsed" title="Panel"> Content </hub-accordion-panel>
```

#### Host Classes

| Class                 | When Applied | Description        |
| --------------------- | ------------ | ------------------ |
| `hub-accordion-panel` | Always       | Base panel styling |

### Template Directives

#### AccordionPanelHeaderDirective

| Selector                    | Usage                                   | Description                          |
| --------------------------- | --------------------------------------- | ------------------------------------ |
| `[hubAccordionPanelHeader]` | `<ng-template hubAccordionPanelHeader>` | Marks custom header content template |

**Example:**

```html
<hub-accordion-panel>
	<ng-template hubAccordionPanelHeader>
		<div class="d-flex justify-content-between align-items-center">
			<span><i class="fas fa-star"></i> Featured Content</span>
			<span class="badge bg-success">New</span>
		</div>
	</ng-template>
	Panel content goes here
</hub-accordion-panel>
```

### Event Handling

#### Panel Click Events

```typescript
export class MyComponent {
	onPanelToggle(event: CollapseEvent) {
		console.log(`Panel ${event.index} ${event.collapsed ? 'collapsed' : 'expanded'}`);
		console.log('Panel value:', event.value);
	}
}
```

```html
<hub-accordion-panel title="Interactive Panel" [value]="42" (collapsedChange)="onPanelToggle($event)">
	Content with event handling
</hub-accordion-panel>
```

#### Form Value Changes

```typescript
export class MyComponent {
	form = new FormGroup({
		accordion: new FormControl([])
	});

	ngOnInit() {
		this.form.get('accordion')?.valueChanges.subscribe((values) => {
			console.log('Selected accordion values:', values);
		});
	}
}
```

### Advanced Configuration

#### Custom Value Comparison

```typescript
export class MyComponent {
	// Custom comparison for complex objects
	compareObjects = (obj1: any, obj2: any) => {
		return obj1?.id === obj2?.id;
	};

	users = [
		{ id: 1, name: 'John Doe' },
		{ id: 2, name: 'Jane Smith' }
	];
}
```

```html
<hub-accordion [compareWith]="compareObjects" [multiple]="true">
	@for (user of users; track user.id) {
	<hub-accordion-panel [title]="user.name" [value]="user"> User details for {{ user.name }} </hub-accordion-panel>
	}
</hub-accordion>
```

---

## 🎠 Templates

The accordion component provides extensive template customization through the `hubAccordionPanelHeader` directive, allowing you to create rich, interactive headers with any content you need.

### Basic Custom Header

```html
<hub-accordion>
	<hub-accordion-panel [value]="'basic'">
		<ng-template hubAccordionPanelHeader>
			<strong>Custom Header Title</strong>
		</ng-template>
		Panel content here
	</hub-accordion-panel>
</hub-accordion>
```

### Icon-Based Headers

```html
<hub-accordion>
	<hub-accordion-panel [value]="'profile'">
		<ng-template hubAccordionPanelHeader>
			<i class="fas fa-user me-2"></i>
			User Profile Settings
		</ng-template>
		Profile configuration options...
	</hub-accordion-panel>

	<hub-accordion-panel [value]="'security'">
		<ng-template hubAccordionPanelHeader>
			<i class="fas fa-shield-alt me-2"></i>
			Security & Privacy
		</ng-template>
		Security settings...
	</hub-accordion-panel>
</hub-accordion>
```

### Complex Interactive Headers

```html
<hub-accordion>
	<hub-accordion-panel [value]="order" *ngFor="let order of orders">
		<ng-template hubAccordionPanelHeader>
			<div class="d-flex justify-content-between align-items-center w-100">
				<div>
					<strong>Order #{{ order.id }}</strong>
					<small class="text-muted d-block">{{ order.date | date }}</small>
				</div>
				<div class="d-flex align-items-center gap-2">
					<span class="badge" [class]="getBadgeClass(order.status)"> {{ order.status }} </span>
					<span class="fw-bold">${{ order.total }}</span>
				</div>
			</div>
		</ng-template>

		<!-- Order details -->
		<div class="order-details">
			<h6>Items:</h6>
			<ul>
				<li *ngFor="let item of order.items">{{ item.name }} - {{ item.quantity }}x ${{ item.price }}</li>
			</ul>
		</div>
	</hub-accordion-panel>
</hub-accordion>
```

### Headers with Actions

```html
<hub-accordion>
	<hub-accordion-panel [value]="notification.id" *ngFor="let notification of notifications">
		<ng-template hubAccordionPanelHeader>
			<div class="d-flex justify-content-between align-items-center w-100">
				<div class="d-flex align-items-center">
					<i [class]="notification.icon" class="me-2"></i>
					<div>
						<div class="fw-semibold">{{ notification.title }}</div>
						<small class="text-muted">{{ notification.time | date:'short' }}</small>
					</div>
				</div>

				<div class="d-flex gap-1">
					@if (!notification.read) {
					<span class="badge bg-primary">New</span>
					}
					<button
						class="btn btn-sm btn-outline-secondary"
						(click)="markAsRead(notification.id); $event.stopPropagation()"
					>
						<i class="fas fa-check"></i>
					</button>
					<button
						class="btn btn-sm btn-outline-danger"
						(click)="deleteNotification(notification.id); $event.stopPropagation()"
					>
						<i class="fas fa-trash"></i>
					</button>
				</div>
			</div>
		</ng-template>

		<div [innerHTML]="notification.content"></div>
	</hub-accordion-panel>
</hub-accordion>
```

### Conditional Headers

```html
<hub-accordion>
	<hub-accordion-panel [value]="section.id" *ngFor="let section of sections">
		<ng-template hubAccordionPanelHeader>
			@if (section.type === 'warning') {
			<div class="text-warning">
				<i class="fas fa-exclamation-triangle me-2"></i>
				{{ section.title }}
			</div>
			} @else if (section.type === 'error') {
			<div class="text-danger">
				<i class="fas fa-times-circle me-2"></i>
				{{ section.title }}
			</div>
			} @else {
			<div class="text-primary">
				<i class="fas fa-info-circle me-2"></i>
				{{ section.title }}
			</div>
			}
		</ng-template>

		<div [ngClass]="'alert alert-' + (section.type === 'error' ? 'danger' : section.type)">{{ section.content }}</div>
	</hub-accordion-panel>
</hub-accordion>
```

### Template Best Practices

1. **Event Propagation**: Use `$event.stopPropagation()` for buttons/actions in headers
2. **Accessibility**: Include proper ARIA labels for interactive elements
3. **Performance**: Use OnPush change detection for complex templates
4. **Styling**: Leverage Bootstrap classes for consistent appearance
5. **Content**: Keep headers concise but informative

---

## 🔄 Value Handling

The accordion component provides sophisticated value handling through Angular's form integration system.

### Understanding Value Types

**Single Selection Mode (`multiple: false`)**:

```typescript
// Form value is a single value or null
selectedValue: any = null; // or specific type like string, number, object
```

**Multiple Selection Mode (`multiple: true`)**:

```typescript
// Form value is always an array
selectedValues: any[] = []; // empty array when nothing selected
```

### Form Integration Examples

#### Template-Driven Forms

```typescript
export class TemplateFormsComponent {
	// Single selection
	selectedPanel: string | null = null;

	// Multiple selection
	selectedPanels: string[] = [];

	onSelectionChange() {
		console.log('Selection changed:', this.selectedPanel || this.selectedPanels);
	}
}
```

```html
<!-- Single selection -->
<hub-accordion [(ngModel)]="selectedPanel" (ngModelChange)="onSelectionChange()">
	<hub-accordion-panel title="Panel 1" value="panel1">Content 1</hub-accordion-panel>
	<hub-accordion-panel title="Panel 2" value="panel2">Content 2</hub-accordion-panel>
</hub-accordion>

<!-- Multiple selection -->
<hub-accordion [(ngModel)]="selectedPanels" [multiple]="true" (ngModelChange)="onSelectionChange()">
	<hub-accordion-panel title="Panel A" value="panelA">Content A</hub-accordion-panel>
	<hub-accordion-panel title="Panel B" value="panelB">Content B</hub-accordion-panel>
</hub-accordion>
```

#### Reactive Forms

```typescript
export class ReactiveFormsComponent {
	accordionForm = new FormGroup({
		singleAccordion: new FormControl<string | null>(null),
		multipleAccordion: new FormControl<string[]>([]),
		requiredAccordion: new FormControl<string | null>(null, Validators.required)
	});

	ngOnInit() {
		// Watch for changes
		this.accordionForm.get('singleAccordion')?.valueChanges.subscribe((value) => {
			console.log('Single accordion value:', value);
		});

		this.accordionForm.get('multipleAccordion')?.valueChanges.subscribe((values) => {
			console.log('Multiple accordion values:', values);
		});
	}
}
```

```html
<form [formGroup]="accordionForm">
	<!-- Single selection with validation -->
	<div class="mb-3">
		<label class="form-label">Required Selection</label>
		<hub-accordion formControlName="requiredAccordion">
			<hub-accordion-panel title="Option 1" value="option1"> First option content </hub-accordion-panel>
			<hub-accordion-panel title="Option 2" value="option2"> Second option content </hub-accordion-panel>
		</hub-accordion>

		@if (accordionForm.get('requiredAccordion')?.errors?.['required']) {
		<div class="text-danger">Please select an option</div>
		}
	</div>

	<!-- Multiple selection -->
	<div class="mb-3">
		<label class="form-label">Multiple Options</label>
		<hub-accordion formControlName="multipleAccordion" [multiple]="true">
			<hub-accordion-panel title="Feature A" value="featureA"> Feature A description </hub-accordion-panel>
			<hub-accordion-panel title="Feature B" value="featureB"> Feature B description </hub-accordion-panel>
			<hub-accordion-panel title="Feature C" value="featureC"> Feature C description </hub-accordion-panel>
		</hub-accordion>
	</div>
</form>
```

### Complex Value Objects

```typescript
interface User {
	id: number;
	name: string;
	email: string;
}

export class ComplexValuesComponent {
	users: User[] = [
		{ id: 1, name: 'John Doe', email: 'john@example.com' },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com' }
	];

	selectedUsers: User[] = [];

	// Custom comparison function for objects
	compareUsers = (user1: User, user2: User) => user1?.id === user2?.id;
}
```

```html
<hub-accordion [(ngModel)]="selectedUsers" [multiple]="true" [compareWith]="compareUsers">
	@for (user of users; track user.id) {
	<hub-accordion-panel [title]="user.name" [value]="user">
		<div class="user-details">
			<p><strong>Email:</strong> {{ user.email }}</p>
			<p><strong>ID:</strong> {{ user.id }}</p>
		</div>
	</hub-accordion-panel>
	}
</hub-accordion>
```

### Programmatic Control

```typescript
export class ProgrammaticControlComponent {
	form = new FormGroup({
		accordion: new FormControl([])
	});

	selectAll() {
		this.form.patchValue({
			accordion: ['panel1', 'panel2', 'panel3']
		});
	}

	clearSelection() {
		this.form.patchValue({
			accordion: []
		});
	}

	selectSpecific(values: string[]) {
		this.form.patchValue({
			accordion: values
		});
	}
}
```

## 🧪 Real-World Examples

### FAQ Section

```typescript
export class FAQComponent {
	faqs = signal([
		{
			id: 1,
			question: 'How do I reset my password?',
			answer: 'You can reset your password by clicking the "Forgot Password" link on the login page...',
			category: 'Account'
		},
		{
			id: 2,
			question: 'How do I cancel my subscription?',
			answer: 'To cancel your subscription, go to Account Settings > Billing > Cancel Subscription...',
			category: 'Billing'
		}
	]);
}
```

```html
<hub-accordion class="faq-accordion">
	@for (faq of faqs(); track faq.id) {
	<hub-accordion-panel [value]="faq.id">
		<ng-template hubAccordionPanelHeader>
			<div class="d-flex justify-content-between align-items-start">
				<strong>{{ faq.question }}</strong>
				<span class="badge bg-secondary">{{ faq.category }}</span>
			</div>
		</ng-template>
		<div [innerHTML]="faq.answer"></div>
	</hub-accordion-panel>
	}
</hub-accordion>
```

### Settings Panel

```typescript
export class SettingsComponent {
	settingsForm = new FormGroup({
		activeSettings: new FormControl<string[]>([])
	});

	settings = [
		{ id: 'notifications', title: 'Notification Preferences', icon: 'fa-bell' },
		{ id: 'privacy', title: 'Privacy & Security', icon: 'fa-shield-alt' },
		{ id: 'billing', title: 'Billing Information', icon: 'fa-credit-card' }
	];
}
```

```html
<form [formGroup]="settingsForm">
	<hub-accordion formControlName="activeSettings" [multiple]="true">
		@for (setting of settings; track setting.id) {
		<hub-accordion-panel [value]="setting.id">
			<ng-template hubAccordionPanelHeader>
				<i [class]="'fas ' + setting.icon + ' me-2'"></i>
				{{ setting.title }}
			</ng-template>

			<!-- Settings content based on setting.id -->
			@switch (setting.id) { @case ('notifications') {
			<div class="notification-settings">
				<div class="form-check">
					<input class="form-check-input" type="checkbox" id="emailNotifs" />
					<label class="form-check-label" for="emailNotifs"> Email Notifications </label>
				</div>
				<div class="form-check">
					<input class="form-check-input" type="checkbox" id="pushNotifs" />
					<label class="form-check-label" for="pushNotifs"> Push Notifications </label>
				</div>
			</div>
			} @case ('privacy') {
			<div class="privacy-settings">
				<div class="mb-3">
					<label class="form-label">Profile Visibility</label>
					<select class="form-select">
						<option>Public</option>
						<option>Private</option>
						<option>Friends Only</option>
					</select>
				</div>
			</div>
			} @case ('billing') {
			<div class="billing-settings">
				<p>Current Plan: <strong>Pro Plan</strong></p>
				<p>Next Billing: <strong>March 15, 2024</strong></p>
				<button class="btn btn-outline-primary">Update Payment Method</button>
			</div>
			} }
		</hub-accordion-panel>
		}
	</hub-accordion>
</form>
```

### Product Features Showcase

```typescript
export class ProductShowcaseComponent {
	features = [
		{
			id: 'analytics',
			title: 'Advanced Analytics',
			subtitle: 'Detailed insights into your data',
			icon: 'fa-chart-line',
			premium: true
		},
		{
			id: 'collaboration',
			title: 'Team Collaboration',
			subtitle: 'Work together seamlessly',
			icon: 'fa-users',
			premium: false
		}
	];
}
```

```html
<hub-accordion class="features-showcase">
	@for (feature of features; track feature.id) {
	<hub-accordion-panel [value]="feature.id">
		<ng-template hubAccordionPanelHeader>
			<div class="d-flex align-items-center">
				<div class="feature-icon me-3">
					<i [class]="'fas ' + feature.icon"></i>
				</div>
				<div class="flex-grow-1">
					<div class="d-flex align-items-center">
						<h6 class="mb-0 me-2">{{ feature.title }}</h6>
						@if (feature.premium) {
						<span class="badge bg-gold">Premium</span>
						}
					</div>
					<small class="text-muted">{{ feature.subtitle }}</small>
				</div>
			</div>
		</ng-template>

		<div class="feature-content">
			<p>Detailed description of {{ feature.title }} goes here...</p>

			@if (feature.premium) {
			<div class="alert alert-info">
				<i class="fas fa-crown me-2"></i>
				This feature requires a Premium subscription.
				<a href="#upgrade" class="btn btn-sm btn-primary ms-2">Upgrade Now</a>
			</div>
			}
		</div>
	</hub-accordion-panel>
	}
</hub-accordion>
```

---

## ⚡ Performance Tips

### Use OnPush Change Detection

```typescript
@Component({
	changeDetection: ChangeDetectionStrategy.OnPush
	// ...
})
export class OptimizedAccordionComponent {
	// Use signals for reactive data
	panels = signal(this.loadPanels());

	// Immutable updates
	addPanel(panel: Panel) {
		this.panels.update((current) => [...current, panel]);
	}
}
```

### Track Functions for Dynamic Panels

```html
<hub-accordion>
	@for (panel of panels(); track panel.id) {
	<hub-accordion-panel [title]="panel.title" [value]="panel.id"> {{ panel.content }} </hub-accordion-panel>
	}
</hub-accordion>
```

### Lazy Loading Content

```typescript
export class LazyAccordionComponent {
	loadContent(panelId: string) {
		// Load content only when panel is expanded
		return this.contentService.getContent(panelId);
	}
}
```

```html
<hub-accordion-panel [value]="panel.id" (collapsedChange)="!$event.collapsed && loadContent(panel.id)">
	@if (panel.content) {
	<div [innerHTML]="panel.content"></div>
	} @else {
	<div class="text-center p-3">
		<div class="spinner-border" role="status"></div>
	</div>
	}
</hub-accordion-panel>
```

### Memory Management

```typescript
export class AccordionComponent implements OnDestroy {
	private destroy$ = new Subject<void>();

	ngOnInit() {
		this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
			// Handle value changes
		});
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
```

---

## 🔧 Troubleshooting

### Common Issues

**Issue: Panels not expanding/collapsing**

```typescript
// Solution: Ensure proper imports and template structure
import { AccordionComponent, AccordionPanelComponent } from 'ng-hub-ui-accordion';

@Component({
  imports: [AccordionComponent, AccordionPanelComponent],
  // ...
})
```

**Issue: Form integration not working**

```typescript
// Solution: Check that ControlValueAccessor is properly implemented
// Make sure you're using reactive forms or template-driven forms correctly

// Reactive Forms
form = new FormGroup({
	accordion: new FormControl(null) // or [] for multiple
});

// Template-driven
selectedValue: any = null;
```

**Issue: Custom headers not displaying**

```typescript
// Solution: Import the header directive
import { AccordionPanelHeaderDirective } from 'ng-hub-ui-accordion';

@Component({
  imports: [AccordionComponent, AccordionPanelComponent, AccordionPanelHeaderDirective],
  // ...
})
```

**Issue: Styling not applied**

```scss
// Solution: Include base styles in your styles.scss
@use 'ng-hub-ui-accordion/src/lib/styles/accordion.scss';
```

---

## ♿ Accessibility

The accordion component is built with accessibility in mind and follows WCAG 2.1 AA guidelines:

### Built-in Accessibility Features

- **ARIA Attributes**: Proper `aria-expanded`, `aria-controls`, and `role` attributes
- **Keyboard Navigation**: Space and Enter keys to toggle panels
- **Focus Management**: Clear focus indicators and logical tab order
- **Screen Reader Support**: Meaningful labels and state announcements

### Accessibility Best Practices

```html
<!-- Add descriptive titles -->
<hub-accordion-panel title="Account Settings" aria-label="Expand to view account settings options">
	Settings content
</hub-accordion-panel>

<!-- Use semantic HTML in templates -->
<ng-template hubAccordionPanelHeader>
	<h3>Important Section</h3>
	<p>Additional context for screen readers</p>
</ng-template>
```

### Testing Accessibility

```typescript
// Test with keyboard navigation
it('should support keyboard navigation', () => {
	const button = fixture.debugElement.query(By.css('.hub-accordion-button'));

	// Test Enter key
	button.triggerEventHandler('keydown', { key: 'Enter' });
	expect(component.collapsed()).toBe(false);

	// Test Space key
	button.triggerEventHandler('keydown', { key: ' ' });
	expect(component.collapsed()).toBe(true);
});
```

---

## 🧪 Testing Guide

### Basic Component Testing

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionComponent, AccordionPanelComponent } from 'ng-hub-ui-accordion';
import { signal } from '@angular/core';

describe('AccordionComponent', () => {
	let component: TestAccordionComponent;
	let fixture: ComponentFixture<TestAccordionComponent>;

	@Component({
		template: `
			<hub-accordion [multiple]="multiple()">
				<hub-accordion-panel title="Panel 1" value="panel1"> Content 1 </hub-accordion-panel>
				<hub-accordion-panel title="Panel 2" value="panel2"> Content 2 </hub-accordion-panel>
			</hub-accordion>
		`,
		imports: [AccordionComponent, AccordionPanelComponent]
	})
	class TestAccordionComponent {
		multiple = signal(false);
	}

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TestAccordionComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(TestAccordionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should render accordion panels', () => {
		const panels = fixture.debugElement.queryAll(By.css('hub-accordion-panel'));
		expect(panels.length).toBe(2);
	});

	it('should toggle panel on click', () => {
		const button = fixture.debugElement.query(By.css('.hub-accordion-button'));
		const panel = fixture.debugElement.query(By.css('.hub-accordion-collapse'));

		// Initially collapsed
		expect(panel.classes['show']).toBeFalsy();

		// Click to expand
		button.nativeElement.click();
		fixture.detectChanges();

		expect(panel.classes['show']).toBeTruthy();
	});
});
```

### Form Integration Testing

```typescript
describe('Accordion Form Integration', () => {
	it('should work with reactive forms', () => {
		const form = new FormControl([]);
		component.accordionControl = form;
		fixture.detectChanges();

		// Simulate panel selection
		component.selectPanel('panel1');
		fixture.detectChanges();

		expect(form.value).toEqual(['panel1']);
	});

	it('should validate required accordion', () => {
		const form = new FormControl(null, Validators.required);
		component.accordionControl = form;
		fixture.detectChanges();

		expect(form.valid).toBeFalsy();
		expect(form.errors?.['required']).toBeTruthy();

		// Select a panel
		component.selectPanel('panel1');
		fixture.detectChanges();

		expect(form.valid).toBeTruthy();
	});
});
```

### Custom Template Testing

```typescript
describe('Custom Header Templates', () => {
	@Component({
		template: `
			<hub-accordion>
				<hub-accordion-panel value="custom">
					<ng-template hubAccordionPanelHeader>
						<strong>Custom Header</strong>
					</ng-template>
					Custom content
				</hub-accordion-panel>
			</hub-accordion>
		`,
		imports: [AccordionComponent, AccordionPanelComponent, AccordionPanelHeaderDirective]
	})
	class CustomHeaderTestComponent {}

	it('should render custom header template', () => {
		const fixture = TestBed.createComponent(CustomHeaderTestComponent);
		fixture.detectChanges();

		const customHeader = fixture.debugElement.query(By.css('strong'));
		expect(customHeader.nativeElement.textContent).toBe('Custom Header');
	});
});
```

### Accessibility Testing

```typescript
import { axe, toHaveNoViolations } from 'jasmine-axe';

expect.extend(toHaveNoViolations);

it('should be accessible', async () => {
	const results = await axe(fixture.nativeElement);
	expect(results).toHaveNoViolations();
});

it('should have proper ARIA attributes', () => {
	const button = fixture.debugElement.query(By.css('.hub-accordion-button'));

	expect(button.attributes['aria-expanded']).toBe('false');
	expect(button.attributes['aria-controls']).toBeDefined();
});
```

---

## 📚 Migration Guide

### From Bootstrap Accordion to ng-hub-ui-accordion

**Before (Bootstrap)**

```html
<div class="accordion" id="accordionExample">
	<div class="accordion-item">
		<h2 class="accordion-header">
			<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
				Accordion Item #1
			</button>
		</h2>
		<div id="collapseOne" class="accordion-collapse collapse show">
			<div class="accordion-body">Content</div>
		</div>
	</div>
</div>
```

**After (ng-hub-ui-accordion)**

```html
<hub-accordion>
	<hub-accordion-panel title="Accordion Item #1"> Content </hub-accordion-panel>
</hub-accordion>
```

### From Other Angular Accordion Libraries

**Update Imports**

```typescript
// Before
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';

// After
import { AccordionComponent, AccordionPanelComponent } from 'ng-hub-ui-accordion';
```

**Update Templates**

```html
<!-- Before (ng-bootstrap) -->
<ngb-accordion>
	<ngb-panel>
		<ng-template ngbPanelTitle>Title</ng-template>
		Content
	</ngb-panel>
</ngb-accordion>

<!-- After (ng-hub-ui-accordion) -->
<hub-accordion>
	<hub-accordion-panel title="Title"> Content </hub-accordion-panel>
</hub-accordion>
```

### Migration Checklist

- [ ] Update package.json dependencies
- [ ] Replace component imports
- [ ] Update template syntax
- [ ] Test form integration
- [ ] Verify custom styling
- [ ] Update unit tests
- [ ] Check accessibility compliance

---

## ❓ FAQ

### General Usage

**Q: Can I have nested accordions?**

```html
<hub-accordion>
	<hub-accordion-panel title="Outer Panel">
		<hub-accordion>
			<hub-accordion-panel title="Inner Panel 1">Nested content 1</hub-accordion-panel>
			<hub-accordion-panel title="Inner Panel 2">Nested content 2</hub-accordion-panel>
		</hub-accordion>
	</hub-accordion-panel>
</hub-accordion>
```

**Q: How do I prevent a panel from closing?**

```typescript
export class MyComponent {
	onPanelChange(event: CollapseEvent) {
		if (event.value === 'always-open' && event.collapsed) {
			// Prevent closing by re-opening
			setTimeout(() => {
				// Re-expand the panel
				this.expandPanel(event.value);
			});
		}
	}
}
```

**Q: Can I animate the panel transitions?**

```scss
.hub-accordion-collapse {
	transition: height 0.35s ease;
}
```

### Form Integration

**Q: How do I set initial expanded panels?**

```typescript
// Single selection
initialValue = 'panel1';

// Multiple selection
initialValues = ['panel1', 'panel3'];
```

```html
<hub-accordion [(ngModel)]="initialValue">
	<!-- panels -->
</hub-accordion>
```

**Q: Can I use custom validators?**

```typescript
// Custom validator requiring at least 2 selections
const minSelectionsValidator = (control: AbstractControl) => {
	const value = control.value;
	if (Array.isArray(value) && value.length < 2) {
		return { minSelections: { actual: value.length, min: 2 } };
	}
	return null;
};

form = new FormGroup({
	accordion: new FormControl([], [minSelectionsValidator])
});
```

### Styling

**Q: How do I change the expand/collapse icons?**

Framework-agnostic:

```scss
.hub-accordion {
	--hub-accordion-icon-color: #6c757d;
	--hub-accordion-icon-active-color: #0d6efd;
	--hub-accordion-btn-icon-mask: url("data:image/svg+xml;charset=UTF-8,%3Csvg ...%3E");
}
```

Bootstrap integration (optional):

```scss
.hub-accordion {
	--hub-accordion-icon-color: var(--bs-secondary);
	--hub-accordion-icon-active-color: var(--bs-primary);
}
```

**Q: Can I change colors dynamically?**

```html
<hub-accordion [style]="accordionStyles">
	<!-- panels -->
</hub-accordion>
```

```typescript
get accordionStyles() {
  return {
    '--hub-accordion-btn-bg': this.isDarkMode ? '#333' : '#fff',
    '--hub-accordion-active-bg': this.isDarkMode ? '#555' : '#e7f1ff'
  };
}
```

### Troubleshooting

**Q: Why isn't my custom header showing?**
A: Make sure you've imported `AccordionPanelHeaderDirective`:

```typescript
import { AccordionPanelHeaderDirective } from 'ng-hub-ui-accordion';

@Component({
  imports: [AccordionComponent, AccordionPanelComponent, AccordionPanelHeaderDirective],
})
```

**Q: Form values not updating correctly?**
A: Check that you're using the correct form control setup:

```typescript
// For single selection
new FormControl(null);

// For multiple selection
new FormControl([]);
```

---

## 🎨 Styling

`ng-hub-ui-accordion` is fully style-configurable through **CSS custom properties (CSS variables)**.

For a complete and up-to-date token catalog, see [CSS Variables Reference](./docs/css-variables-reference.md).

### 🔗 Import styles

```scss
@use 'ng-hub-ui-accordion/src/lib/styles/accordion.scss';
```

### 🎛 Quick customization example

```scss
.hub-accordion {
  --hub-accordion-btn-bg: #f8f9fa;
  --hub-accordion-active-bg: #0d6efd;
  --hub-accordion-active-color: #ffffff;
  --hub-accordion-icon-color: #6c757d;
  --hub-accordion-icon-active-color: #ffffff;
}
```

### 🔌 Bootstrap integration (optional)

```scss
.hub-accordion {
  --hub-accordion-btn-bg: var(--bs-light);
  --hub-accordion-active-bg: var(--bs-primary);
  --hub-accordion-active-color: var(--bs-white);
  --hub-accordion-icon-color: var(--bs-secondary);
  --hub-accordion-icon-active-color: var(--bs-white);
}
```

---

## 🤝 Contribution

We welcome contributions to make ng-hub-ui-accordion even better!

### Development Setup

1. **Clone the repository**

    ```bash
    git clone https://github.com/carlos-morcillo/ng-hub-ui-accordion.git
    cd ng-hub-ui-accordion
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Run development server**

    ```bash
    npm start
    ```

4. **Run tests**
    ```bash
    npm test
    ```

### Contributing Guidelines

- 📝 **Issues**: Report bugs or suggest features via GitHub Issues
- 🔧 **Pull Requests**: Fork the repo and create feature branches
- 🧪 **Testing**: Include tests for new features and bug fixes
- 📚 **Documentation**: Update documentation for any API changes
- 💅 **Code Style**: Follow existing code conventions and run `npm run lint`

### Areas for Contribution

- 🌍 **Internationalization**: Additional language support
- 🎨 **Themes**: New pre-built theme variants
- ♿ **Accessibility**: Enhanced ARIA support and keyboard navigation
- 📱 **Mobile**: Improved mobile experience and gestures
- ⚡ **Performance**: Optimization and bundle size reduction

---

## ☕ Support

Do you like this library? You can support the continued development and maintenance:

**☕ [Buy me a coffee](https://buymeacoffee.com/carlosmorcillo)**

Your support helps fund:

- 🔄 Regular updates and new features
- 🐛 Bug fixes and maintenance
- 📚 Documentation improvements
- 🆘 Community support

---

## 📊 Changelog

### v21.0.0 (Latest)

- ✨ Full Angular 21 compatibility.
- 🚀 Enhanced Angular Signals integration (input, output, model).
- 🎨 Improved Bootstrap 5 styling compatibility.
- 🔧 Performance optimizations.
- 📚 Comprehensive documentation updates.

### Previous Versions

See the full [CHANGELOG.md](CHANGELOG.md) for detailed release notes and migration information.

---

## 🏆 Contributors

Thanks to all the contributors who have helped make this library better:

- **[Carlos Morcillo](https://github.com/carlos-morcillo)** - _Creator & Maintainer_

_Want to see your name here? [Contribute](https://github.com/carlos-morcillo/ng-hub-ui-accordion/blob/main/CONTRIBUTING.md) to the project!_

---

## 📄 License

MIT License

Copyright (c) 2024 Carlos Morcillo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

### 💡 Final Notes

This accordion component was inspired by the accordion pattern in Bootstrap 5, reimagined for Angular 19 with full reactive integration, template flexibility, and modern Angular Signals architecture.

**Built with ❤️ by [Carlos Morcillo](https://www.carlosmorcillo.com)**

_Happy coding! 🎉_
