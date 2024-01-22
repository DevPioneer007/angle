import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
    calendarEvents: Array<any> = this.createDemoEvents();
    selectedEvent: any = null;
    @ViewChild('externalEventsList', { static: true }) externalEventsList!: ElementRef;

    calendarPlugins = [
        interactionPlugin,
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
        bootstrapPlugin
    ];

    calendarHeader = {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    };

    // External events properties

    evColors = [
        'danger',
        'primary',
        'info',
        'success',
        'warning',
        'green',
        'pink',
        'inverse',
        'purple'
    ];
    externalEvents = [
        { color: 'green', name: 'Lunch' },
        { color: 'danger', name: 'Go home' },
        { color: 'info', name: 'Do homework' },
        { color: 'warning', name: 'Work on UI design' },
        { color: 'inverse', name: 'Sleep tight' }
    ];
    evRemoveOnDrop = false;
    evSelectedColor = this.evColors[0];
    evNewName = '';

    constructor() {}

    ngOnInit() {
        /* initialize the external events */
        new Draggable(this.externalEventsList.nativeElement, {
            itemSelector: '.fce-event',
            eventData: function(eventEl) {
                return {
                    title: eventEl.innerText.trim()
                };
            }
        });
    }

    createDemoEvents() {
        // Date for the calendar events (dummy data)
        var date = new Date();
        var d = date.getDate(),
            m = date.getMonth(),
            y = date.getFullYear();

        return [
            {
                title: 'All Day Event',
                start: new Date(y, m, 1),
                backgroundColor: '#f56954', //red
                borderColor: '#f56954' //red
            },
            {
                title: 'Long Event',
                start: new Date(y, m, d - 5),
                end: new Date(y, m, d - 2),
                backgroundColor: '#f39c12', //yellow
                borderColor: '#f39c12' //yellow
            },
            {
                title: 'Meeting',
                start: new Date(y, m, d, 10, 30),
                allDay: false,
                backgroundColor: '#0073b7', //Blue
                borderColor: '#0073b7' //Blue
            },
            {
                title: 'Lunch',
                start: new Date(y, m, d, 12, 0),
                end: new Date(y, m, d, 14, 0),
                allDay: false,
                backgroundColor: '#00c0ef', //Info (aqua)
                borderColor: '#00c0ef' //Info (aqua)
            },
            {
                title: 'Birthday Party',
                start: new Date(y, m, d + 1, 19, 0),
                end: new Date(y, m, d + 1, 22, 30),
                allDay: false,
                backgroundColor: '#00a65a', //Success (green)
                borderColor: '#00a65a' //Success (green)
            },
            {
                title: 'Open Google',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                url: '//google.com/',
                backgroundColor: '#3c8dbc', //Primary (light-blue)
                borderColor: '#3c8dbc' //Primary (light-blue)
            }
        ];
    }

    addRandomEvent() {
        // add dynamically an event
        this.addEvent({
            title: 'Random Event',
            start: new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                Math.random() * (30 - 1) + 1
            ),
            backgroundColor: '#c594c5', //purple
            borderColor: '#c594c5' //purple
        });
    }

    dayClick(date) {
        this.selectedEvent = {
            date: date.dateStr
        };
    }

    // add event directly into calendar
    addEvent(event) {
        this.calendarEvents.push(event);
    }

    handleEventReceive(info) {
        var styles = getComputedStyle(info.draggedEl);
        info.event.setProp('backgroundColor', styles.backgroundColor);
        info.event.setProp('borderColor', styles.borderColor);

        // is the "remove after drop" checkbox checked?
        if (this.evRemoveOnDrop) {
            this.removeExternalEvent(info.draggedEl.textContent);
        }
    }

    getEvColorClasses(evcolor) {
        return 'bg-' + evcolor + (this.evSelectedColor === evcolor ? ' selected' : '');
    }

    addNewExternalEvent() {
        this.externalEvents.push({
            color: this.evSelectedColor,
            name: this.evNewName
        });
    }

    removeExternalEvent(name) {
        const index = this.externalEvents.findIndex(e => e.name === name);
        if (index > -1) this.externalEvents.splice(index, 1);
    }
}
