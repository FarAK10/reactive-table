import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-reset-button',
  templateUrl: './reset-button.component.html',
  styleUrls: ['./reset-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetButtonComponent implements OnInit {
  @Input() public disabled: boolean = false;
  @Input() public text: string = '';
  @Input() public isFilterEmpty: boolean = true;
  @Output() public onClick = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}

  onPress(): void {
    this.onClick.emit();
  }
}
