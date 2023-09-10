"use client";
import Search, { SearchProps } from "antd/es/input/Search";

export function SearchBar() {
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

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    if (info?.source === "clear") return;
    window.location.assign(getUrl(value));
  };

  return (
    <Search
      placeholder="Search"
      allowClear
      onSearch={onSearch}
      style={{
        width: 300,
      }}
      bordered={false}
      size="large"
      className="border-b-2 border-black rounded-lg"
    />
  );
}
