import {Component} from '@angular/core';
import {RegExEditor} from '../ui';
import {RegExService} from '../services/regex.service';
import {HighLightService} from '../services/highLight.service';

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
    hiLiter: HighLightService;

    constructor(private service: RegExService) {}

    onGetMatches(model: any) {
        this.hiLiter = model.hiLiter;
        // console.log('onGetMatches model = ' + JSON.stringify(model));
        this.service.getMatches(model.filter)
            .subscribe(res => {
                // console.log('Mathes = ' + JSON.stringify(res));
                this.matches = res;
                this.hiLiter.clear();
                this.hiLiter.draw(res);
            });
    }
}