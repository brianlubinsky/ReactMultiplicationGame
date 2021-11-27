/* eslint-disable react/prop-types */
import { Broker } from '../DataModels/Broker';
import { Observable, BehaviorSubject, Subject, of, delay } from 'rxjs';
import React, { createContext, useEffect } from 'react';
import { Logger } from '../Helpers/Logger';

export interface IBrokersContextModel {
    brokers$: Observable<{ isLoading: boolean; brokers: Array<Broker> }>;
    addBroker: (broker: Broker) => void;
}

export const BrokersContext = createContext<IBrokersContextModel | undefined>(undefined);

//function BrokersProvider(props: React.PropsWithChildren<{ loadId: number }>): JSX.Element {
export const BrokersProvider: React.FunctionComponent<{ loadId: number }> = (props) => {
    const loadId = props.loadId;

    const brokerSubject = React.useMemo<Subject<{ isLoading: boolean; brokers: Array<Broker> }>>(
        () => new Subject<{ isLoading: boolean; brokers: Array<Broker> }>(),
        [],
    );

    useEffect(() => {
        Logger('loading broker data for load ' + loadId, null);

        const subscription = of([
            { brokerType: 'MX', contactName: 'Jose', company: 'Mx co' },
            { brokerType: 'US', contactName: 'Joe', company: 'US co' },
        ])
            .pipe(delay(600))
            .subscribe((x) => {
                Logger('finished loading broker data for load ' + loadId, null);
                brokerSubject.next({ isLoading: false, brokers: x });
            });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const addBroker = function (broker: Broker): void {
        const newValue = [
            { brokerType: 'MX', contactName: 'Jose', company: 'Mx co' },
            { brokerType: 'US', contactName: 'Joe', company: 'US co' },
        ];

        newValue.push(broker);

        Logger('broker add service called', null);

        brokerSubject.next({ isLoading: true, brokers: [] });
        const subscription = of(newValue)
            .pipe(delay(500))
            .subscribe((x) => {
                brokerSubject.next({ isLoading: false, brokers: x });
                subscription.unsubscribe();
                Logger('broker add service complete', null);
            });
    };

    return (
        <BrokersContext.Provider
            value={{
                brokers$: brokerSubject.asObservable(),
                addBroker: (broker: Broker) => {
                    return addBroker(broker);
                },
            }}
        >
            {props.children}
        </BrokersContext.Provider>
    );
};
