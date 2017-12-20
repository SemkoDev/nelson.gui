import React from 'react';
import NelsonPeersListing from './NelsonPeersListing'
import { Card, CardHeader, CardText  } from 'material-ui';

export default function NelsonPeers (props) {
    const { nelsonData, nelsonPeers, nelsonPeersError, className } = props;
    return (
        <Card className={className}>
            <CardHeader
                title='Peers'
                subtitle={`Total number of known peers: ${nelsonData ? nelsonData.totalPeers : 0}`}
            />
            <CardText>
                {
                    nelsonData
                        ? <NelsonPeersListing {...{ nelsonData, nelsonPeers }}/>
                        : <NoData {...{ nelsonPeersError }}/>
                }
            </CardText>
        </Card>
    )
}

function NoData ({ nelsonPeersError }) {
    return <div>{'No peers info available. Is Nelson running?'}</div>
}