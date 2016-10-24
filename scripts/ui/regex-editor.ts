import {
    Component, 
    Input, 
    Output, 
    EventEmitter,
    ViewChild,
    ElementRef
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {CodemirrorService} from '../services/codeMirror.service';
import {HighLightService} from '../services/highLight.service';

@Component({ 
    selector: 'regex-editor',
    providers: [CodemirrorService],
    styles:[`
        canvas{ position: absolute; }
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
            height: calc(100vh - 185px);
            width: 98.6%;
            overflow-y: scroll;
            overflow-x: hidden
        }
        input { width: 80vw; }
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
                <input [(ngModel)]="model.Expression" [formControl]="expression"/>
                <div class="matches" *ngIf="matches.length">{{matches.length}} matches</div>
            </div>
            <div class="textTitle">Text</div>
            <div class="text">
                <canvas #canvas class="canvas"></canvas>
                <textarea #text class="textToMatch" [value]="model.Text"></textarea>
            </div>
        </form>
    `
})
export class RegExEditor {
    @Input() model: any;
    @Input() matches: Observable<any>;
    @Output() getMatches = new EventEmitter();
    expression = new FormControl();
    myCodeMirror: any;
    @ViewChild('text') myTextArea: ElementRef;
    @ViewChild('canvas') canvas: ElementRef;
    hiLiter: HighLightService;

    constructor(
        public elementRef: ElementRef,
        private cmService: CodemirrorService,
        private hiliteService: HighLightService
    ) { }

//     public model = {
//         Expression: '[A-Z]\\w+',
//         Text: `Welcome to the Regular Expression Tool!

// Edit the Expression & Text to see matches.

// This is Sample text for testing:
// abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ
// 0123456789 _+-.,!@#$%^&*();\/|<>"'
// 12345 -98.7 3.141 .6180 9,000 +42
// 555.123.4567	+1-(800)-555-2468
// foo@demo.net	bar.ba@test.co.uk
// www.demo.com	http://foo.co.uk/`
//     }

    ngOnInit() {
        this.expression.valueChanges
            .debounceTime(500)
            .distinctUntilChanged()
            .subscribe((expression: string) => {
                this.hiLiter.clear();
                if(expression.length > 3) {
                    this.hiLiter.setCanvasSize();
                    this.model.Expression = expression;
                    this.getMatches.emit({filter: this.model, hiLiter: this.hiLiter});
                }
            });
    }

    ngAfterViewInit() {
        //this needs to be setup after the view is initialized 
        //to ensure that the textarea element has been initialized 
        Observable.fromEvent(this.myTextArea.nativeElement, 'change')
            .debounceTime(500)
            .subscribe((event: any) => {
                this.hiLiter.clear();
                this.hiLiter.setCanvasSize();
                this.model.Text = (<HTMLTextAreaElement>event.target).value;
                this.getMatches.emit({filter: this.model, hiLiter: this.hiLiter});
            });
        
        // debugger;
        //setup the codemirror editor
        this.myCodeMirror = CodeMirror.fromTextArea(
            this.myTextArea.nativeElement,
            this.cmService.options
        );
        this.hiLiter = this.hiliteService.Init(this.myCodeMirror, this.canvas);

        //setup change event to pass changes to the 
        //textarea and fire a change event on the textarea 
        this.myCodeMirror.on('change', function(){ 
            var changeEvent = new Event('change');
            this.save();
            this.getTextArea().dispatchEvent(changeEvent);
        }.bind(this.myCodeMirror));

        this.myCodeMirror.on('keydown', () => {
            this.hiLiter.clear();
        });

        var cm = document.getElementsByClassName('CodeMirror')[0];
        Observable.fromEvent(cm, 'keyup')
            .debounceTime(750)
            .subscribe(() => {
                this.getMatches.emit({filter: this.model, hiLiter: this.hiLiter});
            });

        this.getMatches.emit({filter: this.model, hiLiter: this.hiLiter});
    }

    //testing purposes
    // ngDoCheck() { console.log('change detection'); }
}
