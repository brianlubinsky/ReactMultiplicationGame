import React, { useEffect, useState } from 'react';
import { BrokerService, BrokerServiceContext } from '../Services/BrokerService';
import { IndexDataService, IndexDataServiceContext } from '../Services/IndexDataService';
import CarriersPanel from './CarriersPanel';
import LoadDetailsPanel from './LoadDetailsPanel';

//import { useParams } from 'react-router-dom';

function LoadDetailsPage(): JSX.Element {
    const loadId = 7;
    const [indexDataService, setIndexDataService] = useState<IndexDataService | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIndexDataService(new IndexDataService(loadId));
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

                    <CarriersPanel></CarriersPanel>
                </IndexDataServiceContext.Provider>
            </>
        );
}

export default LoadDetailsPage;
