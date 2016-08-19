import {Component} from '@angular/core';
import {AppHeader} from '../ui/index';

@Component({
    selector: 'main-container',
    directives: [
        AppHeader
    ],
    template:`
        <app-header></app-header>
    `
})
export class Main{}