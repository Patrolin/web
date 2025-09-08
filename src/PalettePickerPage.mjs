import { div, span } from "src/jsgui/jsgui.mjs";

/**
 * @param {Component} parent
 * @returns {Component} */
export function PalettePickerPage(parent) {
  const wrapper = div(parent);
  span(wrapper, "PalettePickerPage");
  return wrapper;
}
