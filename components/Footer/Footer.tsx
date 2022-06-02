type FooterProps = {
  openModal: () => void;
};

export default function Footer({ openModal }: FooterProps) {
  return (
    <div className="flex fixed bottom-3 left-0 w-full justify-center items-center">
      <p>Made by Hieu N.</p>
      <button
        className="ml-4 bg-violet-500 p-2 rounded-md text-white hover:bg-violet-600"
        onClick={openModal}
      >
        Give feedback ✏️
      </button>
    </div>
  );
}