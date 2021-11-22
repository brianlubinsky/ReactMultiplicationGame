import { IndexData } from "../DataModels/IndexData";
import { Observable,BehaviorSubject, of,delay } from "rxjs";
import React from "react";
import { Logger } from "../Helpers/Logger";

export interface IIndexDataService
{
    indexData$ :Observable<IndexData>;
    loading$ :Observable<boolean>;    
}

export class IndexDataService implements IIndexDataService
{
    //subject if we want to share in a context
    private indexDataSubject = new BehaviorSubject<IndexData>(<IndexData>{});
    indexData$  = this.indexDataSubject.asObservable();

   
    private loadingSubject = new BehaviorSubject<boolean>(true);
    loading$ = this.loadingSubject.asObservable();

   
    constructor(loadId:number)
    {
        if (loadId > 0)
        {

            Logger("loading index data for load " + loadId,null);

            //Simulate one second to retrieve index data
            const subscription = of (<IndexData>{customerName:"The customer", refNo:"refno here", from:"Chicago, IL", to:"Juarez, MX", status:"Picked Up" }).pipe(delay(500)).subscribe(            
                x=>{
                    Logger("finished loading index data for load " + loadId,null);
                    this.indexDataSubject.next(x); 
                    this.loadingSubject.next(false)                
                    subscription.unsubscribe();                    
                }
            );
        }
    }

}

export const IndexDataServiceContext = React.createContext<IIndexDataService |null>(null);
