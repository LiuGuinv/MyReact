// 引入combineReducers
import { combineReducers } from "redux";
// 引入要合并的reducer
import cartReducer from './cartReducer';
import commonReducer from './commonReducer';

// 合并多个reducer，用combineReducers
let rootReducer = combineReducers({
    cartReducer,
    commonReducer
});

export default rootReducer;