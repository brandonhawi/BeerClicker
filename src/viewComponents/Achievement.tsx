type Props = {
  name: string;
  hint: string;
};

export default function AchievementView({ name, hint }: Props) {
  return (
    <div className="border border-gray-300 rounded p-4 select-none">
      <h5 className="text-2xl font-medium mb-2 flex items-center gap-2">
        <span className="relative inline-flex items-center">
          <svg
            className="w-8 h-8 text-primary"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.016 7.5v7.5h-3v6l-9-9 2.016-2.016h3.984v-6zM5.016 18.984v-1.968h12.984v1.968h-12.984z" />
          </svg>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full"></span>
        </span>
        {name}
      </h5>
      <em className="text-gray-600">&quot;{hint}&quot;</em>
    </div>
  );
}
