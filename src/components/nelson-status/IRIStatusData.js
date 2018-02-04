import React from 'react';
import StatusListItem from './StatusListItem';
import { List, Divider } from 'material-ui';
import './style/NelsonStatusData.css';


export default function IRIStatusData ({ nelsonData }) {
    const { iriStats } = nelsonData;
    return (
        <List>
            <StatusListItem label='Is Healthy' value={nelsonData.isIRIHealthy ? 'yes' : 'no'} icon='heartbeat'/>
            <StatusListItem label='Is Synchronized' value={iriStats.latestSolidSubtangleMilestoneIndex > 338000 && iriStats.latestSolidSubtangleMilestoneIndex === iriStats.latestMilestoneIndex ? 'yes' : 'no'} icon='bullhorn'/>
            <StatusListItem label='Version' value={iriStats.appVersion} icon='flask'/>
            <StatusListItem label='Memory Usage' value={`${(iriStats.jreFreeMemory/iriStats.jreMaxMemory*100).toFixed(2)}%`} icon='microchip'/>
            <StatusListItem label='Neighbors' value={iriStats.neighbors} icon='users'/>
            <StatusListItem label='Tips' value={iriStats.tips} icon='arrow-right'/>
            <Divider/>
            <StatusListItem label='IRI Port' value={nelsonData.config.IRIPort} icon='plug'/>
            <StatusListItem label='TCP Port' value={nelsonData.config.TCPPort} icon='plug'/>
            <StatusListItem label='UDP Port' value={nelsonData.config.UDPPort} icon='plug'/>
        </List>
    )
}

