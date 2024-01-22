import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-folder',
    templateUrl: './folder.component.html',
    styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit, OnDestroy {

    folder: string = '';
    mails: Array<any> = [];
    private sub: any;

    constructor(public route: ActivatedRoute, public http: HttpClient) {

        this.http.get<any>('assets/server/mails.json')
            .subscribe((data) => {
                this.mails = data.mails;
            });

        this.sub = this.route.params.subscribe(params => {
            this.folder = params['folder'] === 'inbox' ? '' : params['folder'];
        });
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    isMailOfFolder(mail) {
        return mail.folder === this.folder;
    }

    folderMailsCount() {
        return this.folderMails().length;
    }

    folderMails() {
        return this.mails.filter(m => (m.folder === this.folder || this.folder === ''))
    }
}
