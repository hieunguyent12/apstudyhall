import { useState } from "react";

import Input from "../Input";

type Props = {
  closeModal: () => void;
};

export default function FeedbackForm({ closeModal }: Props) {
  const [title, setTitle] = useState("");
  const [feedback, setFeedback] = useState("");

  const submitFeedback = () => {
    if (title === "" || feedback === "") return;

    console.log(title, feedback);
  };

  return (
    <div className="flex flex-col">
      <Input
        className="w-full p-2 my-2"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        maxLength={100}
      />
      <textarea
        className="w-full p-2 shadow appearance-none border rounded text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="exampleFormControlTextarea1"
        rows={7}
        placeholder="Type your feedback or ideas here"
        onChange={(e) => setFeedback(e.target.value)}
        value={feedback}
        maxLength={500}
      />

      <button
        type="button"
        className="inline-flex mt-4 justify-center rounded-md border border-transparent bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        onClick={submitFeedback}
      >
        Submit
      </button>
    </div>
  );
}
