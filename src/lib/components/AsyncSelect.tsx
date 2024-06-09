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
    borderRadius: 'var(--radius)',
    boxShadow: state.isFocused ? '0 0 0 1px hsl(var(--ring))' : '',
    '&:hover': {
      borderColor: 'hsl(var(--ring))',
    },
    backgroundColor: state.isDisabled
      ? 'hsl(var(--input))'
      : 'hsl(var(--background))',
    color: state.isDisabled
      ? 'hsl(var(--muted-foreground))'
      : 'hsl(var(--foreground))',
    opacity: state.isDisabled ? 0.9 : 1,
    '.dark &': {
      backgroundColor: state.isDisabled
        ? 'hsl(var(--muted))'
        : 'hsl(var(--background))',
      color: state.isDisabled
        ? 'hsl(var(--muted-foreground))'
        : 'hsl(var(--foreground))',
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: 'var(--radius)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'hsl(var(--popover))',
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
          ? 'hsl(var(--muted))'
          : 'hsl(var(--background))',
      color: state.isSelected
        ? 'hsl(var(--accent-foreground))'
        : 'hsl(var(--foreground))',
      '&:hover': {
        backgroundColor: 'hsl(var(--muted))',
      },
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: state.isDisabled
      ? 'hsl(var(--muted-foreground))'
      : 'hsl(var(--foreground))',
    '.dark &': {
      color: state.isDisabled
        ? 'hsl(var(--muted-foreground))'
        : 'hsl(var(--foreground))',
    },
  }),
  input: (provided, state) => ({
    ...provided,
    color: state.isDisabled
      ? 'hsl(var(--muted-foreground))'
      : 'hsl(var(--foreground))',
    '.dark &': {
      color: state.isDisabled
        ? 'hsl(var(--muted-foreground))'
        : 'hsl(var(--foreground))',
    },
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: state.isDisabled
      ? 'hsl(var(--muted-foreground))'
      : 'hsl(var(--muted-foreground))',
    '.dark &': {
      color: state.isDisabled
        ? 'hsl(var(--muted-foreground))'
        : 'hsl(var(--muted-foreground))',
    },
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
