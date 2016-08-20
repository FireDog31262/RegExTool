import {Component} from '@angular/core';
import {AppHeader} from '../ui';

@Component({
    selector: 'main-container',
    directives: [
        AppHeader
    ],
    styles:[`
        .appHeader {
            display: block;
            background: #151519;
            color: #808393;
            height: 1.5rem;
            padding: .75rem;
            font-size: .75rem;
            width: 100vw;
        }
    `],
    template:`
        <app-header class="appHeader"></app-header>
    `
})
export class Main{}