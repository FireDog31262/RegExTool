import {
    Component, 
    Input, 
    Output, 
    EventEmitter,
    NgZone,
    ChangeDetectorRef,
    ApplicationRef,
    ViewChild,
    ElementRef
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/throttleTime';
// import 'rxjs/add/observable/fromEvent';

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
                <input [value]="model.Expression" [formControl]="expression"/>
                <div class="matches" *ngIf="matches.length">{{matches.length}} matches</div>
            </div>
            <div class="textTitle">Text</div>
            <div class="text">
                <textarea class="textToMatch" [value]="model.Text" [formControl]="text"></textarea>
            </div>
        </form>
    `
})
export class RegExEditor {
    @Input() matches: Observable<Array<string>>;
    @Output() getMatches = new EventEmitter();
    expression = new FormControl();
    text = new FormControl();

    model = {
        Expression: '[A-Z]\\w+',
        Text: 'Testing Testing'
    }

    ngOnInit() {
        this.expression.valueChanges
            .debounceTime(500)
            .distinctUntilChanged()
            .subscribe((expression: string) => {
                if(expression.length > 3){
                    this.model.Expression = expression;
                    this.getMatches.next(this.model);
                }
            });


        this.text.valueChanges
            .debounceTime(500)
            .distinctUntilChanged()
            .subscribe((text: string) => {
                if(text.length > 3) {
                    this.model.Text = text;
                    this.getMatches.next(this.model);
                }
            })
    }

    //testing purposes
    // ngDoCheck() { console.log('change detection'); }
}
