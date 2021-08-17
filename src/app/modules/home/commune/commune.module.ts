import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WidgetModule } from 'src/app/core/widgets/widget.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommuneComponent } from './commune.component';
import { CommuneRoutingModule } from './commune.routing.module';
import { HabitantComponent } from './habitants/habitants.component';
import { MonCompteComponent } from './mon_compte/mon_compte.component';
import { UpdateHabitantComponent } from './habitants/update_habitant/update_habitant.component';
import { LoaderComponent } from 'src/app/core/widgets/loader/loader.component';

@NgModule({
  declarations: [
    CommuneComponent,
    HabitantComponent,
    MonCompteComponent,
    UpdateHabitantComponent,
    LoaderComponent
  ],
  imports: [
    CommuneRoutingModule,
    WidgetModule,
    ReactiveFormsModule
  ],
  entryComponents: [UpdateHabitantComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CommuneModule { }
