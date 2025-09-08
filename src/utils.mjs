import { rerender, useState } from "src/jsgui/jsgui.mjs";

/**
 * @template T
 * @typedef {Object} UseGetRequestProps
 * @property {Component} parent
 * @property {string} [key] - required if you want to call this in arbitrary order, else same rules as React
 * @property {() => Promise<T>} fetch
 * @property {(errorOrResponse: any) => void} [onError]
 * @property {string} [refetchOn]
 */
/**
 * @template T
 * @param {UseGetRequestProps<T>} props
 * @returns {[boolean, T, () => void, boolean]} */
export function useGetRequest(props) {
  const {parent, key = "useGetRequest", fetch, onError, refetchOn} = props;
  let defaultValue;
  if (!("defaultValue" in props)) defaultValue = [];
  const state = useState(parent, key, {
    prevRefetchOn: /** @type {string | null} */(null),
    loading: true,
    value: /** @type {T} */(defaultValue),
  });
  const refetch = () => {
    Promise.try(fetch).then((response) => {
      state.value = response;
      state.loading = false;
      rerender();
    }).catch(onError);
  }
  const refetchOn_string = JSON.stringify(refetchOn);
  if (refetchOn_string !== state.prevRefetchOn) {
    state.prevRefetchOn = refetchOn_string;
    refetch();
  }
  const isInitialLoad = state.prevRefetchOn === null;
  return [state.loading, state.value, refetch, isInitialLoad];
}
