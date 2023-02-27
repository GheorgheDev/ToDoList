import { Component, Input, Output, EventEmitter } from '@angular/core';

import { TaskToDelete } from 'src/app/interface/taskToDelete';

@Component({
  selector: 'app-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.scss']
})
export class TableCellComponent {
  @Input() nameToDoList!: string;
  @Input() estimationTime!: number;
  @Input() description!: string;
  @Input() id!: number;
  @Input() columnName!: string;
  @Output() onDeleteTask: EventEmitter<TaskToDelete> = new EventEmitter();

  deleteTask(event: Event): void {
    const taskToDelete: TaskToDelete = {
      id: parseInt((event.target as HTMLButtonElement).id),
      columnName: this.columnName
    }

    this.onDeleteTask.emit(taskToDelete)
  }
}
