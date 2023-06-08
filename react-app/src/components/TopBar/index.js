import { useSelector } from "react-redux"
import OpenModalButton from "../OpenModalButton"
import React from 'react'
import './TopBar.css'
import LeaveServerModal from "../LeaveServerModal"
import EditServerModal from "../EditServerModal"



function Topbar({server}) {

    const currentServer = useSelector(state => state.server.currentServer)
    const currentChannel = useSelector(state => state.channel.currentChannel)
    const currentUser = useSelector(state => state.session.user)

    // console.log("CURRENT SERVER: ",currentServer)

    return (
        <div className="top-bar-container">
            <div className='topbar-server-title'>
                { currentServer.title ?
                    <p>{currentServer.title}</p>
                    :
                    <p>Select a Server</p>
                }
            </div>
            <div className="top-bar-right-half">
                <div>
                    <div>
                        <p># Icon</p>
                        <p>{currentChannel.title}</p>
                    </div>
                </div>
                <div className="right-right-icons">
                    { (currentServer.title && currentUser && currentServer.owner_id === currentUser.id) && (
                        <OpenModalButton
                        buttonText="Server Settings Icon"
                        modalComponent={<EditServerModal server={currentServer}/>} />
                        )
                    }
                    { ((currentServer.title && currentUser) && currentServer.owner_id !== currentUser.id) && (
                        <OpenModalButton
                        buttonText="Leave Server"
                        modalComponent={<LeaveServerModal server={currentServer}/>}/>
                    )
                    }

                </div>
            </div>
        </div>
    )
}

export default Topbar