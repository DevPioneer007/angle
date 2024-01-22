import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';

@Component({
    selector: 'app-validation',
    templateUrl: './validation.component.html',
    styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {

    valForm: FormGroup;
    blackList = ['bad@email.com', 'some@mail.com', 'wrong@email.co'];

    constructor(fb: FormBuilder) {

        let password = new FormControl('', Validators.required);
        let certainPassword = new FormControl('', CustomValidators.equalTo(password));

        // Model Driven validation
        this.valForm = fb.group({

            'sometext': fb.control(null, Validators.required),
            'checkbox': fb.control(null, Validators.required),
            'radio': fb.control('', Validators.required),
            'select': fb.control(null, Validators.required),
            'digits': fb.control(null, Validators.pattern('^[0-9]+$')),
            'minlen': fb.control(null, Validators.minLength(6)),
            'maxlen': fb.control(null, Validators.maxLength(10)),

            'email': fb.control(null, CustomValidators.email),
            'url': fb.control(null, CustomValidators.url),
            'date': fb.control(null, CustomValidators.date),
            'number': fb.control(null, Validators.compose([Validators.required, CustomValidators.number])),
            'alphanum': fb.control(null, Validators.pattern('^[a-zA-Z0-9]+$')),
            'minvalue': fb.control(null, CustomValidators.min(6)),
            'maxvalue': fb.control(null, CustomValidators.max(10)),
            'minwords': fb.control(null, this.minWords(6)),
            'maxwords': fb.control(null, this.maxWords(10)),
            'minmaxlen': fb.control(null, CustomValidators.rangeLength([6, 10])),
            'range': fb.control(null, CustomValidators.range([10, 20])),
            'rangewords': fb.control(null, Validators.compose([this.minWords(6), this.maxWords(10)])),
            'email_bl': fb.control(null, this.checkBlackList(this.blackList) ),

            'passwordGroup': fb.group({
                password: password,
                confirmPassword: certainPassword
            })

        });
    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) {
            console.log('Valid!');
        }
        console.log(value);
    }

    minWords(checkValue): ValidatorFn {
        return <ValidatorFn>((control: FormControl) => {
            return (control.value || '').split(' ').length >= checkValue ? null : { 'minWords': control.value };
        });
    }

    maxWords(checkValue): ValidatorFn {
        return <ValidatorFn>((control: FormControl) => {
            return (control.value || '').split(' ').length <= checkValue ? null : { 'maxWords': control.value };
        });
    }

    checkBlackList(list: Array<string>): ValidatorFn {
        return <ValidatorFn>((control: FormControl) => {
            return list.indexOf(control.value) < 0 ? null : { 'blacklist': control.value };
        });
    }

    ngOnInit() {
    }

}
