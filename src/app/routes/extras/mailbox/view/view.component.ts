import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';

import { SettingsService } from '../../../../core/settings/settings.service';

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

    private sub: any;
    mail: any = {};

    constructor(public route: ActivatedRoute, public http: HttpClient, public settings: SettingsService) {

        this.sub = this.route.params.subscribe(params => {

            this.http.get<any>('assets/server/mails.json')
                .subscribe((data) => {
                    let mailsFound = data.mails.filter(m => (m.id === +params['mid']));
                    this.mail = mailsFound.length ? mailsFound[0] : {};
                });

        });

    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    ngOnInit() {
    }

}
