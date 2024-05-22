"use client";

import { useCallback, useEffect, useState } from "react";
import { Switch, Text, Button } from "@tremor/react";
import { RiRestartFill, RiRestartLine } from "@remixicon/react";

// TODO: Make it easy to report summary quality.

export default function Example() {
  const [posts, setPosts] = useState<any>([]);
  const [autofeedback, setAutofeedback] = useState(false);

  const fetchNews = useCallback(
    async (reset: boolean) => {
      // Download 10 articles

      for (let i = 0; i < 10; i++) {
        fetch(
          `https://log10-io--news-summarizer-news.modal.run?autofeedback=${autofeedback}&reset_cache=${reset}&start=${i}&end=${
            i + 1
          }`
        )
          .then((response) => response.json())
          .then((data) => data)
          .then((data) => {
            setPosts((posts: any) => [
              ...posts,
              ...data.filter(
                (item: any) =>
                  posts.findIndex((post: any) => post.url === item.url) === -1
              ),
            ]);
          });
      }
    },
    [autofeedback]
  );

  useEffect(() => {
    fetchNews(false);
  }, [fetchNews]);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Log10 News Summarizer
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Feedback based news summarizer.
          </p>
          {/* Turn on autofeedback */}
          <div className="mt-8">
            <div className="flex gap-4">
              <Button
                icon={RiRestartLine}
                onClick={() => {
                  setPosts([]);
                  fetchNews(true);
                }}
              >
                Refresh
              </Button>
              <div>
                <Text>Autofeedback {autofeedback ? "on" : "off"}</Text>
                <Switch
                  checked={autofeedback}
                  onChange={(e) => {
                    setAutofeedback(e);
                  }}
                />
              </div>
            </div>
          </div>

          {posts.length == 0 && (
            // Center on screen
            <div className="flex items-center justify-center h-96">
              <div
                role="status"
                className="flex flex-col justify-center items-center"
              >
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <Text>Loading news... hang tight</Text>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}

          {
            <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
              {posts.map((post: any) => (
                <article
                  key={post.url}
                  className="relative isolate flex flex-col gap-8 lg:flex-row"
                >
                  <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                    <img
                      src={post.image}
                      alt=""
                      className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div>
                    <div className="flex items-center gap-x-4 text-xs">
                      {/* <time dateTime={post.datetime} className="text-gray-500">
                      {post.date}
                    </time> */}
                      {/* <a
                      href={post.category.href}
                      className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                    >
                      {post.category.title}
                    </a> */}
                    </div>
                    <div className="group relative max-w-xl">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <a href={post.url}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </a>
                      </h3>
                      <p className="mt-5 text-sm leading-6 text-gray-600">
                        {post.summary}
                      </p>
                    </div>
                    {/* <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                    <div className="relative flex items-center gap-x-4">
                      <img
                        src={post.author.imageUrl}
                        alt=""
                        className="h-10 w-10 rounded-full bg-gray-50"
                      />
                      <div className="text-sm leading-6">
                        <p className="font-semibold text-gray-900">
                          <a href={post.author.href}>
                            <span className="absolute inset-0" />
                            {post.author.name}
                          </a>
                        </p>
                        <p className="text-gray-600">{post.author.role}</p>
                      </div>
                    </div>
                  </div> */}
                  </div>
                </article>
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  );
}