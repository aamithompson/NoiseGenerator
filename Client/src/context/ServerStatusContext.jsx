//==============================================================================
// Filename: ServerStatusContext.jsx
// Author: Aaron Thompson
// Date Created: 5/19/2026
// Last Updated: 5/19/2026
//
// Description: Verfies and holds the server status.
//==============================================================================
import { createContext, useContext, useState, useEffect } from "react"
import { serverURL } from '../data/ServerURL';
//------------------------------------------------------------------------------
// VARIABLE(s)
//------------------------------------------------------------------------------
const ServerStatusContext = createContext()

const WAIT_TIME = 30000; //30 seconds

// CONTEXT FUNCTION(s)
//------------------------------------------------------------------------------
export function ServerStatusProvider({ children }) {
    const [serverReady, setServerReady] = useState(false);

    useEffect(() => {
        async function pingServer() {
            while(!serverReady) {
                try {
                    const response = await fetch(serverURL + '/api/health');
                    if(response.ok) {
                        setServerReady(true);
                        return;
                    }
                } catch(error) {

                }

                // wait before trying again
                await new Promise(resolve => setTimeout(resolve, WAIT_TIME));
            }
        }

        pingServer()
        }, []);

    return (
        <ServerStatusContext.Provider value={{ serverReady }}>
            {children}
        </ServerStatusContext.Provider>
    )
}

export function useServerStatus() {
    return useContext(ServerStatusContext);
}
//==============================================================================
//==============================================================================