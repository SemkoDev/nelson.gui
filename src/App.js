import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AppBar, IconButton } from 'material-ui';
import CopyToClipboard from 'react-copy-to-clipboard';
import NelsonStatus from './components/nelson-status/NelsonStatus';
import NelsonPeers from './components/nelson-peers/NelsonPeers';
import NelsonPeerStats from './components/nelson-peers/NelsonPeerStats';
import { getNelsonData, getNelsonPeers, changeConnection } from './redux/nelson-api';
import {
    dataSelect, dataErrorSelect, intervalSelect, peersSelect, peersErrorSelect, connectionSelect
} from './selectors/nelson-api-selectors';
import './style/App.css';

const propTypes = {
    getNelsonData: PropTypes.func.isRequired,
    getNelsonPeers: PropTypes.func.isRequired,
    changeConnection: PropTypes.func.isRequired,
    nelsonData: PropTypes.object,
    nelsonPeers: PropTypes.array,
    nelsonDataError: PropTypes.object,
    nelsonPeersError: PropTypes.object,
    updateInterval: PropTypes.number,
    match: PropTypes.object,
    connection: PropTypes.object
};

class App extends Component {
    constructor(params) {
        super(params);
        this.state = {
            copied: false
        };
        this.startPoll = this.startPoll.bind(this);
        this.stopPoll = this.stopPoll.bind(this);
        this.restartPoll = this.restartPoll.bind(this);
        this.getAllNelsonData = this.getAllNelsonData.bind(this);
    }

    componentDidMount () {
        if (this.props.match.params.auth) {
            this.props.changeConnection(this.props.match.params);
            this.startPoll(100);
        } else {
            this.startPoll(1);
        }
        setTimeout(() => { this.getAllNelsonData() }, 120);
    }

    componentWillUnmount() {
        this.timeout && clearInterval(this.timeout);
    }

    componentWillReceiveProps(nextProps) {
        if (
            (this.props.nelsonData !== nextProps.nelsonData || nextProps.nelsonDataError) ||
            (this.props.nelsonPeers !== nextProps.nelsonPeers || nextProps.nelsonPeersError)
        ) {
            this.restartPoll();
        }
    }

    render() {
        const {
            connection, nelsonData, nelsonDataError, updateInterval, nelsonPeers, nelsonPeersError
        } = this.props;

        return (
            <div className='app'>
                <AppBar
                    title={`Nelson Monitor: ${nelsonData && nelsonData.name}`}
                />
                <div className='app-wrapper'>
                    <NelsonStatus
                        className='app-column-1'
                        {...{ nelsonData, nelsonDataError, updateInterval, connection }}
                    />
                    <NelsonPeerStats
                        className='app-column-2-up'
                        {...{ nelsonData, nelsonPeersError }}
                    />
                    <NelsonPeers
                        className='app-column-2-down'
                        {...{ nelsonData, nelsonPeersError, nelsonPeers, connection }}
                    />
                </div>
            </div>
        );
    }

    copy () {
        this.setState({ copied: true });
        setTimeout(() => this.setState({ copied: false }), 3000);
    }

    startPoll (updateInterval) {
        this.timeout = setInterval(this.getAllNelsonData, updateInterval || this.props.updateInterval);
    }

    restartPoll (updateInterval) {
        this.stopPoll();
        this.startPoll(updateInterval);
    }

    stopPoll () {
        this.timeout && clearTimeout(this.timeout);
    }

    getAllNelsonData () {
        this.props.getNelsonData().then(this.props.getNelsonPeers())
    }
}

App.propTypes = propTypes;

function mapStateToProps(state) {
    return {
        nelsonPeers: peersSelect(state),
        nelsonPeersError: peersErrorSelect(state),
        nelsonData: dataSelect(state),
        nelsonDataError: dataErrorSelect(state),
        updateInterval: intervalSelect(state),
        connection: connectionSelect(state)
    }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    const { dispatch } = dispatchProps;

    return {
        ...stateProps,
        ...ownProps,
        getNelsonData: () => dispatch(getNelsonData(stateProps.connection)),
        getNelsonPeers: () => dispatch(getNelsonPeers(stateProps.connection)),
        changeConnection: (connection) =>  dispatch(changeConnection(connection))
    }
}

export default connect(mapStateToProps, null, mergeProps)(App);
