import { Component, memo, useCallback } from "react"
import { isEqual } from "../../utils/helper";

const useStyledComponents = (module: any) => {

  const getStyledComponent = useCallback((Component: any, key: string) => {
    return memo(module[key](Component), isEqual);
  }, [Component])

  return {
    getStyledComponent
  }
}

export default useStyledComponents