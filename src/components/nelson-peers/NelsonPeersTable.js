import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';


export default function NelsonPeersTable({ name, peers }) {
    return (
        <div>
            <div>{name}: {peers.length}</div>
            <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>Hostname / IP</TableHeaderColumn>
                        <TableHeaderColumn>Port</TableHeaderColumn>
                        <TableHeaderColumn>Weight</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { peers.map((peer, idx) => (
                        <PeerRow {...{peer}} key={idx} />
                    )) }
                </TableBody>
            </Table>
        </div>
    )
}

function PeerRow ({ peer }) {
    return (
        <TableRow>
            <TableRowColumn>{ peer.hostname || peer.ip }</TableRowColumn>
            <TableRowColumn>{ peer.port }</TableRowColumn>
            <TableRowColumn>{ parseFloat(peer.weight).toFixed(4) }</TableRowColumn>
        </TableRow>
    )
}
