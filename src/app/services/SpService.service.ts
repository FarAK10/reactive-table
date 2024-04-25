import { Injectable } from '@angular/core';
import { ISelectItem } from '../types/interfaces/select-item.interface';
import { SpSelectItems } from '../types/enums/sp-select-items';

@Injectable({
  providedIn: 'root',
})
export class SpServiceService {
  spSubjects: ISelectItem[] = [
    { label: 'Mathematics', value: 101 },
    { label: 'English Literature', value: 102 },
    { label: 'Physics', value: 103 },
    { label: 'Chemistry', value: 104 },
    { label: 'Biology', value: 105 },
    { label: 'History', value: 106 },
    { label: 'Geography', value: 107 },
    { label: 'Art', value: 108 },
    { label: 'Music', value: 109 },
    { label: 'Physical Education', value: 110 },
  ];
  constructor() {}

  getSpSelectItems(sp: SpSelectItems): ISelectItem[] {
    let spItems = [];
    switch (sp) {
      case SpSelectItems.subjects:
        spItems = this.spSubjects;
    }
    return spItems.slice();
  }

  getSpLabelByValue(spName: SpSelectItems, value: any): string {
    return (
      this.getSpSelectItems(spName).find((selItem) => selItem.value === value)
        ?.label || ''
    );
  }

  getSpLabelsByValues(spName: SpSelectItems, values: any[]): string[] {
    return values.map((value) => this.getSpLabelByValue(spName, value));
  }
}
