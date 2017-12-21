import React from 'react';
import {ForceGraph, ForceGraphNode, ForceGraphLink} from 'react-vis-force';
import NelsonPeersTable from './NelsonPeersTable'

export default class NelsonPeersListing extends React.Component {

    componentDidUpdate() {
        this.fg && this.fg.simulation && this.fg.simulation.restart()
    }

    render () {
        const { nelsonData, nelsonPeers, connection } = this.props
        const nodesPeers = nelsonData.connectedPeers.map((peer) => {
            return {
                id: peer.hostname || peer.ip + ':' + peer.port,
                fill: '#11939A',
                radius: 5 + ( 20 *  peer.weight )
            }
        });
        const myNodeId = connection.hostname + ':' + connection.port;
        const myNode = {
            id: myNodeId,
            fill: '#EF5350',
            radius: 25,
        };
        const edges = nodesPeers.map((node) => ({
            source: node.id,
            target: myNodeId,
        }))
        const myGraph = {
            nodes:[myNode, ...nodesPeers],
            edges
        };
        const simulationOptions = {
            height: 500,
            width: 700,
            animate: true,
            radiusMargin: 60
        };

        return (
            <div>
                <NelsonPeersTable
                    name="Connected Peers"
                    peers={nelsonData.connectedPeers}
                />
                <ForceGraph
                    {...{ simulationOptions }}
                    zoom
                    showLabels
                    ref={(el) => this.fg = el} >
                    {myGraph.nodes.map((node) => (
                        <ForceGraphNode {...{ node }} fill={node.fill} />
                    ))}

                    {myGraph.edges.map((edge) => (
                        <ForceGraphLink link={edge} />
                    ))}
                </ForceGraph>
            </div>
        );
    }
}
