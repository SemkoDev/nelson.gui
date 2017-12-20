import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import NelsonStatus from './components/nelson-status/NelsonStatus';
import NelsonPeers from './components/nelson-peers/NelsonPeers';
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
}

class App extends Component {
    componentDidMount () {
        this.props.getNelsonData();
        if (this.props.match.params.hostname && this.props.match.params.port) {
            this.props.changeConnection(this.props.match.params);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    componentWillReceiveProps(nextProps) {
        if (
            (this.props.nelsonData !== nextProps.nelsonData || nextProps.nelsonDataError) ||
            (this.props.nelsonPeers !== nextProps.nelsonPeers || nextProps.nelsonPeersError)
        ) {
            clearTimeout(this.timeout);
            this.startPoll();
        }
    }

    render() {
        const {
            connection, nelsonData, nelsonDataError, updateInterval, nelsonPeers, nelsonPeersError
        } = this.props;

        return (
            <div className='app'>
                <AppBar
                    title='Nelson Monitor'
                />
                <div className='app-wrapper'>
                    <NelsonStatus
                        className='app-column-1'
                        {...{ nelsonData, nelsonDataError, updateInterval, connection }}
                    />
                    <NelsonPeers
                        className='app-column-2'
                        {...{ nelsonData, nelsonPeersError, nelsonPeers }}
                    />
                </div>
            </div>
        );
    }

    startPoll() {
        this.timeout = setTimeout(() => {
            this.props.getNelsonData().then(this.props.getNelsonPeers())
        }, this.props.updateInterval);
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
