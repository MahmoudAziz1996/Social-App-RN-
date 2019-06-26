import Types from '../actions/types'
const INITIAL_STATE = { loading: false, error: '', added: false, fetching: false, data: [] };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.ADDING_POST: 
            return { ...state, loading: true };
        case Types.ADDING_SUCCESS: 
            return { ...state, loading: false, added: true };
        case Types.ADDING_FAILED:
            return { ...state, loading: false, added: false, error: action.payload };
            case Types.Fetshing:
                return { ...state, fetching: true };
            case Types.Fetshing_Done: 
                return { ...state, fetching: false, data: action.payload };
        default:
            return state;
    }
};