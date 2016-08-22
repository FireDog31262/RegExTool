import {Component} from '@angular/core';
import {RegExEditor} from '../ui';

@Component({
    selector: 'edit-container',
    styles: [`
        .regexEditor { display: block; }
    `],
    directives: [
        RegExEditor
    ],
    template:`
        <regex-editor class="regexEditor"></regex-editor>
    `
})
export class EditContainer {
    
}