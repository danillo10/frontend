import { InMemoryDbService } from 'angular-in-memory-web-api';

import { CalendarFakeDb } from 'app/fake-db/calendar';
import { ScrumboardFakeDb } from 'app/fake-db/scrumboard';
import { ReportsGraphicsFakeDb } from 'app/fake-db/reports-graphics';
import { AccountsPlanFakeDb } from 'app/fake-db/accounts-plan';
import { RegisterFakeDb } from 'app/fake-db/register';

export class FakeDbService implements InMemoryDbService
{
    createDb(): any
    {
        return {
            // Register
            'register-imobiliarias': RegisterFakeDb.imobiliarias,

            // Calendar
            'calendar': CalendarFakeDb.data,
            
            // Scrumboard
            'scrumboard-boards': ScrumboardFakeDb.boards,
            
            // Graphics
            'reports-graphics-widgets': ReportsGraphicsFakeDb.widgets,
            
            // Accounts Plan
            'accounts-plan': AccountsPlanFakeDb.data,
        };
    }
}
