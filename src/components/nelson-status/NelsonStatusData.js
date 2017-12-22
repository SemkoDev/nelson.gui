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
    )
    const cycleValue = (
        <ProgressValue
            currentNumber={nelsonData.heart.currentCycle}
            lastTime={nelsonData.heart.lastCycle}
            interval={nelsonData.config.cycleInterval}
        />
    )

    return (
        <List>
            <StatusListItem label='Online since' value={startDateString} icon='calendar'/>
            <StatusListItem label='Online' value={duration} icon='clock-o'/>
            <StatusListItem label='Is IRI Healthy' value={nelsonData.isIRIHealthy ? 'yes' : 'no'} icon='heartbeat'/>
            <StatusListItem label='Master Node' value={nelsonData.config.isMaster ? 'yes' : 'no'} icon='plus-circle'/>
            <Divider/>
            <StatusListItem label={epochLabel} value={epochValue} icon='hourglass'/>
            <StatusListItem label={cycleLabel} value={cycleValue} icon='history'/>
            <Divider/>
            <StatusListItem label='Port' value={nelsonData.config.port} icon='plug'/>
            <StatusListItem label='API Port' value={nelsonData.config.apiPort} icon='plug'/>
            <StatusListItem label='IRI Port' value={nelsonData.config.IRIPort} icon='plug'/>
            <StatusListItem label='TCP Port' value={nelsonData.config.TCPPort} icon='plug'/>
            <StatusListItem label='UDP Port' value={nelsonData.config.UDPPort} icon='plug'/>
        </List>
    )
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
