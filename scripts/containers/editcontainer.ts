import {AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import {RegExEditor} from '../ui';
import {LibraryView} from '../ui';
import {RegExService} from '../services/regex.service';
import {HighLightService} from '../services/highLight.service';

@Component({
    selector: 'edit-container',
    styles: [`
        .regexEditor { 
            display: block; 
            width: 80%;
            float: left;
        }
        .libView {
            display: block;
            width: 20%;
            height: calc(100vh - 59px);
            float: left;
            background: #25262c;
            color: white;
        }
    `],
    directives: [
        RegExEditor,
        LibraryView
    ],
    template:`
        <lib-view #libView  class="libView"
            (UpdateExpression)="onUpdateExpression($event)"
            (UpdateText)="onUpdateText($event)"></lib-view>
        <regex-editor #editorView class="regexEditor" 
            (getMatches)="onGetMatches($event)"
            [matches]="matches"
            [model]="model"></regex-editor>
    `
})
export class EditContainer {
    @ViewChild(RegExEditor) editor;
    matches = [];
    hiLiter: HighLightService;
    model = {
        Expression: '[A-Z]\\w+',
        Text: `Welcome to the Regular Expression Tool!

Edit the Expression & Text to see matches.

This is Sample text for testing:
abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ
0123456789 _+-.,!@#$%^&*();\/|<>"'
12345 -98.7 3.141 .6180 9,000 +42
555.123.4567	+1-(800)-555-2468
foo@demo.net	bar.ba@test.co.uk
www.demo.com	http://foo.co.uk/`
    }

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

    onUpdateExpression(expression: string) {
        this.model.Expression = expression;
    }

    onUpdateText(text: string){
        this.editor.txtCursorPos = null;
        this.model.Text = text;
    }
}