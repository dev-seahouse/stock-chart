import type { GroupBase, StylesConfig } from 'react-select';
import AsyncReactSelect, { type AsyncProps } from 'react-select/async';
export type AsyncSelectProps<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = AsyncProps<Option, IsMulti, Group>;

const customStyles: StylesConfig<any, any, any> = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? 'hsl(var(--ring))' : 'hsl(var(--border))',
    borderRadius: '0.5rem',
    boxShadow: state.isFocused ? '0 0 0 1px hsl(var(--ring))' : '',
    '&:hover': {
      borderColor: 'hsl(var(--ring))',
    },
    backgroundColor: 'hsl(var(--background))',
    color: 'hsl(var(--foreground))',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'hsl(var(--popover))',
    '.dark &': {
      backgroundColor: 'hsl(var(--popover))',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? 'hsl(var(--accent))'
      : state.isFocused
        ? 'hsl(var(--muted-light))'
        : 'hsl(var(--background))',
    color: state.isSelected
      ? 'hsl(var(--accent-foreground))'
      : 'hsl(var(--foreground))',
    '&:hover': {
      backgroundColor: 'hsl(var(--muted-light))',
    },
    '.dark &': {
      backgroundColor: state.isSelected
        ? 'hsl(var(--accent))'
        : state.isFocused
          ? 'hsl(var(--muted))' /* Adjusted for better contrast in dark mode */
          : 'hsl(var(--background))',
      color: state.isSelected
        ? 'hsl(var(--accent-foreground))'
        : 'hsl(var(--foreground))',
      '&:hover': {
        backgroundColor:
          'hsl(var(--muted))' /* Adjusted for better contrast in dark mode */,
      },
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'hsl(var(--foreground))',
  }),
  input: (provided) => ({
    ...provided,
    color: 'hsl(var(--foreground))',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'hsl(var(--muted-foreground))',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused
      ? 'hsl(var(--ring))'
      : 'hsl(var(--muted-foreground))',
    '&:hover': {
      color: 'hsl(var(--ring))',
    },
    '.dark &': {
      color: state.isFocused
        ? 'hsl(var(--ring))'
        : 'hsl(var(--muted-foreground))',
      '&:hover': {
        color: 'hsl(var(--ring))',
      },
    },
  }),
};
function AsyncSelect<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(props: AsyncSelectProps<Option, IsMulti, Group>) {
  return <AsyncReactSelect {...props} styles={customStyles} />;
}

export default AsyncSelect;
