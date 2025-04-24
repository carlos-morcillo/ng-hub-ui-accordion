/**
 * Represents the event emitted when an accordion or collapsible element changes its state.
 *
 * @template T - The type of value associated with the collapsible element.
 */
export interface CollapseEvent<T = any> {
	/**
	 * The index of the item within the collection of collapsible elements.
	 */
	index: number;

	/**
	 * Indicates whether the item is currently collapsed (`true`) or not (`false`).
	 */
	collapsed: boolean;

	/**
	 * Indicates whether the item is currently uncollapsed (`true`) or not (`false`).
	 * Useful when distinguishing explicitly expanded items.
	 */
	uncollapsed: boolean;

	/**
	 * The value associated with the collapsible element.
	 */
	value: T;
}
