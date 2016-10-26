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
            padding-right: 50px;
        }
        .title .icon { 
            float: right; 
            cursor: pointer;
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
            <div class="title">
            Expression
            <span class="icon copy" data-clipboard-target="#Expression" alt="Copy Expression to clipboard">&#xe205;</span>
            </div>
            <div class="expression">
                <input id="Expression" [(ngModel)]="model.Expression" [formControl]="expression"/>
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
    txtCursorPos: any;
    expression = new FormControl();
    myCodeMirror: any;
    @ViewChild('text') myTextArea: ElementRef;
    @ViewChild('canvas') canvas: ElementRef;
    hiLiter: HighLightService;
    differ: any;

    constructor(
        public elementRef: ElementRef,
        private cmService: CodemirrorService,
        private hiliteService: HighLightService,
    ) {}

    ngOnInit() {
        this.expression.valueChanges
            .debounceTime(500)
            .distinctUntilChanged()
            .subscribe((expression: string) => {
                this.txtCursorPos = this.myCodeMirror.getCursor(true);
                this.hiLiter.clear();
                if(expression.length > 0) {
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
                this.txtCursorPos = this.myCodeMirror.getCursor(true);
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

        var clipboard = new Clipboard('.copy');
        clipboard.on('success', function(e) {
            debugger;
            console.info('Action:', e.action);
            console.info('Text:', e.text);
            console.info('Trigger:', e.trigger);

            e.clearSelection();
        });
    }

    // CopyToClipboard () {
    //     debugger;
    // }

    //testing purposes
    // ngDoCheck() { console.log('change detection'); }
}
