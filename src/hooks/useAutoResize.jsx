import { useCallback, useEffect } from "react";

function useAutoResize(ref, ...deps) {
  const resize = useCallback(
    () => {
      if (ref.current) {
        ref.current.style.height = 'auto';
        ref.current.style.height = `${ref.current.scrollHeight}px`;
      }
    },
    [ref]
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [ref, ...deps]);

  return resize;
}

export default useAutoResize;
