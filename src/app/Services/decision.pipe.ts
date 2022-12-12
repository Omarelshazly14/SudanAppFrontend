import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({ name: 'decision' })
export class DecisionPipe implements PipeTransform {
  transform(value: boolean): string {
    return value == undefined ? 'Pending' : !value ? 'Rejected' : 'Okay';
  }
}
