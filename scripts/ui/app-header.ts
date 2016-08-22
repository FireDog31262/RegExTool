import {Component} from '@angular/core';

@Component({
    selector: 'app-header',
    styles:[`
        h1 {
            margin: .5rem;
            font-size: 1.25rem;
            font-weight: 400;
            display: inline-block;
            vertical-align: middle;
            color: #5CC;
        }
    `],
    template: `
        <h1>Regular Expression Tool</h1>
    `
})
export class AppHeader {}