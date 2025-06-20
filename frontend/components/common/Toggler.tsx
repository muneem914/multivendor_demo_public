interface TogglerProps {
  checked: boolean;
}

export default function Toggler({ checked }: TogglerProps) {
  return (
    <>
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          defaultChecked={checked}
          value="checked"
          className="sr-only peer"
        />
        <div className="relative w-9 h-5 bg-gray-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
      </label>
    </>
  );
}
