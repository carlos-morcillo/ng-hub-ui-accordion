/**
 * Represents an event that occurs when a collapsible element changes state.
 *
 * @interface
 * @property {number} index - The index of the collapsed/expanded element
 * @property {boolean} collapsed - The current collapse state. True if collapsed, false if expanded
 */
export interface collapseEvent {
  index: number;
  collapsed: boolean;
}
