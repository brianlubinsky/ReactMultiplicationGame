import React, { useContext, useEffect, useState } from 'react';
import { TrackingUpdateServiceContext } from '../Services/TrackingUpdateService';
import { StopServiceContext } from '../Services/StopService';
import { TrackingUpdate } from '../DataModels/TrackingUpdate';
import { Stop } from '../DataModels/Stop';
import { Logger } from '../Helpers/Logger';

function TrackingUpdatesPanel(): JSX.Element {
    const [trackingUpdates, setTrackingUpdates] = useState<null | Array<TrackingUpdate>>(null);
    const [stops, setStops] = useState<null | Array<Stop>>(null);
    const trackingUpdateService = useContext(TrackingUpdateServiceContext);
    const stopService = useContext(StopServiceContext);

    useEffect(() => {
        const trackingUpdatesSubscription = trackingUpdateService?.trackingUpdates$.subscribe((value) => {
            Logger('setting tracking update  data in tracking updates panel ', value);
            setTrackingUpdates(value);
        });

        return () => {
            trackingUpdatesSubscription?.unsubscribe();
        };
    }, [trackingUpdateService]);

    useEffect(() => {
        const stopsSubscription = stopService?.stops$.subscribe((value) => {
            Logger('setting stop data in tracking updates panel ', value);
            setStops(value);
        });

        return () => {
            stopsSubscription?.unsubscribe();
        };
    }, [stopService]);

    const getLocationElement = function (stopId: number): JSX.Element {
        const location = stops?.find((x) => x.id === stopId)?.location;
        if (location) return <div>Location:{location}</div>;
        else return <></>;
    };

    if (trackingUpdates && trackingUpdates?.length > 0)
        return (
            <div style={{ borderColor: 'black', borderStyle: 'groove', borderWidth: 2 }}>
                <div style={{ fontSize: 18, fontWeight: 'bold' }}>TrackingUpdates</div>
                <div>
                    {trackingUpdates.map((x, index) => {
                        return (
                            <div key={'trackingUpdate' + index}>
                                <br />
                                {getLocationElement(x.stopId)}
                                <div>Progress:{x.progress}</div>
                                <div>Notes:{x.notes}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    else return <div style={{ fontSize: 18, fontWeight: 'bold' }}>TrackingUpdates loading</div>;
}

export default TrackingUpdatesPanel;
