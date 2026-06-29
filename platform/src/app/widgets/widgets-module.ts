import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { WidgetRenderer } from './widget-renderer/widget-renderer';
import { FormRenderer } from './form-renderer/form-renderer';
import { Textfield } from './textfield/textfield';
import { Numberfield } from './numberfield/numberfield';
import { Combo } from './combo/combo';
import { Radio } from './radio/radio';
import { Checkboxgroup } from './checkboxgroup/checkboxgroup';
import { Datefield } from './datefield/datefield';
import { Textarea } from './textarea/textarea';
import { Fileupload } from './fileupload/fileupload';

@NgModule({
  declarations: [
    WidgetRenderer,
    FormRenderer,
    Textfield,
    Numberfield,
    Combo,
    Radio,
    Checkboxgroup,
    Datefield,
    Textarea,
    Fileupload,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    ReactiveFormsModule,
    WidgetRenderer,
    FormRenderer,
  ],
})
export class WidgetsModule {}