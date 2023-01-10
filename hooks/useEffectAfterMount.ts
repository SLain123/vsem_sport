import { useRef, useEffect } from "react";

const useEffectAfterMount = (cb: () => any, deps: any[]) => {
  const componentJustMounted = useRef(true);
  useEffect(() => {
    if (!componentJustMounted.current) {
      return cb();
    }
    componentJustMounted.current = false;
  }, deps);
};

export { useEffectAfterMount };
