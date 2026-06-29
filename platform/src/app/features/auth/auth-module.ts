import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing-module';
import { Login } from './login/login';

@NgModule({
  declarations: [Login],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule],
})
export class AuthModule {}