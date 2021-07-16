import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector     : 'quick-panel',
    templateUrl  : './quick-panel.component.html',
    styleUrls    : ['./quick-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class QuickPanelComponent
{
    form: FormGroup;
    date: Date;
    events: any[];
    notes: any[];
    settings: any;

    /**
     * Constructor
     * 
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _formBuilder: FormBuilder
    )
    {
        this.form = this._formBuilder.group({
            name: ['Nome', Validators.required],
            email   : ['Nome@email.com.br', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            settings: this._formBuilder.group({
                notify  : [true],
                cloud   : [false],
                retro   : [true],
            })
        });

        // Set the defaults
        this.date = new Date();
        this.settings = {
            notify: true,
            cloud : false,
            retro : true
        };
    }
}
