import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';

@Component({
    selector: 'app-delete-button',
    templateUrl: './delete-button.component.html',
    styleUrls: ['./delete-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteButtonComponent implements OnInit {
    @Input() public disabled: boolean = false;
    @Input() public text: string = '';
    @Output() public onClick = new EventEmitter<void>();
    constructor() {}

    ngOnInit(): void {}

    onPress(): void {
        this.onClick.emit();
    }
}
