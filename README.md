# ng-hub-ui-accordion

A flexible, accessible, and customizable accordion UI component for Angular 19, part of the `ng-hub-ui` family.

Explore other UI libraries:

- [`ng-hub-ui-table`](https://www.npmjs.com/package/ng-hub-ui-table)
- [`ng-hub-ui-breadcrumbs`](https://www.npmjs.com/package/ng-hub-ui-breadcrumbs)
- [`ng-hub-ui-modal`](https://www.npmjs.com/package/ng-hub-ui-modal)
- [`ng-hub-ui-portal`](https://www.npmjs.com/package/ng-hub-ui-portal)
- [`ng-hub-ui-accordion`](https://www.npmjs.com/package/ng-hub-ui-accordion) ← you are here

## ✨ Features

- Supports single or multiple panel expansion
- Full form integration with `ControlValueAccessor`
- Accessible and ARIA-compliant
- Customizable headers via template directives
- Flush (borderless) mode
- Panel-level value tracking with comparison support
- Compatible with [Bootstrap 5 accordion styles](https://getbootstrap.com/docs/5.3/components/accordion/)

## 📦 Installation

```bash
npm install ng-hub-ui-accordion
```

## 🚀 Usage

### Import the components

```ts
import { AccordionComponent, AccordionPanelComponent, AccordionPanelHeaderDirective } from 'ng-hub-ui-accordion';

@Component({
	imports: [AccordionComponent, AccordionPanelComponent, AccordionPanelHeaderDirective]
})
export class AccordionExampleComponent {}
```

### Basic Example

```html
<hub-accordion>
	<hub-accordion-panel [title]="'Section 1'"> Content A </hub-accordion-panel>
	<hub-accordion-panel [title]="'Section 2'"> Content B </hub-accordion-panel>
</hub-accordion>
```

### Multiple Panels Open

```html
<hub-accordion [multiple]="true">
	<hub-accordion-panel [title]="'One'" [value]="1">One</hub-accordion-panel>
	<hub-accordion-panel [title]="'Two'" [value]="2">Two</hub-accordion-panel>
</hub-accordion>
```

### Custom Header Template

```html
<hub-accordion>
	<hub-accordion-panel [value]="myVal">
		<ng-template hubAccordionPanelHeader>
			<strong>Custom Header</strong>
		</ng-template>
		Panel content here
	</hub-accordion-panel>
</hub-accordion>
```

## 🧩 API

### `<hub-accordion>`

| Input         | Type                            | Description                                                                     |
| ------------- | ------------------------------- | ------------------------------------------------------------------------------- |
| `multiple`    | `boolean`                       | Allows multiple panels to stay open at the same time. Defaults to `false`.      |
| `options`     | `{ flush: boolean }`            | Enables flush (borderless) layout when `flush` is `true`.                       |
| `bindValue`   | `string`                        | Name of the bound value for form control integration.                           |
| `compareWith` | `(o1: any, o2: any) => boolean` | Custom comparator function for identifying values. Defaults to strict equality. |

Implements `ControlValueAccessor` — use with `ngModel` or Reactive Forms.

### `<hub-accordion-panel>`

| Input   | Type     | Description                                                          |
| ------- | -------- | -------------------------------------------------------------------- |
| `title` | `string` | Panel header title (optional if using a custom header template).     |
| `value` | `any`    | Value associated with this panel. Used for tracking selection state. |

| Output            | Payload                                 | Description                    |
| ----------------- | --------------------------------------- | ------------------------------ |
| `collapsedChange` | `{ index: number, collapsed: boolean }` | Emitted when panel is toggled. |

### Template Directive

| Directive                 | Usage                        |
| ------------------------- | ---------------------------- |
| `hubAccordionPanelHeader` | Marks custom header content. |

## 🔄 Value Handling

The component integrates with Angular forms. Use `ngModel` or `formControl` to bind the accordion's value. The selected value(s) will match the `value` input(s) of opened panels.

If `multiple` is:

- `false`: the value will be a single value (`any`)
- `true`: the value will be an array of values (`any[]`)

## 🧪 Examples

### Template-driven

```html
<hub-accordion [(ngModel)]="selectedValue">
	<hub-accordion-panel [value]="1" title="One">Panel One</hub-accordion-panel>
	<hub-accordion-panel [value]="2" title="Two">Panel Two</hub-accordion-panel>
</hub-accordion>
```

### Reactive Forms (single selection)

```ts
form = new FormGroup({
	accordion: new FormControl()
});
```

```html
<form [formGroup]="form">
	<hub-accordion formControlName="accordion">
		<hub-accordion-panel [value]="1" title="One">Panel One</hub-accordion-panel>
		<hub-accordion-panel [value]="2" title="Two">Panel Two</hub-accordion-panel>
	</hub-accordion>
</form>
```

### Reactive Forms (multiple selection)

```ts
form = new FormGroup({
	accordion: new FormControl([])
});
```

```html
<form [formGroup]="form">
	<hub-accordion formControlName="accordion" [multiple]="true">
		<hub-accordion-panel [value]="1" title="One">Panel One</hub-accordion-panel>
		<hub-accordion-panel [value]="2" title="Two">Panel Two</hub-accordion-panel>
		<hub-accordion-panel [value]="3" title="Three">Panel Three</hub-accordion-panel>
	</hub-accordion>
</form>
```

## 🎨 Customizing Styles

The `ng-hub-ui-accordion` library provides full style customization capabilities via **CSS variables**, making it easy to adapt the accordion to your project design requirements.

There are two main ways to customize the accordion styles:

### 1. Global Customization

You can redefine CSS variables globally by targeting the `.hub-accordion` class from your project-wide `styles.scss` file or any global stylesheet.

Example:

```scss
.hub-accordion {
  --hub-accordion-btn-bg: var(--bs-danger);
  --hub-accordion-active-color: #fff;
  --hub-accordion-active-bg: var(--bs-primary);
}
```

> **Important**: Make sure your global CSS is loaded after the library's styles, or increase the specificity (e.g., `html body .hub-accordion {}`) if needed.

### 2. Inline Customization (Per Component)

You can customize the appearance individually by applying CSS variables **inline** on the `hub-accordion` tag.

Example:

```html
<hub-accordion
  style="--hub-accordion-btn-bg: var(--bs-danger); --hub-accordion-active-bg: var(--bs-primary);">
  <hub-accordion-panel title="Custom Panel" [value]="1">
    Content here
  </hub-accordion-panel>
</hub-accordion>
```

Inline styles take precedence and are ideal for selective styling.

---

### 📖 Available CSS Variables

| Variable | Description |
|:---------|:------------|
| `--hub-accordion-color` | Text color for accordion content. |
| `--hub-accordion-bg` | Background color of the accordion. |
| `--hub-accordion-transition` | Transition for background, border, shadow, radius changes. |
| `--hub-accordion-border-color` | Border color of each item. |
| `--hub-accordion-border-width` | Border width of each item. |
| `--hub-accordion-border-radius` | Global accordion border radius. |
| `--hub-accordion-inner-border-radius` | Inner elements' border radius. |
| `--hub-accordion-btn-padding-x` | Header button horizontal padding. |
| `--hub-accordion-btn-padding-y` | Header button vertical padding. |
| `--hub-accordion-btn-color` | Text color of panel headers. |
| `--hub-accordion-btn-bg` | Background color of panel headers. |
| `--hub-accordion-btn-icon` | Icon for collapsed state. |
| `--hub-accordion-btn-icon-width` | Icon size. |
| `--hub-accordion-btn-icon-transform` | Icon transformation on expand. |
| `--hub-accordion-btn-icon-transition` | Icon transition animation. |
| `--hub-accordion-btn-active-icon` | Icon for expanded state. |
| `--hub-accordion-btn-focus-box-shadow` | Box shadow on focus. |
| `--hub-accordion-body-padding-x` | Panel body horizontal padding. |
| `--hub-accordion-body-padding-y` | Panel body vertical padding. |
| `--hub-accordion-active-color` | Active panel header text color. |
| `--hub-accordion-active-bg` | Active panel header background color. |

---

### 🛠 Visual Examples of Variable Effects

| Customization | Before | After |
|:--------------|:------:|:-----:|
| Change header background | Light gray | Red (`var(--bs-danger)`) |
| Change active text color | Black | White (`#fff`) |
| Change icon color | Default gray | Bootstrap primary color |
| Adjust padding | 1rem | 2rem for more spacing |

---

### 🔗 Mapping Bootstrap Variables to Accordion Variables

You can easily map Bootstrap variables into the accordion to maintain design consistency.

Example in `styles.scss`:

```scss
.hub-accordion {
  --hub-accordion-btn-bg: var(--bs-light);
  --hub-accordion-active-bg: var(--bs-primary);
  --hub-accordion-btn-color: var(--bs-dark);
  --hub-accordion-active-color: var(--bs-white);
  --hub-accordion-border-color: var(--bs-border-color);
}
```

This will dynamically link the accordion's appearance to the Bootstrap theme being used in your project.

> **Tip**: You can change Bootstrap's default colors via `:root` and the accordion will adapt automatically.
> 
### 💡 Inspiration

This component was inspired by the accordion pattern in Bootstrap 5, reimagined for Angular 19 with full reactive integration and template flexibility.

## 👤 Author

Developed with ❤️ by [Carlos Morcillo](https://www.carlosmorcillo.com)

If you find this useful, you can support my work:

☕ [Buy me a coffee](https://www.buymeacoffee.com/carlosmorcillo)

## 📄 License

MIT
