function Field({ label, value, editable }: { label: string, value: string, editable: boolean }) {
  return (
    <div className="flex flex-col">
      <label className="text-xs text-gray-500">{label}</label>
      {editable ? (
        <input
          type="text"
          defaultValue={value}
          className="border rounded px-2 py-1 text-sm"
        />
      ) : (
        <p className="text-sm text-gray-800">{value}</p>
      )}
    </div>
  );
}

export default Field
