export type Category = 'Reactivity' | 'Architecture' | 'Experience';
export interface Feature {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly category: Category;
  readonly api: string;
  readonly route: string;
}
export interface FeatureQuery {
  readonly search: string;
  readonly category: string;
  readonly fail: boolean;
  readonly revision: number;
}
export interface FeatureResult {
  readonly status: 'loading' | 'ready' | 'error';
  readonly data: readonly Feature[];
  readonly message: string;
}
