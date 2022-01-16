import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { StyledAutocomplete, StyledPopper } from "./FilterStyle";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Props {
  name: string;
  allOptions: string[];
  filter: string[];
  setFilter: React.Dispatch<React.SetStateAction<string[]>>;
}
export default function Filter({ allOptions, name, filter, setFilter }: Props) {
  const onChange = (e: any, v: any) => {
    setFilter(v);
  };
  return (
    <StyledAutocomplete
      multiple
      options={allOptions}
      limitTags={0}
      disableCloseOnSelect
      getOptionLabel={(option: any) => option}
      renderOption={(props, option: any, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </li>
      )}
      PopperComponent={StyledPopper}
      renderInput={(params) => <TextField {...params} label={name} />}
      onChange={onChange}
      value={filter}
    />
  );
}
