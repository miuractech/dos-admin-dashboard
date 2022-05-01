import { useState } from 'react';
import './react-flags.css'

/* eslint-disable-next-line */
export interface ReactFlagsProps { }

export const ReactFlags = (props: ReactFlagsProps) => {
  const [selected, setSelected] = useState("");
  const onSelect = (code: string): void => setSelected(code);

  const showSelectedLabel = boolean("Show Selected Label", true);
  const showSecondarySelectedLabel = boolean(
    "Show Secondary Selected Label",
    true
  );
  const selectedSize = number("Selected Size", 16);
  const showOptionLabel = boolean("Show Option Label", true);
  const showSecondaryOptionLabel = boolean("Show Secondary Option Label", true);
  const optionsSize = number("Options Size", 16);
  const placeholder = text("Placeholder", "");
  const searchable = boolean("Searchable", false);
  const searchPlaceholder = text("Search Placeholder", "");
  const alignOptionsToRight = boolean("Align Options to Right", false);
  const fullWidth = boolean("Full Width", true);
  const disabled = boolean("Disabled", false);

  return (
    <div className="demo-wrapper">
      <ReactFlagsSelect
        selected={selected}
        onSelect={onSelect}
        showSelectedLabel={showSelectedLabel}
        showSecondarySelectedLabel={showSecondarySelectedLabel}
        selectedSize={selectedSize}
        showOptionLabel={showOptionLabel}
        showSecondaryOptionLabel={showSecondaryOptionLabel}
        optionsSize={optionsSize}
        placeholder={placeholder}
        searchable={searchable}
        searchPlaceholder={searchPlaceholder}
        alignOptionsToRight={alignOptionsToRight}
        fullWidth={fullWidth}
        disabled={disabled}
      />
    </div>
  );
}
