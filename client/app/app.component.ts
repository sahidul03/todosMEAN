import { Component } from '@angular/core';
import { TodosService } from './services/todos.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [TodosService]
})

export class AppComponent { }