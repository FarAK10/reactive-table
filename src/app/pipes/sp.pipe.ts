import { Pipe, PipeTransform } from '@angular/core';
import { ISelectItems } from '../types/interfaces/select-item.interface';
import { SpSelectItems } from '../types/enums/sp-select-items';
import { SpServiceService } from '../services/SpService.service';

@Pipe({
  name: 'sp',
})
export class SpPipe implements PipeTransform {
  private cacheObj: any = {};
  constructor(private spService: SpServiceService) {}

  transform(
    spValue: string | number,
    spSelectItem: SpSelectItems
  ): string | number {
    if (typeof spValue === 'string') {
      const parsed = parseInt(spValue, 10);
      if (isNaN(parsed)) {
        return spValue;
      }
      spValue = parsed;
    }
    const cacheKey = `${spValue}-${SpSelectItems || 0}`;

    if (this.cacheObj[cacheKey]) {
      return this.cacheObj[cacheKey];
    }

    if (spSelectItem) {
      const result = this.spService.getSpLabelByValue(spSelectItem, spValue);

      this.cacheObj[cacheKey] = result;
      return result;
    }

    return spValue;
  }
}
