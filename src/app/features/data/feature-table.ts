import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Feature } from './feature.model';
import { Icon } from '../../shared/icon';
@Component({
  selector: 'app-feature-table',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="table-scroll">
      <table>
        <caption class="visually-hidden">
          Angular features and their APIs
        </caption>
        <thead>
          <tr>
            <th scope="col">FEATURE</th>
            <th scope="col">CATEGORY</th>
            <th scope="col">PUBLIC API</th>
            <th scope="col">SAVE</th>
          </tr>
        </thead>
        <tbody>
          @for (row of rows(); track row.id) {
            <tr>
              <td>
                <a [routerLink]="row.route">{{ row.name }} <span>↗</span></a>
                <p>{{ row.description }}</p>
              </td>
              <td>
                <span class="category">{{ row.category }}</span>
              </td>
              <td>
                <code>{{ row.api }}</code>
              </td>
              <td>
                <button
                  class="icon-button"
                  [class.saved]="favorites().includes(row.id)"
                  [attr.aria-label]="'Save ' + row.name"
                  [attr.aria-pressed]="favorites().includes(row.id)"
                  (click)="toggleFavorite.emit(row.id)"
                >
                  <app-icon name="star" />
                </button>
              </td>
            </tr>
          } @empty {
            <tr>
              <td colspan="4" class="empty">
                No matching features. Try a different search or filter.
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: `
    .table-scroll {
      overflow: auto;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      text-align: left;
      min-width: 590px;
    }
    th {
      font-size: 9px;
      letter-spacing: 1px;
      font-weight: 550;
      color: var(--muted);
      background: var(--bg);
      padding: 13px 15px;
    }
    td {
      padding: 18px 15px;
      border-bottom: 1px solid var(--line);
      font-size: 12px;
    }
    tr:last-child td {
      border: 0;
    }
    td:first-child {
      width: 45%;
    }
    td a {
      text-decoration: none;
      font-weight: 600;
    }
    td a span {
      font-size: 10px;
      color: var(--muted);
      margin-left: 5px;
    }
    td p {
      font-size: 11px;
      line-height: 1.6;
      color: var(--muted);
      margin: 6px 0 0;
    }
    code {
      font-size: 10px;
      color: var(--purple);
    }
    .category {
      background: var(--bg);
      border: 1px solid var(--line);
      padding: 5px 8px;
      border-radius: 5px;
      font-size: 10px;
    }
    .saved {
      color: var(--purple);
      background: var(--purple-soft);
      border-color: var(--lavender);
    }
    .empty {
      text-align: center;
      padding: 50px 15px;
      color: var(--muted);
    }
    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
    }
  `,
})
export class FeatureTable {
  readonly rows = input.required<readonly Feature[]>();
  readonly favorites = input<readonly string[]>([]);
  readonly toggleFavorite = output<string>();
}
