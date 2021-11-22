import React, { useEffect, useState } from 'react';
import { BrokerService, BrokerServiceContext } from '../Services/BrokerService';
import { IndexDataService, IndexDataServiceContext } from '../Services/IndexDataService';
import { StopService, StopServiceContext } from '../Services/StopService';
import { TrackingUpdateService, TrackingUpdateServiceContext } from '../Services/TrackingUpdateService';
import CarriersPanel from './CarriersPanel';
import LoadDetailsPanel from './LoadDetailsPanel';
import StopsPanel from './StopsPanel';
import TrackingUpdatesPanel from './TrackingUpdatesPanel';

//import { useParams } from 'react-router-dom';

function LoadDetailsPage(): JSX.Element {
    const loadId = 7;
    const [brokerService, setBrokerService] = useState<BrokerService | null>(null);
    const [indexDataService, setIndexDataService] = useState<IndexDataService | null>(null);
    const [stopService, setStopService] = useState<StopService | null>(null);
    const [trackingUpdateService, setTrackingUpdateService] = useState<TrackingUpdateService | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIndexDataService(new IndexDataService(loadId));
        setStopService(new StopService(loadId));
        setTrackingUpdateService(new TrackingUpdateService(loadId));
        setBrokerService(new BrokerService(loadId));
    }, []);

    useEffect(() => {
        const subscription = indexDataService?.loading$.subscribe((value) => {
            setIsLoading(value);
        });
        return subscription?.unsubscribe;
    }, [indexDataService]);

    if (isLoading)
        return (
            <div>
                <h1>...LOADING</h1>
            </div>
        );
    else
        return (
            <>
                <IndexDataServiceContext.Provider value={indexDataService}>
                    <LoadDetailsPanel></LoadDetailsPanel>
                    <BrokerServiceContext.Provider value={brokerService}>
                        <CarriersPanel></CarriersPanel>
                    </BrokerServiceContext.Provider>
                </IndexDataServiceContext.Provider>

                <StopServiceContext.Provider value={stopService}>
                    <StopsPanel></StopsPanel>
                    <TrackingUpdateServiceContext.Provider value={trackingUpdateService}>
                        <TrackingUpdatesPanel></TrackingUpdatesPanel>{' '}
                    </TrackingUpdateServiceContext.Provider>
                </StopServiceContext.Provider>
            </>
        );
}

export default LoadDetailsPage;
