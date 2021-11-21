import React, { useContext, useEffect, useState } from 'react';
import { IndexDataServiceContext } from '../Services/IndexDataService';
import { IndexData } from '../DataModels/IndexData';
import { BrokerService } from '../Services/BrokerService';
import { Broker } from '../DataModels/Broker';

function CarriersPanel(): JSX.Element {
    const [indexData, setIndexData] = useState<IndexData | null>(null);
    const [brokerService, setBrokerService] = useState<BrokerService | null>(null);
    const [brokers, setBrokers] = useState<Array<Broker>>([]);
    const [brokersLoading, setBrokersLoading] = useState<boolean>(true);

    const context = useContext(IndexDataServiceContext);

    useEffect(() => {
        const subscription = context?.indexData$.subscribe((value) => {
            if (value) {
                console.log(
                    new Date().getMilliseconds() +
                        'setting index data in CARRIER details panel ' +
                        JSON.stringify(value),
                );
                setIndexData(value);
            }
        });

        //mistake to do this here, should just inject all services at the page level - if this component doesn't load until initial load does, there will be delays calling the broker GET
        setBrokerService(new BrokerService(7));

        return subscription?.unsubscribe;
    }, [context]);

    useEffect(() => {
        const brokersSubscription = brokerService?.broker$.subscribe((value) => {
            console.log(
                new Date().getMilliseconds() + 'setting broker data in CARRIER details panel ' + JSON.stringify(value),
            );

            setBrokers(value);
        });

        const brokersLoadingSubscription = brokerService?.loading$.subscribe((value) => {
            console.log(
                new Date().getMilliseconds() +
                    'setting broker loading data in CARRIER details panel ' +
                    JSON.stringify(value),
            );
            setBrokersLoading(value);
        });

        return () => {
            brokersSubscription?.unsubscribe();
            brokersLoadingSubscription?.unsubscribe();
        };
    }, [brokerService]);

    if (indexData)
        return (
            <div style={{ borderColor: 'black', borderStyle: 'groove', borderWidth: 2 }}>
                <div style={{ fontSize: 18, fontWeight: 'bold' }}>Carrier details</div>
                <div>CUSTOMER:{indexData.customerName}</div>
                <div>REFNO:{indexData.refNo}</div>

                <div style={{ fontWeight: 'bold' }}>Brokers</div>

                {brokersLoading ? (
                    <div style={{ fontSize: 14, fontWeight: 'bold' }}>Brokers loading</div>
                ) : (
                    <div>
                        {brokers.map((x, index) => {
                            return (
                                <div key={'broker' + index}>
                                    <div>Type:{x.brokerType}</div>
                                    <div>Company:{x.company}</div>
                                    <div>Contact:{x.contactName}</div>
                                </div>
                            );
                        })}

                        <button onClick={() => brokerService?.addBroker()}>Add Broker</button>
                    </div>
                )}
            </div>
        );
    else return <></>;
}

export default CarriersPanel;
