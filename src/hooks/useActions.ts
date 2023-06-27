import {useDispatch} from "react-redux";
import {rootActions} from "@/src/store/root-actions";
import {useMemo} from "react";
import {bindActionCreators} from "redux";

export const useActions = () => {
    const dispatch = useDispatch()

    return useMemo(()=> bindActionCreators(rootActions, dispatch), [dispatch])
}