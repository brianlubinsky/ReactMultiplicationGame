import { Broker } from "../DataModels/Broker";
import { Observable, BehaviorSubject, of, delay } from "rxjs";
import React from "react";
import { Logger } from "../Helpers/Logger";

export interface IBrokersContextModel
{
    brokers$ :Observable<{isLoading:boolean, brokers:Array<Broker>}>;    
    addBroker:(broker: Broker)=>Observable<void>;    
}

