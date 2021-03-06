import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HTTP_PROVIDERS } from '@angular/http';
import {ApiService} from './services/api.service';
import {RegExService} from './services/regex.service'
import {CodemirrorService} from './services/codeMirror.service';
import {HighLightService} from './services/highLight.service';
import {LibraryViewService} from './services/libView.service';
import {AppComponent} from './app';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule, 
        ReactiveFormsModule
    ],
    providers: [
        ...HTTP_PROVIDERS,
        ApiService,
        RegExService,
        CodemirrorService,
        HighLightService,
        LibraryViewService
    ],
    bootstrap: [AppComponent]
})
export class MyAppModule {}

platformBrowserDynamic().bootstrapModule(MyAppModule);