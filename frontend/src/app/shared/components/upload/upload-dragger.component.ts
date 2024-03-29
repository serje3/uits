import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'upload-dragger',
  templateUrl: 'upload-dragger.component.html',
})
export class UploadDraggerComponent {

    @Input() disabled = false;
    @Output() change: EventEmitter<any> = new EventEmitter<any>();

    dragger = false;

    dragoverHandle(event: Event): void {
        event.preventDefault();
        if (this.disabled) {return;}
        this.dragger = true;
    }

    dragLeaveHandle(event: Event): void {
        event.preventDefault();
        this.dragger = false;
    }

    dropHandle(event: DragEvent): void {
        event.preventDefault();
        if (this.disabled) {return;}
        this.change.emit({ target: { files: event.dataTransfer.files }});
    }
}
