// Actions
const NELSON_DATA_FETCH_SUCCESS = 'NELSON_DATA_FETCH_SUCCESS';
const NELSON_DATA_FETCH_ERROR = 'NELSON_DATA_FETCH_ERROR';
const NELSON_PEERS_FETCH_SUCCESS = 'NELSON_PEERS_FETCH_SUCCESS';
const NELSON_PEERS_FETCH_ERROR = 'NELSON_PEERS_FETCH_ERROR';
const NELSON_CHANGE_CONNECTION = 'NELSON_CHANGE_CONNECTION';

const defaultState = {
    updateInterval: 5,
    hostname: 'localhost',
    port: 18600
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
                hostname: action.hostname,
                port: action.port
            });
        default: return state;
    }
}

// Action Creators
export function getNelsonData ({ hostname, port }) {
    return (dispatch) => {
        return fetchNelsonData({ hostname, port }).then(
            jsonResponse(dispatch, fetchNelsonDataSuccess),
            (error) => dispatch(fetchNelsonDataError(error))
        )
    }
}

export function getNelsonPeers ({ hostname, port }) {
    return (dispatch) => {
        return fetchNelsonPeers({ hostname, port }).then(
            jsonResponse(dispatch, fetchNelsonPeersSuccess),
            (error) => dispatch(fetchNelsonPeersError(error))
        )
    }
}

export function changeConnection ({ hostname, port }) {
    return {
        type: NELSON_CHANGE_CONNECTION,
        hostname,
        port
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

function fetchNelsonData ({ hostname, port }) {
    return fetch(`http://${hostname}:${port}`);
}

function fetchNelsonPeers ({ hostname, port }) {
    return fetch(`http://${hostname}:${port}/peers`);
}
