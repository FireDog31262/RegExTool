import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'regex-editor',
    styles:[`
        .title, .expression, .textTitle, .text {
            padding: .5rem;
            position: relative;
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
        input, 
        textarea,
        input:focus, 
        textarea:focus { border: none; }
        input { width: 80vw; }
        textarea {
            width: 95vw;
            height: 70vh;
            max-width: 95vw;
            max-height: 70vh;
            display: block;
        }
        .matches {
            background: #5CC;
            position: absolute;
            top: 0;
            right: 0;
            font-size: .75rem;
            margin: .175rem .75rem .125rem .125rem;
            padding: .3rem;
            border-radius: 5px;
            cursor: default;
            z-index: 3;
        }
    `],
    template: `
        <form>
            <div class="title">Expression</div>
            <div class="expression">
                <input name="Expression" [(ngModel)]="model.Expression" (keyup)="onKeyUp($event)" />
                <div class="matches" *ngIf="matches.length > 0">{{matches.length}} matches</div>
            </div>
            <div class="textTitle">Text</div>
            <div class="text">
                <textarea class="textToMatch" name="Text" [(ngModel)]="model.Text"></textarea>
            </div>
        </form>
    `
})
export class RegExEditor {
    @Input() matches = [];
    @Output() getMatches = new EventEmitter();

    model = {
        Expression: '[A-Z]\\w+',
        Text: 'Testing Testing'
    }

    onKeyUp (event) {
        var expression = event.target.value;
        if(expression.length > 0){
            console.log('Expession Text = ' + expression);
            console.log('Expression is valid ' + this.isValid(expression));
             
            this.getMatches.next(this.model);
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
