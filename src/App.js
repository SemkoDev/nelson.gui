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

const DONATE_ADDR = 'SOZAIPJMQUBOFCTDTJJDXCZEKNIYZGIGVDLFMH9FFBAYK9SWGTBCWVUTFHXDOUESZAXRJJCJESJPIEQCCKBUTVQPOW';

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
    }

    componentDidMount () {
        if (this.props.match.params.auth) {
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
                    iconElementLeft={
                        <CopyToClipboard text={DONATE_ADDR} onCopy={() => this.copy()}>
                            <IconButton
                                iconStyle={{color: '#FFF'}}
                                iconClassName='fa fa-heart' tooltip={
                                    this.state.copied ? 'IOTA address for donation copied!' : 'Donate'
                                }
                                tooltipPosition='bottom-right'
                            />
                        </CopyToClipboard>
                    }
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

    startPoll () {
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
