import React from 'react';
import NelsonPeersListing from './NelsonPeersListing'
import { Card, CardHeader, CardText  } from 'material-ui';

export default function NelsonPeers (props) {
    const { nelsonData, nelsonPeers, nelsonPeersError, className, connection } = props;
    return (
        <Card {...{ className }}>
            <CardHeader
                title='Peers Connected'
                subtitle={nelsonData ? nelsonData.connectedPeers.length : 0}
            />
            <CardText>
                {
                    nelsonData
                        ? <NelsonPeersListing {...{ nelsonData, nelsonPeers, connection }}/>
                        : <NoData {...{ nelsonPeersError }}/>
                }
            </CardText>
        </Card>
    )
}

function NoData ({ nelsonPeersError }) {
    return <div>{'No peers info available. Is Nelson running?'}</div>
}