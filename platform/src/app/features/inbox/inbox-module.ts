import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InboxRoutingModule } from './inbox-routing-module';
import { SharedModule } from '../../shared/shared-module';
import { WidgetsModule } from '../../widgets/widgets-module';
import { Inbox } from './inbox/inbox';

@NgModule({
  declarations: [Inbox],
  imports: [SharedModule, WidgetsModule, FormsModule, InboxRoutingModule],
})
export class InboxModule {}