import { BrainIcon } from "../icons/BrainIcon";

const Nav = ({ onMenuToggle }: { onMenuToggle: () => void }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-[60px] bg-white shadow-sm z-50 flex items-center  px-4">
      {/* Mobile menu button */}
      <button
        className="md:hidden p-2 text-purple-500"
        onClick={onMenuToggle} // Toggle sidebar visibility
      >
        ☰
      </button>

      {/* Logo section */}
      <div className="flex pl-2 gap-2">
        <div className="text-purple-500 text-sm">
          <BrainIcon />
        </div>
        <span className="text-purple-500 font-bold text-3xl">DropPost</span>
      </div>
    </nav>
  );
};

export default Nav;
