import React, { useContext, useEffect, useState } from 'react';
import { StopService, StopServiceContext } from '../Services/StopService';
import { Stop } from '../DataModels/Stop';
import { Logger } from '../Helpers/Logger';

function StopsPanel(): JSX.Element {
    const [stops, setStops] = useState<null | Array<Stop>>(null);
    const [editing, setEditing] = useState<boolean>(false);

    const context = useContext(StopServiceContext);

    useEffect(() => {
        const stopsSubscription = context?.stops$.subscribe((value) => {
            Logger('setting stop data in STOPS details panel ', value);
            setStops(value);
        });

        return () => {
            stopsSubscription?.unsubscribe();
        };
    }, [context]);

    useEffect(() => {
        if (editing) setEditing(false);
    }, [stops]);

    if (!editing && stops && stops?.length > 0)
        return (
            <div style={{ borderColor: 'black', borderStyle: 'groove', borderWidth: 2 }}>
                <div style={{ fontSize: 18, fontWeight: 'bold' }}>Stops</div>
                <div>
                    {stops.map((x, index) => {
                        return (
                            <div key={'stop' + index}>
                                <br />
                                <div>Sequence:{x.sequence}</div>
                                <div>Type:{x.type}</div>
                                <div>Location:{x.location}</div>
                            </div>
                        );
                    })}

                    <button
                        onClick={() => {
                            context?.editStop();
                            setEditing(true);
                        }}
                    >
                        Edit Stop
                    </button>
                </div>
            </div>
        );
    else return <div style={{ fontSize: 18, fontWeight: 'bold' }}>Stops loading</div>;
}

export default StopsPanel;
