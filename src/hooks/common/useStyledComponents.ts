
const useStyledComponents = (module: any) => {
  const getStyledComponent = (Component: any, key: string) => {
    return module[key](Component);
  }

  return {
    getStyledComponent
  }
}

export default useStyledComponents