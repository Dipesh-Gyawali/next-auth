"use client";

export const AddEventForm = () => {
  return (
    <div className="flex flex-row gap-4 mt-5">
      <input type="text" className="border border-black-500 rounded-md" />
      <button className="border-none bg-slate-400 p-2 rounded-lg">
        Add Event
      </button>
    </div>
  );
};
