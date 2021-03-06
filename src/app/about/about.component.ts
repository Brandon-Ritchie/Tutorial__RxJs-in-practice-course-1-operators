import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  fromEvent,
  interval,
  Observable,
  timer,
  noop,
  of,
  concat,
  merge,
  Subject,
} from "rxjs";
import { map } from "rxjs/operators";
import { createHttpObservable } from "../common/util";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
