import {Component} from '@angular/core';
import {RegExEditor} from '../ui';
import {RegExService} from '../services/regex.service';

@Component({
    selector: 'edit-container',
    styles: [`
        .regexEditor { display: block; }
    `],
    directives: [
        RegExEditor
    ],
    template:`
        <regex-editor class="regexEditor" 
            (getMatches)="onGetMatches($event)"
            [matches]="matches"></regex-editor>
    `
})
export class EditContainer {
    matches = [];
    constructor(private service: RegExService) {}

    onGetMatches(model) {
         
        console.log('onGetMatches model = ' + JSON.stringify(model));
        this.service.getMatches(model)
            .subscribe(res => {
                 
                this.matches = res;
            });
    }
}