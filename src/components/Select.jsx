const Select = ({ options, selected, isDisabled, changeHandler }) => {
  return (
    <select
      value={selected}
      disabled={isDisabled}
      onChange={changeHandler}
      className="h-6 px-3 mr-4 rounded-sm outline-none cursor-pointer disabled:opacity-50 text-neutral-300 w-30 bg-stone-600 disabled:cursor-not-allowed"
    >
      {options.map((option) => (
        <option key={option} className="" value={option}>
          {option}
        </option>
      ))}
      ,
    </select>
  );
};

export default Select;
