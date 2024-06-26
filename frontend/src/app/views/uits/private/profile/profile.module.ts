import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { routes } from './profile.routing.module';
import { RouterModule } from '@angular/router';
import { ColumnPanelModule } from '@app/shared/components/column-panel/column-panel.module';
import { RadioModule } from '@app/shared/components/radio/radio.module';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UploadModule } from '@app/shared/components/upload/upload.module'
import { SwitchModule } from '@app/shared/components/switch/switch.module';
import { ToastrModule } from 'ngx-toastr';

import { RowContentComponent } from './row-content/row-content.component';
import { ProfileComponent } from './profile.component';
import { PersonalComponent } from './personal/personal.component';
import {AuthGuard} from "@app/shared/guards/auth.guard";
import { EventsComponent } from './events/events.component';
import {TabsModule} from "ngx-bootstrap/tabs";
import {CalendarModule} from "angular-calendar";
import {NgSelectModule} from "@ng-select/ng-select";
import {TimepickerModule} from "ngx-bootstrap/timepicker";
import {ModalModule} from "ngx-bootstrap/modal";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {NgOptimizedImage} from "@angular/common";
import {PopoverModule} from "ngx-bootstrap/popover";
import {FormatPipeModule} from "ngx-date-fns";
import {AccordionModule} from "ngx-bootstrap/accordion";
import {CollapseModule} from "ngx-bootstrap/collapse";
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ruLocale } from 'ngx-bootstrap/locale';
import {CheckboxModule} from "@app/shared/components/checkbox/checkbox.module";

defineLocale('ru', ruLocale);

@NgModule({
    declarations: [
        ProfileComponent,
        PersonalComponent,
        RowContentComponent,
        EventsComponent
    ],
    imports: [
        SharedModule,
        ColumnPanelModule,
        RadioModule,
        BsDatepickerModule.forRoot(),
        UploadModule.forRoot(),
        SwitchModule,
        ToastrModule.forRoot(),
        NgBootstrapFormValidationModule.forRoot(),
        RouterModule.forChild(routes),
        TabsModule,
        CalendarModule,
        NgSelectModule,
        TimepickerModule,
        ModalModule,
        TooltipModule,
        NgOptimizedImage,
        PopoverModule,
        FormatPipeModule,
        AccordionModule,
        CollapseModule,
        CheckboxModule
    ],
    exports: [],
    providers: [
      AuthGuard
    ],
})
export class ProfileModule {}
