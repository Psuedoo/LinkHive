"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function SearchBar() {
  const [search, setSearch] = useState("");
  function getUrl(userInput: string) {
    const reddit = {
      prefix: "/r ",
      url: "https://reddit.com/r/",
    };
    const youtube = {
      prefix: "/yt ",
      url: "https://youtube.com/results?search_query=",
    };
    const google = {
      prefix: "/g",
      url: "https://google.com/search?q=",
    };
    const providers = [reddit, youtube, google];
    let baseUrl = google.url;
    for (const provider of providers) {
      if (userInput.startsWith(provider.prefix)) {
        userInput = userInput.replace(provider.prefix, "");
        baseUrl = provider.url;
      }
    }
    return `${baseUrl}${userInput}`;
  }

  function handleSubmit() {
    window.location.assign(getUrl(search));
  }

  return (
    <div className="flex w-full items-center space-x-2">
      <Input
        className="w-full"
        type="email"
        placeholder="Search"
        value={search}
        onChange={(val) => setSearch(val.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
    </div>
  );
}
