import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService {
    headers: Headers = new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json'
    });
    api_url: string = '/api/RegExApi';

    constructor(private http: Http) {}

    private getJson(response: Response) {
         
        return response.json();
    }

    private checkForError(response: Response): Response | Observable<any> {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            var error = new Error(response.statusText)
            error['response'] = response;
            console.error(error);
            throw error;
        }
    }

    post(body): Observable<any> {
        return this.http.post(
            `${this.api_url}`,
            JSON.stringify(body),
            { headers: this.headers }
        )
        .map(this.checkForError)
        .catch(err => Observable.throw(err))
        .map(this.getJson);
    }
}

