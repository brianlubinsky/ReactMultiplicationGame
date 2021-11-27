//import { useObservable } from "observable-hooks"
import { useEffect } from "react"
import { Broker } from "../DataModels/Broker"
import {of,delay,BehaviorSubject} from 'rxjs';
import { Logger } from "../Helpers/Logger";
import { IBrokerService  } from "../Services/BrokerService";
import React from "react";

export const useBrokers = (loadId:number):IBrokerService=>{
    
    const  brokerSubject =  React.useMemo< BehaviorSubject<Array<Broker>>>(()=>new BehaviorSubject<Array<Broker>>([]),[]);
    const broker$  = brokerSubject.asObservable();
   
    const loadingSubject = React.useMemo<BehaviorSubject<boolean>>(()=>   new BehaviorSubject<boolean>(true),[]);
    const loading$ = loadingSubject.asObservable();

    useEffect(() => {
        Logger("loading broker data for load " + loadId,null);
        
        const subscription = of ([{brokerType:"MX", contactName:"Jose", company:"Mx co"},{brokerType:"US", contactName:"Joe", company:"US co"}]).pipe(delay(600)).subscribe(            
            x=>{
                Logger("finished loading broker data for load " + loadId,null);
                brokerSubject.next(x); 
                loadingSubject.next(false);                    
            }
        );
        
        return () => {                            
            subscription.unsubscribe()
        }
    }, [])

    const addBroker = function ():void{
            const brokers = brokerSubject.value;
            const clonedValue = new Array<Broker>();
            brokers.forEach((x) => {
                clonedValue.push(x);
            });

            clonedValue.push({brokerType:"new", company:"new co", contactName:"new contact"});
            Logger("broker add service called" ,null);

            loadingSubject.next(true);
            const subscription = of(clonedValue).pipe(delay(500)).subscribe(x=>{brokerSubject.next(x); loadingSubject.next(false); subscription.unsubscribe(); Logger("broker add service complete" ,null);});
    }

    return {
        broker$ :broker$,
        loading$ :loading$,
        addBroker:()=>{addBroker ()}
    }

}