interface AvatarProps {
  src?: string;
  initials?: string;
}

export function Avatar({ src, initials }: AvatarProps) {
  return (
    <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center overflow-hidden border border-purple-200 dark:border-purple-800">
      {src ? (
        <img src={src} alt="Avatar" className="h-full w-full object-cover" />
      ) : (
        <span className="text-sm font-semibold text-purple-600 dark:text-purple-300">
          {initials || "U"}
        </span>
      )}
    </div>
  );
}
