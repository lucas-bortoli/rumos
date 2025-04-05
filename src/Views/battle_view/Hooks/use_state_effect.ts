import React, { useRef, useEffect } from "react";

export default function useStateEffect<
  DependencyList extends readonly unknown[],
  Destructor = () => void,
>(
  handler: (current: DependencyList, previous: DependencyList) => Destructor | void,
  dependencyList: DependencyList
) {
  const previousDependencyList = useRef(dependencyList);

  useEffect(() => {
    const destructor = handler(dependencyList, previousDependencyList.current);
    previousDependencyList.current = dependencyList;

    return () => {
      if (typeof destructor === "function") destructor();
    };
  }, dependencyList);
}
