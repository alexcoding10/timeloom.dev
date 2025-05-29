function Field({
  label,
  value,
  editable,
  setValue,
  typeInput
}: {
  label: string;
  value: string | number;
  editable: boolean;
  typeInput:string;
  setValue?:(newValue:string | number)=> void;
}) {
  return (
    <div className="flex flex-col">
      <label className="text-xs lg:text-lg text-gray-500">{label}</label>
      {editable ? (
        <input
          type={typeInput}
          defaultValue={value}
          className="px-2 py-1 text-xs lg:text-base border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-400"
          onChange={(e) => {setValue && setValue(e.target.value)}}
        />
      ) : (
        <p className="text-xs lg:text-base text-gray-800">{value}</p>
      )}
    </div>
  );
}

export default Field;
