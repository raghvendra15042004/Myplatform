import { NgModule } from '@angular/core';
import { RecordRoutingModule } from './record-routing-module';
import { SharedModule } from '../../shared/shared-module';
import { WidgetsModule } from '../../widgets/widgets-module';
import { Record } from './record/record';

@NgModule({
  declarations: [Record],
  imports: [SharedModule, WidgetsModule, RecordRoutingModule],
})
export class RecordModule {}