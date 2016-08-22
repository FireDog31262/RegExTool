import {Component} from '@angular/core';
import {EditContainer} from './editcontainer';
import {AppHeader} from '../ui';

@Component({
    selector: 'main-container',
    directives: [
        EditContainer,
        AppHeader
    ],
    styles:[`
        .appHeader {
            display: block;
            background: #151519;
            color: #808393;
            padding: .75rem;
            font-size: .75rem;
        }
        .editContainer { display: block; }
    `],
    template:`
        <app-header class="appHeader"></app-header>
        <!-- Need library contain here -->
        <edit-container class="editContainer"></edit-container>
    `
})
export class Main{}