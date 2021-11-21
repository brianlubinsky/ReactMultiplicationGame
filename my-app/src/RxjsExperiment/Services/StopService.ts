import { Stop } from "../DataModels/Stop";
import { Observable, BehaviorSubject, of, delay } from "rxjs";
import React from "react";

export interface IStopService
{
    stops$ :Observable<Array<Stop>>;
    editStop:()=>void;    
}

export class StopService implements IStopService
{
    private stopSubject = new BehaviorSubject<Array<Stop>>([]);
    stops$  = this.stopSubject.asObservable();

      
    constructor(loadId:number)
    {
        console.log(new Date().getMilliseconds() + "constructor for stop service called loadid = " + loadId);
        if (loadId > 0)
        {

        console.log(new Date().getMilliseconds() + "loading stop data for load " + loadId);

        //Simulate one second to retrieve index data
        const subscription = of ([{type:"Pickup",location:"Chicago, IL",id:1,sequence:1 },{type:"Transload",location:"ElPaso, TX",id:2,sequence:2 },{type:"Destination",location:"Juarez, MX",id:3,sequence:3 }]).pipe(delay(2000)).subscribe(            
            x=>{
                this.stopSubject.next(x); 
                subscription.unsubscribe();
                console.log(new Date().getMilliseconds() + "finished loading stop data for load " + loadId);
            }
        );
        }
    }

    editStop ():void{
           const stops = this.stopSubject.value;
            const clonedValue = new Array<Stop>();
            stops.forEach((x) => {
                if (x.location == "ElPaso, TX")
                x.location = "Dallas, TX"
                clonedValue.push(x);
            });

            
            console.log(new Date().getMilliseconds() + "stop edit service called");

            const  subscription = of(clonedValue).pipe(delay(500)).subscribe(x=>{this.stopSubject.next(x); subscription.unsubscribe(); console.log('Stop edit service complete')});
            
    }

}

export const StopServiceContext = React.createContext<IStopService |null>(null);
