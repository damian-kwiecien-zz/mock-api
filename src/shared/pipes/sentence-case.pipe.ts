import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'sentenceCase' })
export class SentenceCasePipe implements PipeTransform {

    transform(value: string, args: string[]): string {
        return value[0].toUpperCase().concat(value.slice(1))
    }
}