// Actions
const NELSON_DATA_FETCH_SUCCESS = 'NELSON_DATA_FETCH_SUCCESS';
const NELSON_DATA_FETCH_ERROR = 'NELSON_DATA_FETCH_ERROR';
const NELSON_PEERS_FETCH_SUCCESS = 'NELSON_PEERS_FETCH_SUCCESS';
const NELSON_PEERS_FETCH_ERROR = 'NELSON_PEERS_FETCH_ERROR';
const NELSON_CHANGE_CONNECTION = 'NELSON_CHANGE_CONNECTION';

const defaultState = {
    updateInterval: 5,
    auth: null
}

// Reducer
export default function reducer (state = defaultState, action = {}) {
    switch (action.type) {
        case NELSON_DATA_FETCH_SUCCESS:
            return Object.assign({} , state, {
                nelsonData: action.data,
                nelsonDataError: null
            });
        case NELSON_DATA_FETCH_ERROR:
            return Object.assign({}, state, {
                nelsonData: null,
                nelsonDataError: action.error
            });
        case NELSON_PEERS_FETCH_SUCCESS:
            return Object.assign({} , state, {
                nelsonPeers: action.peers,
                nelsonPeersError: null
            });
        case NELSON_PEERS_FETCH_ERROR:
            return Object.assign({}, state, {
                nelsonPeers: null,
                nelsonPeersError: action.error
            });
        case NELSON_CHANGE_CONNECTION:
            return Object.assign({} , state, {
                nelsonData: null,
                nelsonDataError: null,
                nelsonPeers: null,
                nelsonPeersError: null,
                auth: action.auth
            });
        default: return state;
    }
}

// Action Creators
export function getNelsonData ({ auth }) {
    return (dispatch) => {
        return fetchNelsonData({ auth }).then(
            jsonResponse(dispatch, fetchNelsonDataSuccess),
            (error) => dispatch(fetchNelsonDataError(error))
        )
    }
}

export function getNelsonPeers ({ auth }) {
    return (dispatch) => {
        return fetchNelsonPeers({ auth }).then(
            jsonResponse(dispatch, fetchNelsonPeersSuccess),
            (error) => dispatch(fetchNelsonPeersError(error))
        )
    }
}

export function changeConnection ({ auth }) {
    return {
        type: NELSON_CHANGE_CONNECTION,
        auth
    }
}

function fetchNelsonDataSuccess (data) {
    return {
        type: NELSON_DATA_FETCH_SUCCESS,
        data
    }
}

function fetchNelsonDataError (error) {
    return {
        type: NELSON_DATA_FETCH_ERROR,
        error
    }
}

function fetchNelsonPeersSuccess (peers) {
    return {
        type: NELSON_PEERS_FETCH_SUCCESS,
        peers
    }
}

function fetchNelsonPeersError (error) {
    return {
        type: NELSON_PEERS_FETCH_ERROR,
        error
    }
}

// Helpers

function jsonResponse (dispatch, whereTo) {
    return (response) => response.json().then((data) => dispatch(whereTo(data)))
}

function fetchNelsonData ({ auth }) {
    return fetch(`/api${auth ? `?auth=${auth}` : ''}`);
}

function fetchNelsonPeers ({ auth }) {
    return fetch(`/api/peers${auth ? `?auth=${auth}` : ''}`);
}
