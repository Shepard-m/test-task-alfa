import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { TState, TAppDispatch } from './state';

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector = useSelector;