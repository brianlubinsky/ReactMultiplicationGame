import { TrackingUpdate } from "../DataModels/TrackingUpdate";
import { Observable, BehaviorSubject, of, delay } from "rxjs";
import React from "react";

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
        console.log(new Date().getMilliseconds() + "constructor for trackingUpdate service called loadid = " + loadId);
        if (loadId > 0)
        {

        console.log(new Date().getMilliseconds() + "loading trackingUpdate data for load " + loadId);

        const subscription = of ([{stopId:1,progress:"Stop1 progress", notes:"Stop1 Notes"},{stopId:2,progress:"Stop2 progress", notes:"Stop2 Notes"}]).pipe(delay(800)).subscribe(            
            x=>{
                this.trackingUpdateSubject.next(x); 
                subscription.unsubscribe();
                console.log(new Date().getMilliseconds() + "finished loading trackingUpdate data for load " + loadId);
            }
        );
        }
    }

    addTrackingUpdate ():void{
            const trackingUpdates = this.trackingUpdateSubject.value;
            const clonedValue = new Array<TrackingUpdate>();
            trackingUpdates.forEach((x) => {
                clonedValue.push(x);
            });

            clonedValue.push({stopId:3,progress:"Stop3 progress", notes:"Stop3 Notes"});
            console.log(new Date().getMilliseconds() + "trackingUpdate add service called");

            const subscription = of(clonedValue).pipe(delay(500)).subscribe(x=>{this.trackingUpdateSubject.next(x); subscription.unsubscribe(); console.log('TrackingUpdate add service complete')});
    }

}

export const TrackingUpdateServiceContext = React.createContext<ITrackingUpdateService |null>(null);
