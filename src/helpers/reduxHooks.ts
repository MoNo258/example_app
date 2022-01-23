import {
  shallowEqual,
  TypedUseSelectorHook,
  useDispatch,
  useSelector
} from "react-redux";
import { GlobalState, ReduxDispatch } from "../redux";

/**
 * Dispatch redux action that is aware of return type
 */
export const useGlobalDispatch = (): ReduxDispatch =>
  useDispatch<ReduxDispatch>();

/**
 * Inject global state property
 */
export const useGlobalState: TypedUseSelectorHook<GlobalState> = selector =>
  useSelector(selector, shallowEqual);
