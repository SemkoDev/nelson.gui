import React from 'react';
import NelsonStatusData from './NelsonStatusData'
import IRIStatusData from './IRIStatusData'
import { Card, CardHeader, CardText  } from 'material-ui';

export default function NelsonStatus (props) {
    const { nelsonData, nelsonDataError, className, updateInterval } = props;
    return (
        <div>
            <Card className={className}>
                <CardHeader
                    title={`Nelson Status`}
                    subtitle={
                        `Updated each ${updateInterval / 1000} seconds.`
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
            <Card className={className}>
                <CardHeader
                    title={`IRI Status`}
                />
                <CardText>
                    {
                        nelsonData
                            ? <IRIStatusData {...{ nelsonData }}/>
                            : <NoData {...{ nelsonDataError }}/>
                    }
                </CardText>
            </Card>
        </div>
    )
}

function NoData ({ nelsonDataError }) {
    return <div>{'No data available. Is Nelson running?'}</div>
}