import { createContext } from 'react';

type ContextValueType = {
  isCollapsed: boolean,
  setIsCollapsed: (arg0: boolean) => void,
};

const contextDefaultValue: ContextValueType = {
  isCollapsed: true,
  setIsCollapsed: () => {},
};

const ProjectCardContext = createContext(contextDefaultValue);

export default ProjectCardContext;
