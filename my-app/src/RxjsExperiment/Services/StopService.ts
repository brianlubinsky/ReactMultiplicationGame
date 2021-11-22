import { Stop } from "../DataModels/Stop";
import { Observable, BehaviorSubject, of, delay } from "rxjs";
import React from "react";
import { Logger } from "../Helpers/Logger";

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
        if (loadId > 0)
        {

            Logger("loading stop data for load " + loadId ,null);

            const subscription = of ([{type:"Pickup",location:"Chicago, IL",id:1,sequence:1 },{type:"Transload",location:"ElPaso, TX",id:2,sequence:2 },{type:"Destination",location:"Juarez, MX",id:3,sequence:3 }]).pipe(delay(2000)).subscribe(            
                x=>{
                    Logger("finished loading stop data for load " + loadId ,null); 
                    this.stopSubject.next(x); 
                    subscription.unsubscribe();                                   
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

            
            Logger("stop edit service called" ,null);

            const  subscription = of(clonedValue).pipe(delay(500)).subscribe(x=>{this.stopSubject.next(x); subscription.unsubscribe();Logger("stop edit service complete" ,null);});
            
    }

}

export const StopServiceContext = React.createContext<IStopService |null>(null);
