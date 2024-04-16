import { Injectable } from "@angular/core";
import { Observable,Subject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class DataService{
    private subject = new Subject<any>();

    senData(data:any) {
        this.subject.next(data);
    }

    clearData(data: any) {
        this.subject.next(data);
    }

    getData():Observable<any> {
        return this.subject.asObservable();
    }
}
