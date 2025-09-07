import { rerender, useState } from "../jsgui-2/jsgui.mjs";

/**
 * @template T
 * @typedef {Object} UseGetRequestProps
 * @property {Component} parent
 * @property {string} [id] - required if you want to call this in arbitrary order, else same rules as React
 * @property {() => Promise<T>} fetch
 * @property {(errorOrResponse: any) => void} [onError]
 * @property {string} [refetchOn]
 */
/**
 * @template T
 * @param {UseGetRequestProps<T>} props
 * @returns {[boolean, T, () => void, boolean]} */
export function useGetRequest(props) {
  const {parent, id = "useGetRequest", fetch, onError, refetchOn} = props;
  let defaultValue;
  if (!("defaultValue" in props)) defaultValue = [];
  const state = useState(parent, id, {
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
  console.log('ayaya.refetch.0', {refetchOn_string, prevRefetchOn: state.prevRefetchOn})
  if (refetchOn_string !== state.prevRefetchOn) {
    console.log('ayaya.refetch')
    state.prevRefetchOn = refetchOn_string;
    refetch();
  }
  const isInitialLoad = state.prevRefetchOn === null;
  return [state.loading, state.value, refetch, isInitialLoad];
}
