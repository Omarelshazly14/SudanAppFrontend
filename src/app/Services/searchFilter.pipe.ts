import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "searchFilter"
})
export class SearchFilterPipe implements PipeTransform {
    transform(value: any, args: any) {
        if (!value) return [];

        args = args.toLowerCase();
        return value.filter((item) => {
            return JSON.stringify(item)
                .toLowerCase()
                .includes(args);
        })
    }
}