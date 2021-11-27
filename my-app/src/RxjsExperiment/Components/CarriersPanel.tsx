import React, { useContext, useEffect, useState } from 'react';
import { IndexDataServiceContext } from '../Services/IndexDataService';
import { IndexData } from '../DataModels/IndexData';
import { BrokerServiceContext } from '../Services/BrokerService';
import { Broker } from '../DataModels/Broker';
import { Logger } from '../Helpers/Logger';
import { BrokersContext } from '../DataContexts/BrokersProvider';

function CarriersPanel(): JSX.Element {
    const [indexData, setIndexData] = useState<IndexData | null>(null);

    const [brokers, setBrokers] = useState<Array<Broker>>([]);
    const [brokersLoading, setBrokersLoading] = useState<boolean>(true);

    const indexDataService = useContext(IndexDataServiceContext);
    const brokerService = useContext(BrokersContext);

    useEffect(() => {
        const subscription = indexDataService?.indexData$.subscribe((value) => {
            if (value) {
                Logger('setting index data in CARRIER details panel', value);
                setIndexData(value);
            }
        });

        return subscription?.unsubscribe;
    }, [indexDataService]);

    useEffect(() => {
        const brokersSubscription = brokerService?.brokers$.subscribe((value) => {
            setBrokersLoading(value.isLoading);
            if (!value.isLoading) {
                Logger('setting broker data in CARRIER details panel', value);
                setBrokers(value.brokers);
            }
        });

        return () => {
            brokersSubscription?.unsubscribe();
        };
    }, [brokerService]);

    if (indexData)
        return (
            <div style={{ borderColor: 'black', borderStyle: 'groove', borderWidth: 2 }}>
                <div style={{ fontSize: 18, fontWeight: 'bold' }}>Carrier details</div>
                <br />
                <div>CUSTOMER:{indexData.customerName}</div>
                <div>REFNO:{indexData.refNo}</div>

                <div style={{ fontWeight: 'bold' }}>Brokers</div>

                {brokersLoading ? (
                    <div style={{ fontSize: 18, fontWeight: 'bold' }}>Brokers loading</div>
                ) : (
                    <div>
                        {brokers.map((x, index) => {
                            return (
                                <div key={'broker' + index}>
                                    <br />
                                    <div>Type:{x.brokerType}</div>
                                    <div>Company:{x.company}</div>
                                    <div>Contact:{x.contactName}</div>
                                </div>
                            );
                        })}

                        <button
                            onClick={() =>
                                brokerService?.addBroker({
                                    brokerType: 'NewType',
                                    contactName: 'NewContact',
                                    company: 'New company',
                                })
                            }
                        >
                            Add Broker
                        </button>
                    </div>
                )}
            </div>
        );
    else return <></>;
}

export default CarriersPanel;
