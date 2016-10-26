import { Component, Output, EventEmitter, ElementRef } from '@angular/core';
import {LibraryViewService} from '../services/libView.service';

@Component({
    selector: 'lib-view',
    styles: [`
        .header { padding: 10px; }
        .showPointer {
            cursor: pointer;
        }
        .list {
            background: #2f3037;
            height: 350px;
            overflow-y: auto;
        }
        .list ul{
            margin: 0;
            padding: 0;
            list-style-type: none;
        }
        .list ul li {
            padding: .5rem .75rem;
            border-bottom: solid 1px #36373f;
            cursor: pointer;
            color: #9699a6;
        }
        .list ul li:hover { color: white; }
        .desc, .ext { 
            overflow-y: auto; 
            padding: 10px;
            font-size: 0.75rem; 
            color: #9699a6;
        }
        .ext { padding: 0 10px 10px 10px; }
        :host >>> ul { padding: 10px; }
        :host >>> b { color: #bfc1c9; }
        .example { 
            padding: 0 10px; 
            font-size: 0.75rem; 
            color: #9699a6;
        }
        .example p { margin-top: 0; }
        .exampleTitle  {color: white; font-weight: bold;}
        .clickable span.icon { 
            float: right; 
            cursor: pointer; 
        }
        .clickable div {
            border-top: 1px solid #ccc;
            padding: 10px 0;
        }
    `],
    template: `
        <div class="header" [ngClass]="{'showPointer': currentView.parent}" (click)="showParent(currentView)">
            <span *ngIf="currentView.parent" class="icon" [ngStyle]="{'margin-right': '5px'}">&#xe079;</span>
            {{currentView.label}}
        </div>
        <div class="list">
            <ul>
                <li *ngFor="let kid of currentView.kids" (click)="showKid(kid)">
                    <span class='icon' [innerHTML]="kid.icon"></span>
                    {{kid.label}}
                    <span class='icon' [ngStyle]="{ 'float': 'right' }" *ngIf="kid.kids">&#xe080;</span>
                </li>
            </ul>
        </div>
        <div class="desc" [innerHTML]="description"></div>
        <div class="ext"  [innerHTML]="ext"></div>
        <div class="example" *ngIf="example">
            <p>Click the <span class='icon'>&#xe131;</span> beside an example to load it.</p>
            <p class="exampleTitle">Example</p>
            <div class="clickable" *ngIf="example">
                <div>
                    {{example[EXAMPLE_EXPRESSION]}}  
                    <span (click)="onUpdateExpression(example[EXAMPLE_EXPRESSION])" class='icon'>&#xe131;</span>
                </div>
                <div>
                    {{example[EXAMPLE_TEXT]}}
                    <span (click)="onUpdateText(example[EXAMPLE_TEXT])" class='icon'>&#xe131;</span>
                </div>
            </div>
        </div>
    `
})
export class LibraryView {
    currentView: any;
    description: string;
    ext: string;
    example: any;
    private EXAMPLE_EXPRESSION: number = 0;
    private EXAMPLE_TEXT: number = 1;
    @Output() UpdateExpression = new EventEmitter();
    @Output() UpdateText = new EventEmitter();

    constructor(private libViewService: LibraryViewService) {
        this.currentView = libViewService.documentation;
        this.description = this.currentView.desc;
        this.ext = this.currentView.ext;
    } 

    showKid (view) {
        if (view.kids) {
            view.parent = this.currentView;
            this.currentView = view;
        }
        this.description = view.desc;
        this.example = view.example;
        this.ext = view.ext;
    }

    showParent (view) {
        if(view.parent) {
            this.currentView = view.parent;
            this.description = this.currentView.desc;
            this.example = this.currentView.example;
            this.ext = this.currentView.ext;
        }
    }

    onUpdateExpression (expression: string) {
        this.UpdateExpression.emit(expression);
    }

    onUpdateText (text: string) {
        this.UpdateText.emit(text);
    }
}