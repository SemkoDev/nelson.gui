import React from 'react';
import NelsonStatusData from './NelsonStatusData'
import { Card, CardHeader, CardText  } from 'material-ui';

export default function NelsonStatus (props) {
    const { nelsonData, nelsonDataError, className, updateInterval, connection } = props;
    return (
        <Card className={className}>
            <CardHeader
                title={`Nelson Status`}
                subtitle={
                    `Updated each ${updateInterval / 1000} seconds from ${connection.hostname}:${connection.port}`
                }
            />
            <CardText>
                {
                    nelsonData
                        ? <NelsonStatusData {...{ nelsonData }}/>
                        : <NoData {...{ nelsonDataError }}/>
                }
            </CardText>
        </Card>
    )
}

function NoData ({ nelsonDataError }) {
    return <div>{'No data available. Is Nelson running?'}</div>
}