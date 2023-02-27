import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Task } from './interface/task';
import { TaskToDelete } from './interface/taskToDelete';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('form') form!: ElementRef;
  @ViewChild('columnName') columnName!: ElementRef;

  taskForm!: FormGroup;

  toDoList: Task[] = [];
  inProgressList: Task[] = [];
  toBeTestedList: Task[] = [];
  doneList: Task[] = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      id: [0, [Validators.required]],
      name: ['', [Validators.required]],
      time: [0, [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  addTask(): void {
    if (this.taskForm.valid) {
      const columnType = (this.columnName.nativeElement as HTMLSpanElement).dataset.column;
      
      this.taskForm.patchValue({
        id: Math.round(Date.now() * Math.random())
      })

      switch (columnType) {
        case 'to do':
          this.toDoList.push(this.taskForm.value);
          break;
        case 'in progress':
          this.inProgressList.push(this.taskForm.value);
          break;
        case 'to be tested':
          this.toBeTestedList.push(this.taskForm.value);
          break;
        case 'done':
          this.doneList.push(this.taskForm.value);
          break;
      }

      this.taskForm.setValue({
        id: 0,
        name: '',
        time: 0,
        description: ''
      })
    }
  }

  deleteTask(task: TaskToDelete): void {
    switch (task.columnName) {
      case 'to do':
        this.toDoList = this.toDoList.filter(todo => todo.id !== task.id);
        break;
      case 'in progress':
        this.inProgressList = this.inProgressList.filter(inProgress => inProgress.id !== task.id);
        break;
      case 'to be tested':
        this.toBeTestedList = this.toBeTestedList.filter(toBeTested => toBeTested.id !== task.id);
        break;
      case 'done':
        this.doneList = this.doneList.filter(done => done.id !== task.id);
        break;
    }
  }

  showForm(event: Event): void {
    const columnName: string = (event.target as HTMLButtonElement).dataset.column || 'new Todolist';
    (this.columnName.nativeElement as HTMLSpanElement).textContent = columnName;
    (this.columnName.nativeElement as HTMLSpanElement).dataset.column = columnName;
    (this.form.nativeElement as HTMLFormElement).classList.add('show');
  }

  hideForm(): void {
    (this.form.nativeElement as HTMLFormElement).classList.remove('show');
  }
}
