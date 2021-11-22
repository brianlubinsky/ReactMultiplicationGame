import React, { useContext, useEffect, useState } from 'react';
import { IndexDataServiceContext } from '../Services/IndexDataService';
import { IndexData } from '../DataModels/IndexData';
import { Logger } from '../Helpers/Logger';

function LoadDetailsPanel(): JSX.Element {
    const [indexData, setIndexData] = useState<IndexData | null>(null);

    const context = useContext(IndexDataServiceContext);

    useEffect(() => {
        const subscription = context?.indexData$.subscribe((value) => {
            if (value) {
                Logger('setting index data in load details panel ', value);
                setIndexData(value);
            }
        });

        return subscription?.unsubscribe;
    }, [context]);

    if (indexData)
        return (
            <div style={{ borderColor: 'black', borderStyle: 'groove', borderWidth: 2 }}>
                <div style={{ fontSize: 18, fontWeight: 'bold' }}>Load details</div>
                <br />
                <div>FROM:{indexData.from}</div>
                <div>TO:{indexData.to}</div>
                <div>STATUS:{indexData.status}</div>
            </div>
        );
    else return <></>;
}

export default LoadDetailsPanel;
