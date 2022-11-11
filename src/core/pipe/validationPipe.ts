import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";

@Injectable()
export class ParseNumberQueryPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        for(let [k,v] of Object.entries(value)) {
            if(typeof v === 'string') {
                value[k] = parseInt(v)
            }
        }
        return value;
    }
}