import React from 'react';
import { Card, CardHeader, CardText  } from 'material-ui';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

export default function NelsonPeerStats (props) {
    const { nelsonData, nelsonPeersError, className } = props;
    return (
        <Card {...{ className }}>
            <CardHeader
                title='Peer Stats'
                subtitle={`Total number of known peers: ${nelsonData ? nelsonData.totalPeers : 0}`}
                actAsExpander={true}
                showExpandableButton={true}
            />
            <CardText expandable={true}>
                {
                    nelsonData && nelsonData.peerStats
                        ? <PeerStats peerStats={nelsonData.peerStats} />
                        : <NoData {...{ nelsonPeersError }} />
                }
            </CardText>
        </Card>
    )
}

function PeerStats ({ peerStats }) {
    return (
        <div>
            <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>Time Frame</TableHeaderColumn>
                        <TableHeaderColumn>New Nodes</TableHeaderColumn>
                        <TableHeaderColumn>Active Nodes</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <PeerStatsRow {...{ peerStats }} timeframe='hour' label='one hour' />
                    <PeerStatsRow {...{ peerStats }} timeframe='four' label='4 hours' />
                    <PeerStatsRow {...{ peerStats }} timeframe='twelve' label='12 hours' />
                    <PeerStatsRow {...{ peerStats }} timeframe='day' label='day' />
                    <PeerStatsRow {...{ peerStats }} timeframe='week' label='week' />
                </TableBody>
            </Table>
        </div>
    )
}

function PeerStatsRow ({ peerStats, timeframe, label }) {
    return (
        <TableRow>
            <TableRowColumn>{ label }</TableRowColumn>
            <TableRowColumn>{ peerStats.newNodes[timeframe + 'Ago'] }</TableRowColumn>
            <TableRowColumn>{ peerStats.activeNodes[timeframe + 'Ago'] }</TableRowColumn>
        </TableRow>
    )
}

function NoData ({ nelsonPeersError }) {
    return <div>{'No peers info available. Is Nelson running?'}</div>
}