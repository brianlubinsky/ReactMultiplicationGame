import { Broker } from "../DataModels/Broker";
import { Observable, BehaviorSubject, of, delay } from "rxjs";
import React from "react";
import { Logger } from "../Helpers/Logger";

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
        if (loadId > 0)
        {

            Logger("loading broker data for load " + loadId,null);
        
            const subscription = of ([{brokerType:"MX", contactName:"Jose", company:"Mx co"},{brokerType:"US", contactName:"Joe", company:"US co"}]).pipe(delay(600)).subscribe(            
                x=>{
                    Logger("finished loading broker data for load " + loadId,null);
                    this.brokerSubject.next(x); 
                    this.loadingSubject.next(false)                
                    subscription.unsubscribe();                    
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
            Logger("broker add service called" ,null);

            this.loadingSubject.next(true);
            const subscription = of(clonedValue).pipe(delay(500)).subscribe(x=>{this.brokerSubject.next(x); this.loadingSubject.next(false); subscription.unsubscribe(); Logger("broker add service complete" ,null);});
    }

}

export const BrokerServiceContext = React.createContext<IBrokerService |null>(null);
