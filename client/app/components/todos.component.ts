import { Component, OnInit } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { Todo } from '../custom_classes/Todo';

@Component({
    moduleId: module.id,
    selector: 'todos',
    templateUrl: 'todos.component.html'
})

export class TodosComponent implements OnInit{
    todos: any

    constructor(private _todosService: TodosService){

    }

    ngOnInit(){
        this.todos= [];
        this._todosService.getTodos().subscribe(todos => {
            this.todos = todos;
        })
    }

    addTodo(event, todoText){
        var newTodo = {
            text: todoText.value,
            isCompleted: false
        };
        this._todosService.saveTodo(newTodo).subscribe(x => {
            this.todos.push(newTodo);
        });
        todoText.value = '';
    }
    setEditState(todo, state){
        if(state){
            todo.isEditMode = state;
        }else{
            delete todo.isEditMode;
        }
    }
    updateStatus(todo){
        var _todo = {
            _id: todo._id,
            text: todo.text,
            isCompleted: !todo.isCompleted
        };
        this._todosService.updateTodo(_todo)
            .subscribe(data => {
                todo.isCompleted = !todo.isCompleted;
                todo.isCompleted = !todo.isCompleted;
            });
    }
    updateTodoText(event, todo ){
        if(event.which === 13){
            todo.text = event.target.value;
            var _todo = {
                _id: todo._id,
                text: todo.text,
                isCompleted: todo.isCompleted
            };
            this._todosService.updateTodo(_todo)
                .subscribe(data => {
                    this.setEditState(todo, false);
                });
        }
    }
    deleteTodo(todo){
        this._todosService.deleteTodo(todo._id)
            .subscribe(data => {
                if(data.n == 1){
                    for(var i = 0; i < this.todos.length; i++){
                        if(this.todos[i]._id == todo._id){
                            this.todos.splice(i, 1);
                        }
                    }
                }
            });
    }
}