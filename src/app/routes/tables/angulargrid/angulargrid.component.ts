import { Component, OnInit, OnDestroy } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
declare var $: any;

@Component({
    selector: 'app-angulargrid',
    templateUrl: './angulargrid.component.html',
    styleUrls: ['./angulargrid.component.scss']
})
export class AngulargridComponent implements OnInit, OnDestroy {

    resizeEvent = 'resize.ag-grid';
    $win = $(window);

    gridOptions: GridOptions;
    gridOptions1: GridOptions;
    gridOptions2: GridOptions;

    // Basic example
    columnDefs = [
        {
            headerName: 'Athlete',
            field: 'athlete',
            width: 150
        }, {
            headerName: 'Age',
            field: 'age',
            width: 90
        }, {
            headerName: 'Country',
            field: 'country',
            width: 120
        }, {
            headerName: 'Year',
            field: 'year',
            width: 90
        }, {
            headerName: 'Date',
            field: 'date',
            width: 110
        }, {
            headerName: 'Sport',
            field: 'sport',
            width: 110
        }, {
            headerName: 'Gold',
            field: 'gold',
            width: 100
        }, {
            headerName: 'Silver',
            field: 'silver',
            width: 100
        }, {
            headerName: 'Bronze',
            field: 'bronze',
            width: 100
        }, {
            headerName: 'Total',
            field: 'total',
            width: 100
        }];

    // Filter Example
    irishAthletes = ['John Joe Nevin', 'Katie Taylor', 'Paddy Barnes', 'Kenny Egan', 'Darren Sutherland', 'Margaret Thatcher', 'Tony Blair', 'Ronald Regan', 'Barack Obama'];

    columnDefsFilter = [{
        headerName: 'Athlete',
        field: 'athlete',
        width: 150,
        filter: 'set',
        filterParams: {
            cellHeight: 20,
            values: this.irishAthletes
        }
    }, {
        headerName: 'Age',
        field: 'age',
        width: 90,
        filter: 'number'
    }, {
        headerName: 'Country',
        field: 'country',
        width: 120
    }, {
        headerName: 'Year',
        field: 'year',
        width: 90
    }, {
        headerName: 'Date',
        field: 'date',
        width: 110
    }, {
        headerName: 'Sport',
        field: 'sport',
        width: 110
    }, {
        headerName: 'Gold',
        field: 'gold',
        width: 100,
        filter: 'number'
    }, {
        headerName: 'Silver',
        field: 'silver',
        width: 100,
        filter: 'number'
    }, {
        headerName: 'Bronze',
        field: 'bronze',
        width: 100,
        filter: 'number'
    }, {
        headerName: 'Total',
        field: 'total',
        width: 100,
        filter: 'number'
    }];

    rowData1: any;
    rowData2: any;
    rowData3: any;

    // Pinned example
    columnDefsPinned: any;

    constructor(http: HttpClient) {
        // Basic example
        this.gridOptions = {
            headerHeight: 40,
            columnDefs: this.columnDefs,
            // rowData: null,
        };


        // Filter example
        this.gridOptions1 = {
            headerHeight: 40,
            columnDefs: this.columnDefsFilter,
            // rowData: null,
            // enableFilter: true,
        };

        // Pinned Example
        this.columnDefsPinned = _.cloneDeep(this.columnDefs);
        this.columnDefsPinned[0].pinned = 'left';
        this.gridOptions2 = {
            headerHeight: 40,
            columnDefs: this.columnDefsPinned,
            // rowData: null
        };

        const data = http.get<any>('assets/server/ag-owinners.json');
        this.rowData1 = data;
        this.rowData2 = data;
        this.rowData3 = data;

    }

    onQuickFilterChanged($event) {
        this.gridOptions1?.api?.setQuickFilter($event.target.value);
    }

    ngOnInit() { }

    gridReady(params) {
        params.api.sizeColumnsToFit();
        this.$win.on(this.resizeEvent, () => {
            setTimeout(() => { params.api.sizeColumnsToFit(); });
        });
    }

    gridReady1(params) {
        params.api.sizeColumnsToFit();
        this.$win.on(this.resizeEvent, () => {
            setTimeout(() => { params.api.sizeColumnsToFit(); });
        });
    }

    gridReady2(params) {
        params.api.sizeColumnsToFit();
        this.$win.on(this.resizeEvent, () => {
            setTimeout(() => { params.api.sizeColumnsToFit(); });
        });
    }

    ngOnDestroy() {
        this.$win.off(this.resizeEvent);
    }

}
