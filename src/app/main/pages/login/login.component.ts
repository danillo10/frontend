import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

import { LoginService } from 'app/shared/services/login.service';

@Component({
  selector   : 'login',
  templateUrl: './login.component.html',
  styleUrls  : ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     * @param {Router} _router
     * @param {LoginService} _loginService
     */
    constructor(
      private _fuseConfigService: FuseConfigService,
      private _formBuilder: FormBuilder,
      private _router: Router,
      private _loginService: LoginService
  )
  {
      // Configure the layout
      this._fuseConfigService.config = {
          layout: {
              navbar   : {
                  hidden: true
              },
              toolbar  : {
                  hidden: true
              },
              footer   : {
                  hidden: true
              },
              sidepanel: {
                  hidden: true
              }
          }
      };
  }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            email   : ['admin@superuser.com', [Validators.required, Validators.email]],
            password: ['cafecomleite', Validators.required]
        });
    }

    /**
     * On submit
     */
    onSubmit(form: FormGroup) {
      this._loginService.doLogin(form.value)
        .then(res => this._router.navigate(['inicio']));
    }
}