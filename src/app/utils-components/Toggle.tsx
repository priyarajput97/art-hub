type Props = {
  enabled: boolean;
  setEnabled: any;
  title: string;
};

const Toggle = ({ enabled, setEnabled, title }: Props) => {
  return (
    <div className="flex gap-x-4 sm:col-span-2">
      <div className="flex h-6 items-center">
        <button
          type="button"
          className={`${
            enabled ? "bg-pink-700" : "bg-gray-600"
          } flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
          role="switch"
          aria-checked="false"
          aria-labelledby="switch-1-label"
          onClick={() => setEnabled(!enabled)}
        >
          <span className="sr-only">{title}</span>
          <span
            aria-hidden="true"
            className={`${
              enabled ? "translate-x-3.5" : "translate-x-0"
            }  h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out`}
          ></span>
        </button>
      </div>
      <label className="text-sm leading-6 text-gray-600" id="switch-1-label">
        {title}
      </label>
    </div>
  );
};

export default Toggle;
