import { div, span } from "src/jsgui/jsgui.mjs";
import { useGetRequest } from "./utils.mjs";

/**
 * @typedef {Object} GithubFile
 * @property {string} name
 * @property {string} download_url
 */

/**
 * @param {Component} parent
 * @returns {Component} */
export function RecipesPage(parent) {
  const [recipesLoading, recipeFiles] = useGetRequest({
    parent,
    fetch: async () => {
      const response = await (await fetch("https://api.github.com/repos/Patrolin/qrecipes/contents/src")).json();
      return /** @type {GithubFile[]} */(response);
    },
  });
  const recipes = recipeFiles.filter(v => v.name.endsWith(".toml"));

  const wrapper = div(parent, {width: "100%", height: "100%", attributes: {flex: "y", flexAlign: "start"}});
  for (let recipe of recipes) {
    span(wrapper, recipe.name);
  }
  console.log('ayaya.recipes', {recipesLoading, recipes})
  return wrapper;
}
