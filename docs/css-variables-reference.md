# ng-hub-ui-accordion — CSS Variables Reference

Complete reference of all CSS custom properties exposed by `ng-hub-ui-accordion`.
Use these variables to customize visual behavior without editing component source code.

---

## Table of Contents

- [How it Works](#how-it-works)
- [Base System Fallbacks](#base-system-fallbacks)
- [Accordion Variables](#accordion-variables)
- [Customization Examples](#customization-examples)
- [Best Practices](#best-practices)

---

## How it Works

The accordion uses a token fallback chain:

```text
component token -> sys token -> ref token -> literal fallback
```

This allows:

- consistent theming across components,
- safe defaults when global tokens are not provided,
- runtime customization through CSS variables.

---

---

## Base System Fallbacks

`ng-hub-ui-accordion` defines and/or consumes these base tokens:

| Variable | Default |
|---|---|
| `--hub-sys-text-primary` | `#212529` |
| `--hub-sys-surface-page` | `#fff` |
| `--hub-sys-border-color-default` | `rgba(0, 0, 0, 0.125)` |
| `--hub-sys-color-primary` | `#0c63e4` |
| `--hub-sys-color-primary-subtle` | `#e7f1ff` |
| `--hub-sys-focus-ring-width` | `0.25rem` |
| `--hub-sys-focus-ring-color` | `rgba(13, 110, 253, 0.25)` |
| `--hub-ref-border-width` | `1px` |
| `--hub-ref-radius-sm` | `0.25rem` |
| `--hub-ref-space-3` | `1rem` |

---

## Accordion Variables

Defined in `accordion.component.scss` and consumed by `accordion-panel.component.scss`.

### Core

| Variable | Default |
|---|---|
| `--hub-accordion-color` | `var(--hub-sys-text-primary, #212529)` |
| `--hub-accordion-bg` | `var(--hub-sys-surface-page, #fff)` |
| `--hub-accordion-transition` | `color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, border-radius 0.15s ease` |
| `--hub-accordion-border-color` | `var(--hub-sys-border-color-default, rgba(0, 0, 0, 0.125))` |
| `--hub-accordion-border-width` | `var(--hub-ref-border-width, 1px)` |
| `--hub-accordion-border-radius` | `var(--hub-ref-radius-sm, 0.25rem)` |
| `--hub-accordion-inner-border-radius` | `calc(var(--hub-accordion-border-radius, var(--hub-ref-radius-sm, 0.25rem)) - var(--hub-accordion-border-width, var(--hub-ref-border-width, 1px)))` |

### Header/Button

| Variable | Default |
|---|---|
| `--hub-accordion-btn-padding-x` | `1.25rem` |
| `--hub-accordion-btn-padding-y` | `var(--hub-ref-space-3, 1rem)` |
| `--hub-accordion-btn-color` | `var(--hub-sys-text-primary, #212529)` |
| `--hub-accordion-btn-bg` | `var(--hub-sys-surface-page, #fff)` |
| `--hub-accordion-btn-focus-box-shadow` | `0 0 0 var(--hub-sys-focus-ring-width, 0.25rem) var(--hub-sys-focus-ring-color, rgba(13, 110, 253, 0.25))` |
| `--hub-accordion-active-color` | `var(--hub-sys-color-primary, #0c63e4)` |
| `--hub-accordion-active-bg` | `var(--hub-sys-color-primary-subtle, #e7f1ff)` |

### Icon

| Variable | Default |
|---|---|
| `--hub-accordion-icon-color` | `var(--hub-accordion-btn-color, var(--hub-sys-text-primary, #212529))` |
| `--hub-accordion-icon-active-color` | `var(--hub-accordion-active-color, var(--hub-sys-color-primary, #0d6efd))` |
| `--hub-accordion-btn-icon-mask` | SVG mask chevron |
| `--hub-accordion-btn-icon-width` | `1.25rem` |
| `--hub-accordion-btn-icon-transform` | `rotate(-180deg)` |
| `--hub-accordion-btn-icon-transition` | `transform 0.2s ease-in-out` |

Default direction behavior:

- collapsed: chevron points down,
- expanded: chevron points up (via `--hub-accordion-btn-icon-transform`).

Legacy aliases kept for compatibility:

| Variable | Mapping |
|---|---|
| `--hub-accordion-btn-icon` | `var(--hub-accordion-btn-icon-mask)` |
| `--hub-accordion-btn-active-icon` | `var(--hub-accordion-btn-icon-mask)` |

### Body

| Variable | Default |
|---|---|
| `--hub-accordion-body-padding-x` | `1.25rem` |
| `--hub-accordion-body-padding-y` | `var(--hub-ref-space-3, 1rem)` |

### Collapse Animation

| Variable | Default |
|---|---|
| `--hub-accordion-collapse-transition-duration` | `0.25s` |
| `--hub-accordion-collapse-transition-easing` | `cubic-bezier(0.4, 0, 0.2, 1)` |

---

## Customization Examples

### Brand Colors (Framework-Agnostic)

```scss
.hub-accordion {
  --hub-accordion-btn-bg: #f8f9fa;
  --hub-accordion-active-bg: #0d6efd;
  --hub-accordion-active-color: #ffffff;
  --hub-accordion-icon-color: #6c757d;
  --hub-accordion-icon-active-color: #ffffff;
}
```

### Brand Colors (Bootstrap Integration - Optional)

```scss
.hub-accordion {
  --hub-accordion-btn-bg: var(--bs-light);
  --hub-accordion-active-bg: var(--bs-primary);
  --hub-accordion-active-color: var(--bs-white);
  --hub-accordion-icon-color: var(--bs-secondary);
  --hub-accordion-icon-active-color: var(--bs-white);
}
```

### Custom Chevron Shape

```scss
.hub-accordion {
  --hub-accordion-btn-icon-mask: url("data:image/svg+xml;charset=UTF-8,%3Csvg ... %3C/svg%3E");
}
```

### Dark Surface (Framework-Agnostic)

```scss
.app-theme-dark .hub-accordion {
  --hub-accordion-bg: #212529;
  --hub-accordion-color: #fff;
  --hub-accordion-btn-bg: #343a40;
  --hub-accordion-btn-color: #fff;
  --hub-accordion-border-color: #495057;
}
```

### Dark Surface (Bootstrap Integration - Optional)

```scss
[data-bs-theme='dark'] .hub-accordion {
  --hub-accordion-bg: #212529;
  --hub-accordion-color: #fff;
  --hub-accordion-btn-bg: #343a40;
  --hub-accordion-btn-color: #fff;
  --hub-accordion-border-color: #495057;
}
```

---

## Best Practices

- Prefer overriding component tokens (`--hub-accordion-*`) instead of hardcoded selectors.
- Override `--hub-sys-*` tokens for global consistency across multiple components.
- Keep focus ring tokens accessible (`width` + `color`) and avoid removing focus styles.
- Keep legacy aliases only for migration; prefer canonical icon tokens for new code.
