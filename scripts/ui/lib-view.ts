import { Component } from '@angular/core';
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
        .desc, .example { 
            padding: 20px;
            font-size: 0.75rem; 
            color: #9699a6;
        }
        .desc { overflow-y: auto; }
        .example { padding: 0 10px; }
        .desc ul { padding: 0; }
        .desc b, .desc ul li b { color: #bfc1c9; }
    `],
    template: `
        <div class="header" (click)="showParent(currentView)">
            <i *ngIf="currentView.parent" [ngStyle]="{'margin-right': '3px'}"><</i>
            {{currentView.label}}
            <span>-</span>
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

        </div>
    `
})
export class LibraryView {
    currentView: any;
    description: string;
    example: any;

    constructor(private libViewService: LibraryViewService) {
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
        }
    }
}