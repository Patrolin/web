import { div, findMatchingRoute, renderBody, span } from "../jsgui-2/jsgui.mjs";
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
 * @param {boolean} isMatchingRoute */
function NavmenuItem(parent, route, isMatchingRoute) {
  span(parent, route.label, {
    width: "100%",
    padding: "4px 8px",
    className: "navmenu-link",
    attributes: {"data-matching-route": isMatchingRoute},
  });
}

/**
 * @param {Component} parent
 * @returns {Component} */
function App(parent) {
  const matchingRoute = findMatchingRoute(routes, "/web");
  // navmenu
  const wrapper = div(parent, {
    width: "100%",
    height: "100%",
    flex: "x",
    flexAlign: "justify",
  });
  const navmenu = div(wrapper, {
    width: 200,
    height: "100%",
    background: "#303030",
    flex: "y",
    flexAlign: "scroll",
  });
  for (let route of routes) {
    NavmenuItem(navmenu, route, route === matchingRoute);
  }
  // matching route
  const contentWrapper = div(wrapper, {
    autoSize: 1,
    height: "100%",
    flex: "y",
    flexAlign: "scroll",
  });
  matchingRoute?.component(contentWrapper);
  return wrapper;
}
renderBody(App, {});
