import { Type } from '@angular/core';
import { Textfield } from './textfield/textfield';
import { Numberfield } from './numberfield/numberfield';
import { Combo } from './combo/combo';
import { Radio } from './radio/radio';
import { Checkboxgroup } from './checkboxgroup/checkboxgroup';
import { Datefield } from './datefield/datefield';
import { Textarea } from './textarea/textarea';
import { Fileupload } from './fileupload/fileupload';

export const WIDGET_MAP: Record<string, Type<any>> = {
  textfield: Textfield,
  numberfield: Numberfield,
  combo: Combo,
  radio: Radio,
  checkboxgroup: Checkboxgroup,
  datefield: Datefield,
  textarea: Textarea,
  fileuploadContainer: Fileupload,
};