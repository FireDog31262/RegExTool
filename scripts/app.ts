import {Component} from '@angular/core'; 
import {Main} from './containers';

@Component({
    selector: 'my-app',
    directives:[
        Main
    ],
    styles: [`
        .mainContainer {
            display: block;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
        }
    `],
    template: `
        <main-container class=mainContainer></main-container>
    `
})
export class AppComponent {}