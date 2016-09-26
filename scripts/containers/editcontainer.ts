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
        <lib-view #libView class="libView" (toggleView)="toggleLibView()"></lib-view>
        <regex-editor #editorView class="regexEditor" 
            (getMatches)="onGetMatches($event)"
            [matches]="matches"></regex-editor>
    `
})
export class EditContainer {
    matches = [];
    hiLiter: HighLightService;
    @ViewChild('libView') libView: ElementRef;
    @ViewChild('editorView') editorView: ElementRef;

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

    toggleLibView () {
        // var lv = this.libView.location;
        debugger;
    }
}