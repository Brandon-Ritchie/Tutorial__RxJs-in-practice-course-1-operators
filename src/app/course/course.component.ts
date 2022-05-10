import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Course } from "../model/course";
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll,
  shareReplay,
  throttle,
} from "rxjs/operators";
import {
  merge,
  fromEvent,
  Observable,
  concat,
  of,
  interval,
  forkJoin,
} from "rxjs";
import { Lesson } from "../model/lesson";
import { createHttpObservable } from "../common/util";
import { searchLessons } from "../../../server/search-lessons.route";
import { RxJsLoggingLevel, debug, setRxJsLoggingLevel } from "../common/debug";

@Component({
  selector: "course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
})
export class CourseComponent implements OnInit, AfterViewInit {
  courseId: string;
  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;

  @ViewChild("searchInput", { static: true }) input: ElementRef;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.params["id"];

    const course$ = createHttpObservable(`/api/courses/${this.courseId}`);

    const lessons$ = this.loadLessons();

    forkJoin([course$, lessons$])
      .pipe(
        tap(([course, lessons]) => {
          console.log("Course: ", course), console.log("Lessons: ", lessons);
        })
      )
      .subscribe();
  }

  ngAfterViewInit() {
    fromEvent<any>(this.input.nativeElement, "keyup").pipe(
      map((event) => event.target.value),
      startWith(""),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((search) => this.loadLessons(search))
    );
  }

  loadLessons(search = ""): Observable<Lesson[]> {
    return createHttpObservable(
      `/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`
    ).pipe(map((res) => res["payload"]));
  }
}
