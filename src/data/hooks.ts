import { useDispatch } from 'react-redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import type { AppDispatch } from './store';
import type { AppState } from './store';

// do not use it root store imports slice from your feature. It will cause dependency cycle
// move redux slice to root level or move it to context to use this hook
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
