import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
    // TOASTER
    toaster: any;

    // ALERTs
    public alerts: Array<any> = [
        {
            type: 'danger',
            msg: 'Oh snap! Change a few things up and try submitting again.'
        },
        {
            type: 'success',
            msg: 'Well done! You successfully read this important alert message.',
            closable: true
        }
    ];

    // PROGRESSBAR
    public max: number = 200;
    public showWarning: boolean;
    public dynamic: number;
    public type: string;
    public stacked: any[] = [];

    // TOOLTIPS
    public dynamicTooltip: string = 'Hello, World!';
    public dynamicTooltipText: string = 'dynamic';
    public htmlTooltip: string = 'I\'ve been made <b>bold</b>!';
    public tooltipModel: any = { text: 'foo', index: 1 };
    public ttcontent: string = 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.';

    // RATINGS
    public x: number = 5;
    public y: number = 2;
    public maxRat: number = 10;
    public rate: number = 7;
    public isReadonly: boolean = false;
    public overStar: number;
    public percent: number;

    constructor(private toastr: ToastrService) {

        this.toaster = {
            type: 'success',
            title: 'Title',
            text: 'Message'
        };

        this.random();
        this.randomStacked();

    }

    ngOnInit() { }

    // TOSATER METHOD
    pop() {
        this.toastr[this.toaster.type](this.toaster.text, this.toaster.title);
    };

    // ALERT METHOD
    public closeAlert(i: number): void {
        this.alerts.splice(i, 1);
    }

    public addAlert(): void {
        this.alerts.push({ msg: 'Another alert!', type: 'warning', closable: true });
    }

    // PROGRESSBAR METHODS
    public random(): void {
        let value = Math.floor((Math.random() * 100) + 1);
        let type: string;

        if (value < 25) {
            type = 'success';
        } else if (value < 50) {
            type = 'info';
        } else if (value < 75) {
            type = 'warning';
        } else {
            type = 'danger';
        }

        this.showWarning = (type === 'danger' || type === 'warning');
        this.dynamic = value;
        this.type = type;
    };

    public randomStacked(): void {
        let types = ['success', 'info', 'warning', 'danger'];

        this.stacked = [];
        let total = 0;
        let n = Math.floor((Math.random() * 4) + 1);
        for (let i = 0; i < n; i++) {
            let index = Math.floor((Math.random() * 4));
            let value = Math.floor((Math.random() * 30) + 1);
            total += value;
            this.stacked.push({
                value: value,
                max: value, // i !== (n - 1) ? value : 100,
                type: types[index]
            });
        }
    };

    // TOOLTIPS METHODS
    public tooltipStateChanged(state: boolean): void {
        console.log(`Tooltip is open: ${state}`);
    }

    // RATINGS METHODS
    public hoveringOver(value: number): void {
        this.overStar = value;
        this.percent = 100 * (value / this.maxRat);
    };

    public resetStar(): void {
        this.overStar = 0;
    }
}
