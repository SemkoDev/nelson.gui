import React from 'react';
import moment from '../../tools/moment';
import StatusListItem from './StatusListItem';
import { List, Divider, CircularProgress } from 'material-ui';
import './style/NelsonStatusData.css';


export default function NelsonStatusData ({ nelsonData }) {
    const startDateString = moment(nelsonData.heart.startDate).local().format('dddd, MMMM Do YYYY, HH:mm:ss.SSS');
    const duration = moment.duration(
        moment().local().diff(nelsonData.heart.startDate)
    ).format('d [days] h [hours] m [minutes] s [seconds]');

    const epochLabel = `Epoch (${nelsonData.config.epochInterval} s)`
    const cycleLabel = `Cycle (${nelsonData.config.cycleInterval} s)`
    const epochValue = (
        <ProgressValue
            currentNumber={nelsonData.heart.currentEpoch}
            lastTime={nelsonData.heart.lastEpoch}
            interval={nelsonData.config.epochInterval}
        />
    );
    const cycleValue = (
        <ProgressValue
            currentNumber={nelsonData.heart.currentCycle}
            lastTime={nelsonData.heart.lastCycle}
            interval={nelsonData.config.cycleInterval}
        />
    );

    const stats = nelsonData.iriStats;
    const synchronized = nelsonData.isIRIHealthy &&
        stats && stats.latestSolidSubtangleMilestoneIndex === stats.latestMilestoneIndex;
    const milestones = `( ${stats.latestSolidSubtangleMilestoneIndex} / ${stats.latestMilestoneIndex} )`;
    const yesno = (value) => value ? 'yes' : 'no';
    const memoryPercent = (stats.jreFreeMemory/stats.jreMaxMemory*100).toFixed(2);
    const memoryProgress = (
        <div className="interval-wrapper">
            <div className="interval-value">{`${memoryPercent}%`}</div>
            <div className="interval-progress">
                <CircularProgress
                    mode="determinate"
                    value={memoryPercent}
                    size={18}
                    thickness={5}
                />
            </div>
        </div>
    );

    return (
        <List>
            <StatusListItem label='Online since' value={startDateString} icon='calendar'/>
            <StatusListItem label='Online' value={duration} icon='clock-o'/>
            <StatusListItem label='Master Node' value={yesno(nelsonData.config.isMaster)} icon='plus-circle'/>
            <Divider/>
            <StatusListItem label={epochLabel} value={epochValue} icon='hourglass'/>
            <StatusListItem label={cycleLabel} value={cycleValue} icon='history'/>
            <Divider/>
            <StatusListItem label='IRI Version' value={stats.appVersion} icon='info'/>
            <StatusListItem label='Is IRI Healthy' value={yesno(nelsonData.isIRIHealthy)} icon='heartbeat'/>
            <StatusListItem label='Synchronized?' value={`${yesno(synchronized)} ${milestones}`} icon='wifi'/>
            <StatusListItem label='Tips' value={stats.tips || 0} icon='podcast'/>
            <StatusListItem label='Transactions to request'
                            value={stats.transactionsToRequest || 0}
                            icon='thermometer'/>
            <StatusListItem label='Memory Usage' value={memoryProgress} icon='microchip'/>
            <StatusListItem label='Total Neighbors' value={stats.neighbors} icon='users'/>
            <StatusListItem label='IRI Protocol' value={nelsonData.config.IRIProtocol || 'udp'} icon='handshake-o'/>
            <StatusListItem label='API Port' value={nelsonData.config.IRIPort} icon='plug'/>
            <StatusListItem label='TCP Port' value={nelsonData.config.TCPPort} icon='plug'/>
            <StatusListItem label='UDP Port' value={nelsonData.config.UDPPort} icon='plug'/>
            <Divider/>
            <StatusListItem label='Nelson Port' value={nelsonData.config.port} icon='plug'/>
            <StatusListItem label='Nelson API Port' value={nelsonData.config.apiPort} icon='plug'/>
        </List>
    );
}

function ProgressValue ({ currentNumber, lastTime, interval }) {
    const passedSeconds = getSecondsPassed(lastTime);
    const percent = passedSeconds / interval * 100;
    return (
        <div className="interval-wrapper">
            <div className="interval-value">{currentNumber}</div>
            <div className="interval-progress">
                <CircularProgress
                    mode="determinate"
                    value={percent}
                    size={18}
                    thickness={5}
                />
            </div>
        </div>
    )
}

function getSecondsPassed (time) {
    if (!time) {
        return 0;
    }
    return moment().local().diff(time, 'seconds')
}
