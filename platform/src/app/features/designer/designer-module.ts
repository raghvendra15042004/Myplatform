import { NgModule } from '@angular/core';
import { DesignerRoutingModule } from './designer-routing-module';
import { SharedModule } from '../../shared/shared-module';
import { WidgetsModule } from '../../widgets/widgets-module';
import { AppSettings } from './app-settings/app-settings';
import { FormBuilder } from './form-builder/form-builder';
import { WidgetPanel } from './widget-panel/widget-panel';
import { WidgetConfig } from './widget-config/widget-config';

@NgModule({
  declarations: [AppSettings, FormBuilder, WidgetPanel, WidgetConfig],
  imports: [SharedModule, WidgetsModule, DesignerRoutingModule],
})
export class DesignerModule {}