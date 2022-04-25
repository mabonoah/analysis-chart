import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  /**
   * Group an array of objects depends on a specific key
   * @returns Grouped data object
   */
  groupBy(array: any[], key: string, excludedProps?: string[]): {} {
    return array.reduce((result: any, currentValue: any) => {
      // If the excludedProps array has a value, delete the excluded properties from the currentValue
      if (excludedProps)
        excludedProps.map((prop: string) => {
          delete currentValue[prop]
        });
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  };

}
