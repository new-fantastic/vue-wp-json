interface ValidatorFunc {
  (value: any): boolean;
}

export interface WPExtension {
  validator?: ValidatorFunc
}