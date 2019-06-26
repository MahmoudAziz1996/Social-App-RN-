import Types from '../actions/types'

const INITIAL_STATE = { loading: false, error: '', profile: null, signedup: false }
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.ATTEMPTING:
            return { ...state, loading: true }
        case Types.SIGN_FAILED:
            return { ...state, loading: false, error: action.payload }
        case Types.SIGN_SUCCESS:
            return { ...state, loading: false, error: '', signedup: true }
        case Types.LOGIN_SUCCESS:
            return { ...state, loading: false, profile: action.payload, error: '' };
        default:
            return state;
    }
}