function NoPostsFiller() {
  return (
    <div>
      <picture>
        <img
          className="h-4 w-4 opacity-0"
          src="https://imagizer.imageshack.com/img922/3706/Q1vJOp.png"
          alt="avatar"
        />
      </picture>
      <p className="animate-pulse rounded-lg border border-stone-300 bg-white px-2 py-4 dark:border-stone-700 dark:bg-[#1c1c1c]">
        Follow users to see their latest posts and stories.
      </p>
    </div>
  );
}

export default NoPostsFiller;
