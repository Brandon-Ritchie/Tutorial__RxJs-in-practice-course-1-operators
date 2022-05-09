import { Observable, observable } from "rxjs";
import { tap } from "rxjs/operators";

export const degub = (level: number, message: string) => {
  (source: Observable<any>) =>
    source.pipe(
      tap((val) => {
        console.log(message + ": " + val);
      })
    );
};
