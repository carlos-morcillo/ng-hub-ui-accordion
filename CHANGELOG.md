# Changelog

All notable changes to the ng-hub-ui-accordion library will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [19.0.6] - 2024-09-15

### Added
- Comprehensive documentation page with functional examples
- Multiple expansion example component demonstrating `[multiple]="true"` functionality
- Reactive forms integration example with real-time value display and form control binding
- Template-driven forms example component with NgModel integration
- Custom header templates example with icons, badges, and custom styling
- Complex interactive headers example with order management, status badges, and action buttons
- Flush (borderless) mode example component showing `[options]="{ flush: true }"` usage
- Dynamic panels example with add/remove functionality using Angular signals
- Custom value comparison example for complex objects with `compareWith` function
- Accessibility example with ARIA attributes, keyboard navigation, and screen reader support
- Live functional examples in documentation with syntax highlighting using ngx-highlightjs
- Global library page styling with BEM methodology for consistent documentation layout
- Example demo containers with visual indicators and professional styling

### Changed
- Updated documentation structure with Overview, Functionalities, API, and Styling tabs
- Enhanced code examples with proper TypeScript and HTML syntax highlighting
- Improved example organization by functionality categories (Core Features, Form Integration, Custom Templates, Advanced Configuration, Accessibility Features)
- Refactored existing example components to follow standardized structure
- Updated library interface with complete information from README documentation

### Fixed
- Added missing imports (JsonPipe, DatePipe) to example components for proper functionality
- Corrected template syntax in complex header example to use modern Angular control flow (@for)
- Fixed item tracking with proper id properties in dynamic examples

## [19.0.5] - 2024-03-15

### Added
- Full Angular 19 compatibility
- Enhanced Angular Signals integration
- Improved Bootstrap 5 styling compatibility

### Fixed
- Performance optimizations with contentChildren

### Changed
- Comprehensive documentation updates

## [19.0.0] - 2024-01-15

### Changed
- Migrated to Angular 19 with standalone components
- Updated to use Angular Signals architecture throughout

### Added
- Full Angular Signals Support with model(), input(), output()
- Complete Form Integration with ControlValueAccessor
- ARIA accessibility improvements
- Custom Header Templates support with hubAccordionPanelHeader directive

### Removed
- Legacy NgModule-based architecture
- Deprecated API methods from previous versions

## [18.2.1] - 2023-12-01

### Added
- Initial accordion component implementation
- Basic expand/collapse functionality
- Bootstrap 5 styling integration

### Fixed
- Initial bug fixes and stability improvements

## [18.2.0] - 2023-11-15

### Added
- Project initialization
- Core accordion structure
- Basic documentation setup

---

## Migration Notes

### From 19.0.5 to 19.0.6
- No breaking changes
- New example components are available for reference
- Documentation structure enhanced with functional examples

### From 19.0.0 to 19.0.5
- No breaking changes
- Improved performance and compatibility

### From 18.x to 19.0.0
- **BREAKING**: Migrated from NgModule to standalone components
- **BREAKING**: Updated to Angular Signals architecture
- Update imports from module-based to component-based imports
- Replace deprecated API methods with new Signals-based API

## Examples Documentation

This version includes comprehensive examples demonstrating:

1. **Core Features**
   - Basic Setup
   - Multiple Panel Expansion

2. **Form Integration**
   - Reactive Forms
   - Template-driven Forms

3. **Custom Templates**
   - Custom Header Templates
   - Complex Interactive Headers

4. **Advanced Configuration**
   - Flush (Borderless) Mode
   - Dynamic Panels
   - Custom Value Comparison

5. **Accessibility Features**
   - Keyboard Navigation
   - Screen Reader Support

All examples are fully functional and include complete code samples with syntax highlighting.