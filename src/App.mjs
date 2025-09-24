import { div, findMatchingRoute, link, renderBody, span } from "src/jsgui/jsgui.mjs";
import { PalettePickerPage } from "./PalettePickerPage.mjs";
import { RecipesPage } from "./RecipesPage.mjs";

/**
 * @typedef {Object} Route
 * @property {string} label
 * @property {string} path
 * @property {(parent: Component) => void} component
 */
/** @type {Route[]} */
const routes = [
  {
    label: "Palette Picker",
    path: "/palette",
    component: PalettePickerPage,
  },
  {
    label: "Recipes",
    path: "/recipes",
    component: RecipesPage,
  },
];

/**
 * @param {Component} parent
 * @param {Route} route
 * @param {boolean} isSelected */
function NavmenuItem(parent, route, isSelected) {
  const wrapper = link(parent, "", {
    key: route.path,
    width: "100%",
    className: "navmenu-link",
    attributes: {"data-is-selected": isSelected, href: route.path},
  });
  span(wrapper, route.label);
}

/**
 * @param {Component} parent
 * @returns {Component} */
function App(parent) {
  const matchingRoute = findMatchingRoute(routes, "/web");
  // navmenu
  const navmenu = div(parent, {
    className: "navmenu",
    attributes: {flex: "y-scroll"},
  });
  for (let route of routes) {
    NavmenuItem(navmenu, route, route === matchingRoute);
  }
  // matching route
  const contentWrapper = div(parent, {
    className: "page-content",
    attributes: {flex: "y-scroll"},
  });
  matchingRoute?.component(contentWrapper);
  return parent;
}
renderBody(App, {
  attributes: {flex: "x-justify"},
});
