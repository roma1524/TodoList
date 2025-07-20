import {useDispatch} from 'react-redux'
import {AppDispatch} from "../../store.ts";


export const useAppDispatch = useDispatch.withTypes<AppDispatch>()