import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-edit-button',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditButtonComponent implements OnInit {
  @Input() public disabled: boolean = false;
  @Input() public text: string = '';
  @Output() public onClick = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}

  onPress(): void {
    this.onClick.emit();
  }
}
