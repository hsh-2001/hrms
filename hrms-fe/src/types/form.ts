export interface IInputField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}