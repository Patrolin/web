import { li, link, span, ul, useGetRequest, useMemo } from "src/jsgui/jsgui.mjs";

/**
 * @typedef {Object} Recipe
 * @property {string} group
 * @property {string} path
 * @property {string} name
 */
/**
 * @typedef {{[groupKey: string]: RecipeGroup | Recipe}} RecipeGroup
 */

/**
 * @param {Component} parent
 * @returns {Component} */
export function RecipesPage(parent) {
  const [recipesLoading, recipesYaml] = useGetRequest(parent, {
    defaultValue: "",
    fetch: async () => {
      const response = await (await fetch("https://raw.githubusercontent.com/Patrolin/qrecipes/refs/heads/main/index.yaml")).text();
      return /** @type {string} */(response);
    },
  });
  const recipesRoot = useMemo(parent, {
    value: () => {
      const recipes = /** @type {Recipe[]} */([]);
      for (const line of recipesYaml.split("\n")) {
        if (line.startsWith("#") || !line.startsWith("- ")) continue;
        const i = line.indexOf(": ");
        const path = line.slice(2, i);
        const file_name_index = path.lastIndexOf("/");
        const group = path.slice(0, file_name_index);
        const name = line.slice(i + 2);
        recipes.push({
          group,
          path,
          name,
        });
      }
      const recipesRoot = /** @type {RecipeGroup} */({});
      for (const recipe of recipes) {
        let currentNode = recipesRoot;
        const groupPath = recipe.group.split("/");
        for (let groupKey of groupPath) {
          if (!(groupKey in currentNode)) {
            currentNode[groupKey] = /** @type {RecipeGroup} */({});
          }
          currentNode = /** @type {RecipeGroup} */(currentNode[groupKey]);
        }
        currentNode[recipe.name] = recipe;
      }
      return recipesRoot;
    },
    dependOn: [recipesYaml],
  });

  /** @param {Component} parent
   *  @param {RecipeGroup} recipeGroup */
  const renderRecipeGroup = (parent, recipeGroup) => {
    const list = ul(parent);
    for (let [groupKey, node] of Object.entries(recipeGroup)) {
      console.log('ayaya.node', groupKey, node);
      const listItem = li(list);
      if ('name' in node) {
        // TODO: dropdowns
        span(listItem, groupKey);
      } else {
        span(listItem, groupKey);
        renderRecipeGroup(listItem, node);
      }
    }
  }
  console.log('ayaya.recipes', recipesRoot)
  renderRecipeGroup(parent, recipesRoot);
  return parent;
}
