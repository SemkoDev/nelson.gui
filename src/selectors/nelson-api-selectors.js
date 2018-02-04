import { createSelector } from 'reselect';

const nelsonStoreSelect = (state) => state.nelson || {};

export const connectionSelect = createSelector(
    nelsonStoreSelect,
    (nelson) => ({
        auth: nelson.auth
    })
);

export const peersSelect = createSelector(
    nelsonStoreSelect,
    (nelson) => nelson.nelsonPeers
);

export const peersErrorSelect = createSelector(
    nelsonStoreSelect,
    (nelson) => nelson.nelsonPeersError
);

export const dataSelect = createSelector(
    nelsonStoreSelect,
    (nelson) => nelson.nelsonData
);

export const dataErrorSelect = createSelector(
    nelsonStoreSelect,
    (nelson) => nelson.nelsonDataError
);

export const configSelect = createSelector(
    dataSelect,
    (data) => data ? data.config : {}
)

export const intervalSelect = createSelector(
    nelsonStoreSelect,
    configSelect,
    (nelson, config) => (config.beatInterval || nelson.updateInterval || 5) * 1000
)
