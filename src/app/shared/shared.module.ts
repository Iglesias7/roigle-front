import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetModule } from 'src/app/core/widgets/widget.module';
import { AppRoutingModule } from '../app-routing.module';
import { MenuHomeComponent } from './components/menu_home/menu_home.component';

@NgModule({
    declarations: [
      MenuHomeComponent
    ],
    imports: [
      AppRoutingModule,
      CommonModule,
      WidgetModule
    ],
    exports: [
      MenuHomeComponent
    ]
  })
  export class SharedModule { }

