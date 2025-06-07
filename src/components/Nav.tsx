import { BrainIcon } from "../icons/BrainIcon";

export default function Nav({
  search,
  setSearch,
  onMenuToggle,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onMenuToggle: () => void;
}) {
  return (
    <nav className="fixed top-0 left-0 right-0 h-[60px] bg-white shadow-sm z-50 flex items-center justify-between px-4">
      {/* Mobile menu button */}
      <button
        className="md:hidden p-2 text-purple-500"
        onClick={onMenuToggle} // Toggle sidebar visibility
      >
        ☰
      </button>

      {/* Logo section */}
      <div className="flex items-center gap-2">
        <div className="text-purple-500 text-sm">
          <BrainIcon />
        </div>
        <span className="text-purple-500 font-bold text-3xl">DropPost</span>
      </div>

      {/* Search box */}
      <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-10 sm:w-full sm:max-w-md sm:px-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500 block" // Always visible
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm6-2l4 4"
          />
        </svg>
        {/* Input field */}
        <input
          type="text"
          placeholder="Search by title..."
          className="bg-transparent outline-none text-gray-700 w-full text-sm sm:text-base" // Removed placeholder-shown:hidden
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
    </nav>
  );
}
