import { Component, Output, EventEmitter, ElementRef } from '@angular/core';
import {LibraryViewService} from '../services/libView.service';

@Component({
    selector: 'lib-view',
    styles: [`
        .header { padding: 10px; }
        .header span {
            display: block;
            float: right;
            cursor: pointer;
        }
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
        .desc { 
            overflow-y: auto; 
            padding: 20px;
            font-size: 0.75rem; 
            color: #9699a6;
        }
        :host >>> ul { padding: 10px; }
        :host >>> b { color: #bfc1c9; }
        .example { 
            padding: 0 10px; 
            font-size: 0.75rem; 
            color: #9699a6;
        }
        .example p { margin-top: 0; }
    `],
    template: `
        <div class="header" [ngClass]="{'showPointer': currentView.parent}" (click)="showParent(currentView)">
            <i *ngIf="currentView.parent" [ngStyle]="{'margin-right': '3px'}"><</i>
            {{currentView.label}}
            <span (click)="toggleLibraryView()">-</span>
        </div>
        <div class="list">
            <ul>
                <li *ngFor="let kid of currentView.kids" (click)="showKid(kid)">
                    <i [innerHTML]="kid.icon"></i>
                    {{kid.label}}
                    <i [ngStyle]="{ 'float': 'right' }" *ngIf="kid.kids">></i>
                </li>
            </ul>
        </div>
        <div class="desc" [innerHTML]="description"></div>
        <div class="example" *ngIf="example">
            <p>Click the <span class='icon'>&#xE212;</span> beside an example to load it.</p>
            <div *ngIf="example">
                <div>
                    {{example[EXAMPLE_EXPRESSION]}}  
                    <span class='icon'>&#xE212;</span>
                </div>
                <div>
                    {{example[EXAMPLE_TEXT]}}
                    <span class='icon'>&#xE212;</span>
                </div>
            </div>
        </div>
    `
})
export class LibraryView {
    currentView: any;
    description: string;
    example: any;
    private EXAMPLE_EXPRESSION: number = 0;
    private EXAMPLE_TEXT: number = 1;
    @Output() toggleView = new EventEmitter();

    constructor(public elementRef: ElementRef, 
                private libViewService: LibraryViewService) {
        this.currentView = libViewService.documentation;
        this.description = this.currentView.desc;
    } 

    showKid (view) {
        if (view.kids) {
            view.parent = this.currentView;
            this.currentView = view;
        }
        this.description = view.desc;
        this.example = view.example;
    }

    showParent (view) {
        if(view.parent) {
            this.currentView = view.parent;
            this.description = this.currentView.desc;
            this.example = this.currentView.example;
        }
    }

    toggleLibraryView () {
        this.toggleView.emit(null);
    }
}