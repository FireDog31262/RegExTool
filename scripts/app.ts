import {Component} from '@angular/core'; 
import {Main} from './containers/index';

@Component({
    selector: 'my-app',
    directives:[
        Main
    ],
    template: `
        <main-container></main-container>
    `
})
export class AppComponent {
    mySkill: string;
    skills = ['ASP.NET Core 1.0', 'Angular', 'C#', 'SQL', 'JSON'];

    constructor() {
        this.mySkill = this.skills[1];
    }
}