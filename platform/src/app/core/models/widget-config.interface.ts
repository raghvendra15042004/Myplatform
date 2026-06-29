export interface WidgetConfig {
  name: string;
  text: string;
  widget: string;
  mandatory?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  properties?: {
    defaultValue?: any;
    datasource?: { label: string; value: any }[];
    [key: string]: any;
  };
}