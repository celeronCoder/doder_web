export const AddTodo: React.FC = () => {
  return (
    <div className="input-container flex items-center justify-center gap-5 p-10 w-2/4">
      {/* input box */}
      <div className="max-w-2xl w-full flex flex-col gap-2">
        <div className="border-2 border-primary px-3 py-4 rounded-lg w-full">
          {/* title input */}
          <input
            placeholder="Title"
            className="block w-full font-bold placeholder:textslate-400 text-slate-300 focus-within:outline-none mb-1 bg-transparent"
          />
          {/* description textarea */}
          <textarea
            placeholder="Description"
            rows={3}
            style={{ resize: "none" }}
            className="w-full block text-sm placeholder:text-slate-600 text-slate-500 focus-within:outline-none bg-transparent"
          />
          <div className="flex items-center justify-between w-full">
            {/* Due Date */}
            <div className="text-sm border-[1px] border-slate-600 text-slate-400 rounded-md px-2 py-1 flex items-center justify-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>

              <p>Due Date</p>
            </div>
            {/* priority */}
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-5 text-slate-400 rotate-90"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6h.008v.008H6V6z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center justify-end w-full">
          <button className="btn btn-outline btn-sm">Cancel</button>
          <button className="btn btn-primary btn-sm">Add task</button>
        </div>
      </div>
    </div>
  );
};
