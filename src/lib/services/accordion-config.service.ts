import { Injectable, signal } from '@angular/core';

/**
 * Global configuration interface for accordion components.
 */
export interface AccordionGlobalConfig {
	/**
	 * Default animation duration in milliseconds.
	 * @default 300
	 */
	animationDuration: number;

	/**
	 * Whether multiple panels can be open by default.
	 * @default false
	 */
	multipleDefault: boolean;

	/**
	 * Whether flush mode is enabled by default.
	 * @default false
	 */
	flushDefault: boolean;

	/**
	 * Default theme for accordion styling.
	 * @default 'default'
	 */
	theme: 'default' | 'corporate' | 'vibrant' | 'dark' | string;

	/**
	 * Whether to enable accessibility features by default.
	 * @default true
	 */
	accessibilityEnabled: boolean;

	/**
	 * Whether to show warnings in development mode.
	 * @default true
	 */
	developmentWarnings: boolean;

	/**
	 * Custom CSS class prefix for accordion components.
	 * @default 'hub-accordion'
	 */
	cssPrefix: string;

	/**
	 * Whether animations are enabled globally.
	 * @default true
	 */
	animationsEnabled: boolean;
}

/**
 * Default configuration values.
 */
const DEFAULT_CONFIG: AccordionGlobalConfig = {
	animationDuration: 300,
	multipleDefault: false,
	flushDefault: false,
	theme: 'default',
	accessibilityEnabled: true,
	developmentWarnings: true,
	cssPrefix: 'hub-accordion',
	animationsEnabled: true
};

/**
 * Global configuration service for accordion components.
 * Provides centralized configuration management with type safety and validation.
 * 
 * @example
 * ```typescript
 * // In your app config or module
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     // other providers...
 *     {
 *       provide: ACCORDION_CONFIG,
 *       useValue: {
 *         theme: 'corporate',
 *         animationDuration: 500,
 *         multipleDefault: true
 *       }
 *     }
 *   ]
 * };
 * 
 * // Or use the service directly
 * constructor(private accordionConfig: AccordionConfigService) {
 *   this.accordionConfig.updateConfig({
 *     theme: 'dark',
 *     animationsEnabled: false
 *   });
 * }
 * ```
 */
@Injectable({
	providedIn: 'root'
})
export class AccordionConfigService {
	/**
	 * Signal containing the current global configuration.
	 * @private
	 */
	private config = signal<AccordionGlobalConfig>({ ...DEFAULT_CONFIG });

	/**
	 * Updates the global configuration with partial values.
	 * Validates input values and provides warnings for invalid options.
	 * 
	 * @param partialConfig - Partial configuration object to merge with current config
	 * @example
	 * ```typescript
	 * configService.updateConfig({
	 *   theme: 'corporate',
	 *   animationDuration: 500
	 * });
	 * ```
	 */
	updateConfig(partialConfig: Partial<AccordionGlobalConfig>): void {
		const validatedConfig = this.validateConfig(partialConfig);
		
		this.config.update(currentConfig => ({
			...currentConfig,
			...validatedConfig
		}));

		if (this.config().developmentWarnings) {
			this.logConfigUpdate(validatedConfig);
		}
	}

	/**
	 * Gets the current global configuration as a readonly signal.
	 * 
	 * @returns Readonly signal with current configuration
	 * @example
	 * ```typescript
	 * const config = configService.getConfig();
	 * const animationDuration = config().animationDuration;
	 * ```
	 */
	getConfig() {
		return this.config.asReadonly();
	}

	/**
	 * Resets the configuration to default values.
	 * 
	 * @example
	 * ```typescript
	 * configService.resetToDefaults();
	 * ```
	 */
	resetToDefaults(): void {
		this.config.set({ ...DEFAULT_CONFIG });
		
		if (this.config().developmentWarnings) {
			console.info('[AccordionConfigService] Configuration reset to defaults');
		}
	}

	/**
	 * Gets a specific configuration value with type safety.
	 * 
	 * @param key - Configuration key to retrieve
	 * @returns The configuration value
	 * @example
	 * ```typescript
	 * const duration = configService.getValue('animationDuration');
	 * ```
	 */
	getValue<K extends keyof AccordionGlobalConfig>(key: K): AccordionGlobalConfig[K] {
		return this.config()[key];
	}

	/**
	 * Validates and sanitizes configuration values.
	 * 
	 * @param config - Configuration object to validate
	 * @returns Validated and sanitized configuration
	 * @private
	 */
	private validateConfig(config: Partial<AccordionGlobalConfig>): Partial<AccordionGlobalConfig> {
		const validated: Partial<AccordionGlobalConfig> = {};

		if (config.animationDuration !== undefined) {
			if (typeof config.animationDuration === 'number' && config.animationDuration >= 0) {
				validated.animationDuration = Math.max(0, Math.min(5000, config.animationDuration));
			} else {
				this.warn('animationDuration must be a positive number, using default value');
			}
		}

		if (config.multipleDefault !== undefined) {
			if (typeof config.multipleDefault === 'boolean') {
				validated.multipleDefault = config.multipleDefault;
			} else {
				this.warn('multipleDefault must be a boolean, using default value');
			}
		}

		if (config.flushDefault !== undefined) {
			if (typeof config.flushDefault === 'boolean') {
				validated.flushDefault = config.flushDefault;
			} else {
				this.warn('flushDefault must be a boolean, using default value');
			}
		}

		if (config.theme !== undefined) {
			if (typeof config.theme === 'string' && config.theme.length > 0) {
				validated.theme = config.theme;
			} else {
				this.warn('theme must be a non-empty string, using default value');
			}
		}

		if (config.accessibilityEnabled !== undefined) {
			if (typeof config.accessibilityEnabled === 'boolean') {
				validated.accessibilityEnabled = config.accessibilityEnabled;
			} else {
				this.warn('accessibilityEnabled must be a boolean, using default value');
			}
		}

		if (config.developmentWarnings !== undefined) {
			if (typeof config.developmentWarnings === 'boolean') {
				validated.developmentWarnings = config.developmentWarnings;
			}
		}

		if (config.cssPrefix !== undefined) {
			if (typeof config.cssPrefix === 'string' && config.cssPrefix.length > 0) {
				validated.cssPrefix = config.cssPrefix;
			} else {
				this.warn('cssPrefix must be a non-empty string, using default value');
			}
		}

		if (config.animationsEnabled !== undefined) {
			if (typeof config.animationsEnabled === 'boolean') {
				validated.animationsEnabled = config.animationsEnabled;
			} else {
				this.warn('animationsEnabled must be a boolean, using default value');
			}
		}

		return validated;
	}

	/**
	 * Logs configuration updates in development mode.
	 * 
	 * @param config - Updated configuration values
	 * @private
	 */
	private logConfigUpdate(config: Partial<AccordionGlobalConfig>): void {
		const keys = Object.keys(config);
		if (keys.length > 0) {
			console.info('[AccordionConfigService] Configuration updated:', 
				keys.map(key => `${key}: ${config[key as keyof AccordionGlobalConfig]}`).join(', ')
			);
		}
	}

	/**
	 * Logs warnings for invalid configuration values.
	 * 
	 * @param message - Warning message
	 * @private
	 */
	private warn(message: string): void {
		if (this.config().developmentWarnings) {
			console.warn(`[AccordionConfigService] ${message}`);
		}
	}
}

/**
 * Injection token for providing global accordion configuration.
 * Use this token to provide custom configuration at application startup.
 * 
 * @example
 * ```typescript
 * import { ACCORDION_CONFIG } from 'ng-hub-ui-accordion';
 * 
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     {
 *       provide: ACCORDION_CONFIG,
 *       useValue: {
 *         theme: 'corporate',
 *         animationDuration: 500
 *       }
 *     }
 *   ]
 * };
 * ```
 */
export const ACCORDION_CONFIG = 'ACCORDION_CONFIG';