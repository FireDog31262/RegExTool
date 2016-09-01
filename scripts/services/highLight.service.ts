import { Injectable, ElementRef } from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HighLightService {
    private hiLiteColor: string = '#5CC';
    private ctx: any;
    private doc: any;
    private cm: any;
    private canvas: any;
    private canvasSize = { height: 0, width: 0 };

    Init(cm: any, canvas: ElementRef): HighLightService {
        this.cm = cm;
        this.canvas = canvas.nativeElement;
        this.doc = this.cm.getDoc();
        this.ctx = this.canvas.getContext('2d');

        this.setCanvasSize();

        return this;
    }

    draw (matches: Observable<Array<string>>): void {
        var scroll = this.cm.getScrollInfo();
        var top = this.cm.indexFromPos(this.cm.coordsChar({
            left: 0,
            top: scroll.top
        }, 'local'));
        var bottom = this.cm.indexFromPos(this.cm.coordsChar({
            left: scroll.clientWidth,
            top: scroll.top + scroll.clientHeight
        }, 'local'));


    }

    setCanvasSize(): void {
        var scroll = this.cm.getScrollInfo();
        if (this.canvasSize.height !== scroll.clientHeight || 
            this.canvasSize.width !== scroll.clientWidth) {

            this.canvasSize.height = scroll.clientHeight;
            this.canvasSize.width = scroll.clientWidth;

            this.canvas.height = this.canvasSize.height;
            this.canvas.width = this.canvasSize.width;
        }
    }
}