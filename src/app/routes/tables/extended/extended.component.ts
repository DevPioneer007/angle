import { Component, OnInit } from '@angular/core';
import { ColorsService } from '../../../shared/colors/colors.service';

@Component({
    selector: 'app-extended',
    templateUrl: './extended.component.html',
    styleUrls: ['./extended.component.scss']
})
export class ExtendedComponent implements OnInit {

    sparkOptions1 = {
        barColor: this.colors.byName('primary'),
        height: 20,
        barWidth: 5,
        barSpacing: 2,
        resize: true
    }

    sparkOptions2 = {
        barColor: this.colors.byName('purple'),
        height: 20,
        barWidth: 5,
        barSpacing: 2,
        resize: true
    }

    sparkOptions3 = {
        barColor: this.colors.byName('info'),
        height: 20,
        barWidth: 5,
        barSpacing: 2,
        resize: true
    }

    constructor(public colors: ColorsService) { }

    ngOnInit() {
    }


}
