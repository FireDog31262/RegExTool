import { Injectable, ElementRef } from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HighLightService {
    private ctx: any;
    private doc: any;
    private cm: any;
    private canvas: any;
    private canvasSize = { height: 0, width: 0 };

    Init(cm: any, canvas: ElementRef): HighLightService {
        this.cm = cm;
        this.canvas = canvas.nativeElement;
        this.doc = this.cm.getDoc();
        this.ctx = this.canvas.getContext("2d");
        

        this.setCanvasSize();

        return this;
    }

    draw (matches: Observable<any>): void {
        this.clear();

        this.ctx.fillStyle = "#5CC";
        this.ctx.globalAlpha = 0.5;

        matches.forEach(match => {
            var startPos = this.doc.posFromIndex(match.start);
            var endPos = this.doc.posFromIndex(match.end);

            var startRect = this.cm.charCoords(startPos, "local");
            var endRect = this.cm.charCoords(endPos, "local");

            var x = startRect.left;
            var y = startRect.top;
            var width = (endRect.left - startRect.right) + 9;
            var height = 19;

            this.ctx.fillRect(x, y, width, height);
        })
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

    clear(): void {
        this.canvas.width = this.canvas.width;
    }
}