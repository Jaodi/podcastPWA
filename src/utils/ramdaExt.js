import { path, assocPath } from 'ramda';

export const mapPath = (func, Path) => obj => 
  assocPath(Path, func(path(Path, obj)), obj)