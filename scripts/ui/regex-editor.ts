import {Component} from '@angular/core';

@Component({
    selector: 'regex-editor',
    styles:[`
        .title, .expression, .textTitle, .text {
            padding: .5rem;
        }
        .title {
            background: #5CC;
            color: 000;
        }
        .textTitle {
            background: #CCC;
        }
        .text {
            height: 70vh;
            overflow-y: scroll;
        }
        .text textarea {
            width: 100%
            height: 100%;
            display: block;
        }
    `],
    template: `
        <form>
            <div class="title">Expression</div>
            <div class="expression">
                <input name="expression" [(ngModel)]="model.expression" (keyup)="onKeyUp($event)" />
            </div>
            <div class="textTitle">Text</div>
            <div class="text">
                <textarea name="text" [(ngModel)]="model.text"></textarea>
            </div>
        </form>
    `
})
export class RegExEditor {
    model = {
        expression: '[A-Z]',
        text: 'Testing Testing',
        matches: 2
    }

    onKeyUp (event) {
        var expression = event.target.value;
        if(expression.length > 0){
            console.log('Expession Text = ' + expression);
            console.log('Expression is valid ' + this.isValid(expression));
        }
    }

    private isValid(expr: string){
        var isvalid: boolean = true;
        try {
            new RegExp(expr);
        } catch (e) {
            isvalid = false;
        }
        return isvalid;
    }
}
