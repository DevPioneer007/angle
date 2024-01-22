import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { mergeMap } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
    selector: 'app-interaction',
    templateUrl: './interaction.component.html',
    styleUrls: ['./interaction.component.scss']
})
export class InteractionComponent implements OnInit {

    // CAROUSEL PROPS
    public myInterval: number = 5000;
    public noWrapSlides: boolean = false;
    public slides: Array<any> = [];

    // TYPEAHEAD PROPS
    public stateCtrl: FormControl = new FormControl();

    public myForm: FormGroup = new FormGroup({
        state: this.stateCtrl
    });

    public customSelected: string = '';
    public selected: string = '';
    public dataSource: Observable<any>;
    public asyncSelected: string = '';
    public typeaheadLoading: boolean = false;
    public typeaheadNoResults: boolean = false;
    public states: Array<string> = ['Alabama', 'Alaska', 'Arizona', 'Arkansas',
        'California', 'Colorado',
        'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
        'Illinois', 'Indiana', 'Iowa',
        'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
        'Michigan', 'Minnesota',
        'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
        'New Jersey', 'New Mexico',
        'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon',
        'Pennsylvania', 'Rhode Island',
        'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
        'Virginia', 'Washington',
        'West Virginia', 'Wisconsin', 'Wyoming'];
    public statesComplex: Array<any> = [
        { id: 1, name: 'Alabama' }, { id: 2, name: 'Alaska' }, { id: 3, name: 'Arizona' },
        { id: 4, name: 'Arkansas' }, { id: 5, name: 'California' },
        { id: 6, name: 'Colorado' }, { id: 7, name: 'Connecticut' },
        { id: 8, name: 'Delaware' }, { id: 9, name: 'Florida' },
        { id: 10, name: 'Georgia' }, { id: 11, name: 'Hawaii' },
        { id: 12, name: 'Idaho' }, { id: 13, name: 'Illinois' },
        { id: 14, name: 'Indiana' }, { id: 15, name: 'Iowa' },
        { id: 16, name: 'Kansas' }, { id: 17, name: 'Kentucky' },
        { id: 18, name: 'Louisiana' }, { id: 19, name: 'Maine' },
        { id: 21, name: 'Maryland' }, { id: 22, name: 'Massachusetts' },
        { id: 23, name: 'Michigan' }, { id: 24, name: 'Minnesota' },
        { id: 25, name: 'Mississippi' }, { id: 26, name: 'Missouri' },
        { id: 27, name: 'Montana' }, { id: 28, name: 'Nebraska' },
        { id: 29, name: 'Nevada' }, { id: 30, name: 'New Hampshire' },
        { id: 31, name: 'New Jersey' }, { id: 32, name: 'New Mexico' },
        { id: 33, name: 'New York' }, { id: 34, name: 'North Dakota' },
        { id: 35, name: 'North Carolina' }, { id: 36, name: 'Ohio' },
        { id: 37, name: 'Oklahoma' }, { id: 38, name: 'Oregon' },
        { id: 39, name: 'Pennsylvania' }, { id: 40, name: 'Rhode Island' },
        { id: 41, name: 'South Carolina' }, { id: 42, name: 'South Dakota' },
        { id: 43, name: 'Tennessee' }, { id: 44, name: 'Texas' },
        { id: 45, name: 'Utah' }, { id: 46, name: 'Vermont' },
        { id: 47, name: 'Virginia' }, { id: 48, name: 'Washington' },
        { id: 49, name: 'West Virginia' }, { id: 50, name: 'Wisconsin' },
        { id: 51, name: 'Wyoming' }];

    // CONSTRUCTOR
    constructor() {
        // init carousel
        this.addSlide(4);
        this.addSlide(7);
        this.addSlide(8);
        // init typeahead
        this.dataSource = Observable.create((observer: any) => {
            // Runs on every search
            observer.next(this.asyncSelected);
        })
            .pipe(
                mergeMap((token: string) => this.getStatesAsObservable(token))
            );
    }

    ngOnInit() { }

    // CAROUSEL METHODS
    public addSlide(id = 8): void {
        this.slides.push({
            image: 'assets/img/bg' + id + '.jpg',
            text: `${['More', 'Extra', 'Lots of', 'Surplus'][this.slides.length % 4]}
      ${['Cats', 'Kittys', 'Felines', 'Cutes'][this.slides.length % 4]}`
        });
    }

    // TYPEAHEAD METHODS
    getStatesAsObservable(token: string): Observable<any> {
        const query = new RegExp(token, 'ig');

        return of(
            this.statesComplex.filter((state: any) => {
                return query.test(state.name);
            })
        );
    }

    public changeTypeaheadLoading(e: boolean): void {
        this.typeaheadLoading = e;
    }

    public changeTypeaheadNoResults(e: boolean): void {
        this.typeaheadNoResults = e;
    }

    public typeaheadOnSelect(e: TypeaheadMatch): void {
        console.log('Selected value: ', e.value);
    }

}
