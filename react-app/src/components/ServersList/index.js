import { useSelector, useDispatch } from 'react-redux';
import { getServersThunk } from '../../store/server';
import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import OpenCreateServerButton from '../OpenCreateServerButton';
import NewServerModal from '../NewServerModal';
import "./ServersList.css"
// import { useParams } from 'react-router-dom/cjs/react-router-dom.min';



function ServersList() {
    const serversObj = useSelector((state) => state.server.allServers);
    const servers = Object.values(serversObj);
    const {serverId, channelId} = useParams()


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getServersThunk())
    }, [dispatch])



    return(
        <div id='server-list-wrapper'>
            <ul className="server-icons-container">
            {servers.map(server => (
              <div key={server.id}>
              <li key={server.id} className="server-item-box"><div className={server.id.toString() === serverId ? "active-server-white" : ""}></div><NavLink to={`/${server.id}/${server.channels[0].id}`} className="server-icon-buttons" ><img className="server-icons" src={server.preview_icon} id={server.id.toString() === serverId ? "active-server-icon" : ""}></img></NavLink></li>
              </div>
            ))}
              <OpenCreateServerButton

                buttonText="+"
                modalComponent={<NewServerModal />}
              />
                <NavLink to="/discover" className="discover-button-link discover-button server-icon-buttons"><i class="fa-solid fa-compass"></i></NavLink>
          </ul>
        </div>
    )
}

export default ServersList
