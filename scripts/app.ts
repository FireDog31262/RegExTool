import {Component} from '@angular/core'; 
import {Main} from './containers';

@Component({
    selector: 'my-app',
    directives:[
        Main
    ],
    styles: [`
        .mainContainer {
            display: block;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
        }
    `],
    template: `
        <main-container class=mainContainer></main-container>
    `
})
export class AppComponent {
    ngOnInit() {
        toastr.options = {
            "positionClass": "toast-bottom-right",
            "timeOut": 1500,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "slideDown",
            "hideMethod": "fadeOut"
        };
    }
}