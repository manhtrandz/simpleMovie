import { useEffect, useState } from "react";

// export default function useDebounceSearchMovie(initValue = "", delay = 1000) {
//   const [debounceVal, setDebounceVal] = useState("");
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebounceVal(initValue);
//     }, delay);
//     return () => {
//       clearInterval(timer);
//     };
//   }, [initValue, delay]);
//   return {
//     debounceVal,
//   };
// }

export default function useDebounce(value = "", delay = 1000) {
  // Save a local copy of `value` in this state which is local to our hook
  const [state, setState] = useState(value);

  useEffect(() => {
    // Set timeout to run after delay
    const handler = setTimeout(() => setState(value), delay);

    // clear the setTimeout listener on unMount
    return () => clearTimeout(handler);
  }, [value, delay]);

  return state;
}
