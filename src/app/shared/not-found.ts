import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  imports: [RouterLink],
  template:
    '<div class="page-heading"><span class="eyebrow">404 / NOT FOUND</span><h1>A little off the path.</h1><p>This experiment does not exist.</p><a class="button primary" routerLink="/overview">Back to overview →</a></div>',
})
export class NotFound {}
