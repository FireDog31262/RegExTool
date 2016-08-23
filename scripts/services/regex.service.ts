import {Injectable} from '@angular/core';
import {ApiService} from './api.service';

@Injectable()
export class RegExService {

    constructor(private api: ApiService) {}

    getMatches(model) {
        return this.api.post(model);
    }
}