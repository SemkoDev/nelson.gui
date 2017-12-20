import React from 'react';
import NelsonPeersTable from './NelsonPeersTable'

export default function NelsonPeersListing({ nelsonData, nelsonPeers }) {
    return (
        <NelsonPeersTable
            name="Connected Peers"
            peers={nelsonData.connectedPeers}
        />
    )
}
