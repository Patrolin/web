import { div, span } from "../jsgui-2/jsgui.mjs";

/**
 * @param {Component} parent
 * @returns {Component} */
export function PalettePickerPage(parent) {
  const wrapper = div(parent);
  span(wrapper, "PalettePickerPage");
  return wrapper;
}
