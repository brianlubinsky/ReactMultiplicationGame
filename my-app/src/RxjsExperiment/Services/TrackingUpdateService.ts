import { TrackingUpdate } from "../DataModels/TrackingUpdate";
import { Observable, BehaviorSubject, of, delay } from "rxjs";
import React from "react";
import { Logger } from "../Helpers/Logger";

export interface ITrackingUpdateService
{
    trackingUpdates$ :Observable<Array<TrackingUpdate>>;
    addTrackingUpdate:()=>void;    
}

export class TrackingUpdateService implements ITrackingUpdateService
{
    private trackingUpdateSubject = new BehaviorSubject<Array<TrackingUpdate>>([]);
    trackingUpdates$  = this.trackingUpdateSubject.asObservable();
   
    constructor(loadId:number)
    {
        if (loadId > 0)
        {

            Logger("loading tracking update data for load " + loadId ,null);

            const subscription = of ([{stopId:1,progress:"Stop1 progress", notes:"Stop1 Notes"},{stopId:2,progress:"Stop2 progress", notes:"Stop2 Notes"}]).pipe(delay(800)).subscribe(            
                x=>{
                    Logger("finished loading tracking update data for load " + loadId ,null);
                    this.trackingUpdateSubject.next(x); 
                    subscription.unsubscribe();                    
                }
            );
        }
    }

    addTrackingUpdate ():void{
        ///some other time maybe ...
        /*     const trackingUpdates = this.trackingUpdateSubject.value;
            const clonedValue = new Array<TrackingUpdate>();
            trackingUpdates.forEach((x) => {
                clonedValue.push(x);
            });

            clonedValue.push({stopId:3,progress:"Stop3 progress", notes:"Stop3 Notes"});
            console.log(new Date().getMilliseconds() + "trackingUpdate add service called");

            const subscription = of(clonedValue). pipe(delay(500)).subscribe(x=>{this.trackingUpdateSubject.next(x); subscription.unsubscribe(); console.log('TrackingUpdate add service complete')});
            */
    }

}

export const TrackingUpdateServiceContext = React.createContext<ITrackingUpdateService |null>(null);
