import { useSuspenseQuery } from '@tanstack/react-query';
import { userServices } from "../../services/userServices";

export default function UserPage() {

  const { data: user} = useSuspenseQuery({
    queryKey: ['userProfile'],
    queryFn: userServices.getUserProfile,
  });

  return (
  <div className="min-h-[calc(100vh-4rem)] w-full bg-slate-950 px-4 py-8 sm:px-6 lg:px-8">
    <div className="mx-auto w-full max-w-4xl">
      <header className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl shadow-slate-950/50 backdrop-blur-sm">
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="relative">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.userName}
                  className="h-24 w-24 rounded-full border-2 border-slate-700 bg-slate-800 object-cover shadow-lg sm:h-28 sm:w-28"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-slate-700 bg-slate-800 text-3xl font-bold uppercase text-indigo-400 shadow-lg sm:h-28 sm:w-28">
                  {user.userName ? user.userName.charAt(0) : '?'}
                </div>
              )}

              <button
                type="button"
                className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-slate-700 bg-slate-800/90 text-slate-300 shadow-md transition hover:border-indigo-500 hover:bg-indigo-600 hover:text-white"
                title="Change profile photo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                className="cursor-pointer rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-700 hover:text-white"
              >
                Edit Username
              </button>
              <button
                type="button"
                className="cursor-pointer rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-700 hover:text-white"
              >
                Edit Bio
              </button>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                @{user.userName}
              </h1>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-slate-500"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>{user.email}</span>
            </div>

            <p className="max-w-2xl whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
              {user.bio || (
                <span className="italic text-slate-500">
                  No bio added yet.
                </span>
              )}
            </p>
          </div>

          <div className="mt-6 flex border-b border-slate-800">
            <button
              type="button"
              className="cursor-pointer border-b-2 border-indigo-500 px-6 py-3 text-sm font-semibold text-white transition"
            >
              Created Posts
            </button>
            <button
              type="button"
              className="cursor-pointer border-b-2 border-transparent px-6 py-3 text-sm font-medium text-slate-400 transition hover:border-slate-700 hover:text-slate-200"
            >
              Liked Posts
            </button>
          </div>
        </div>
      </header>

      <div className="mt-6">
      </div>
    </div>
  </div>
);
}