import { Broker } from "../DataModels/Broker";
import { Observable, BehaviorSubject, of, delay } from "rxjs";
import React from "react";

export interface IBrokerService
{
    broker$ :Observable<Array<Broker>>;
    loading$ :Observable<boolean>;    
    addBroker:()=>void;    
}

export class BrokerService implements IBrokerService
{
    //subject if we want to share in a context
    private brokerSubject = new BehaviorSubject<Array<Broker>>([]);
    broker$  = this.brokerSubject.asObservable();

   
    private loadingSubject = new BehaviorSubject<boolean>(true);
    loading$ = this.loadingSubject.asObservable();

   
    constructor(loadId:number)
    {
        console.log(new Date().getMilliseconds() + "constructor for broker service called loadid = " + loadId);
        if (loadId > 0)
        {

        console.log(new Date().getMilliseconds() + "loading broker data for load " + loadId);

        //Simulate one second to retrieve index data
        const subscription = of ([{brokerType:"MX", contactName:"Jose", company:"Mx co"},{brokerType:"US", contactName:"Joe", company:"US co"}]).pipe(delay(1500)).subscribe(            
            x=>{
                this.brokerSubject.next(x); 
                this.loadingSubject.next(false)                
                subscription.unsubscribe();
                console.log(new Date().getMilliseconds() + "finished loading broker data for load " + loadId);
            }
        );
        }
    }

    addBroker ():void{
            const brokers = this.brokerSubject.value;
            const clonedValue = new Array<Broker>();
            brokers.forEach((x) => {
                clonedValue.push(x);
            });

            clonedValue.push({brokerType:"new", company:"new co", contactName:"new contact"});
            console.log(new Date().getMilliseconds() + "broker add service called");

            this.loadingSubject.next(true);
            const subscription = of(clonedValue).pipe(delay(500)).subscribe(x=>{this.brokerSubject.next(x); this.loadingSubject.next(false); subscription.unsubscribe(); console.log('Broker add service complete')});
    }

}

export const BrokerServiceContext = React.createContext<IBrokerService |null>(null);
