import {TypedUseSelectorHook, useSelector} from "react-redux";
import {TypedRootState} from "@/src/store/store";

export const useTypedSelector:TypedUseSelectorHook<TypedRootState> = useSelector;