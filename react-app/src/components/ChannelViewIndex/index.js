import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ServersList from '../ServersList';
import Topbar from '../TopBar';
import "./ChannelViewIndex.css"
import { useParams, useHistory } from 'react-router-dom';
import { getOneServerThunk } from '../../store/server';
import { getChannelsThunk, getOneChannelThunk } from '../../store/channel';
import ChannelList from '../ChannelList';
import ChannelMessages from '../ChannelMessages';
import MembershipNavBar from '../MemberNavBar';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function ChannelViewIndex() {
    const {serverId, channelId } = useParams()
    const dispatch = useDispatch()
    const server = useSelector(state => state.server.currentServer)
    const user = useSelector(state => state.session.user)
    const history = useHistory()

    useEffect(() => {
        dispatch(getOneServerThunk(serverId))
        dispatch(getChannelsThunk(serverId))
    }, [dispatch, serverId])

    useEffect(() => {
        dispatch(getOneChannelThunk(channelId))
    }, [dispatch, channelId])

    // if (!user) {
    //     history.push('/login')
    //   }
    if (!server.id) return null

    return (
        <div className="all-content-container">
            <div className="server-list">
                <ServersList />
            </div>
            <div className="right-content-container">
                <div className="top-bar-wrapper">
                    <Topbar server={server}/>
                </div>
                <div className="main-content-wrapper">
                    <ChannelList id='channel-list-component' server={server}/>
                    <ChannelMessages id='channel-messages-component' channel={channelId} server={serverId}/>
                    <MembershipNavBar id='membership-navbar-component' server={server}/>
                </div>
            </div>
        </div>
    )
}

export default ChannelViewIndex
