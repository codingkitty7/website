"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ArrowDown, ArrowUp, Tag } from "lucide-react";

// --- Types ---
type TopicStatus =
  | "idea"
  | "queued"
  | "researching"
  | "recording"
  | "editing"
  | "published";

type Topic = {
  id: string;
  title: string;
  tags: string[];
  status: TopicStatus;
};

type Suggestion = {
  id: string;
  title: string;
  details?: string;
  tags: string[];
  votes: number;
  createdAt: number;
  userVoted?: "up" | "down" | null;
};

type WipItem = {
  id: string;
  title: string;
  stage: "research" | "script" | "recording" | "editing";
  progress: number; // 0..100
  notes?: string;
};

// --- Seed data (swap out with your API) ---
const seedTopics: Topic[] = [
  {
    id: "t1",
    title: "React Server Components in Practice",
    tags: ["react", "nextjs"],
    status: "researching",
  },
  {
    id: "t2",
    title: "PostgreSQL Indexing 101",
    tags: ["postgres", "db"],
    status: "queued",
  },
  {
    id: "t3",
    title: "Secure JWT Auth Flows",
    tags: ["security", "auth"],
    status: "idea",
  },
  {
    id: "t4",
    title: "Kubernetes for Homelabs (NitroLab)",
    tags: ["k8s", "homelab"],
    status: "editing",
  },
  {
    id: "t5",
    title: "Shadcn UI Patterns",
    tags: ["ui", "react"],
    status: "published",
  },
];

const seedWip: WipItem[] = [
  {
    id: "w1",
    title: "Kubernetes for Homelabs (NitroLab)",
    stage: "editing",
    progress: 78,
    notes: "B-roll pass, captions next.",
  },
  {
    id: "w2",
    title: "RSC in Next 15: Data & Caching",
    stage: "research",
    progress: 35,
    notes: "Prototyping examples.",
  },
];

const seedSuggestions: Suggestion[] = [
  {
    id: "s1",
    title: "Monorepos with pnpm + Turbo + CI",
    details: "Real-world setup with caching and artifacts.",
    tags: ["tooling", "ci"],
    votes: 23,
    createdAt: Date.now() - 1000 * 60 * 60 * 12,
  },
  {
    id: "s2",
    title: "SQLite in Kubernetes for ARR stack",
    details: "Backups, persistence, and VPN pod layout.",
    tags: ["k8s", "homelab"],
    votes: 41,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: "s3",
    title: "Dark-mode theming with shadcn + Tailwind",
    tags: ["ui", "tailwind"],
    votes: 17,
    createdAt: Date.now() - 1000 * 60 * 30,
  },
];

// --- Helpers ---
const statusToBadge = (s: TopicStatus) => {
  switch (s) {
    case "idea":
      return {
        label: "Idea",
        className: "bg-zinc-900 text-zinc-300 border-zinc-800",
      };
    case "queued":
      return {
        label: "Queued",
        className: "bg-zinc-900 text-zinc-300 border-zinc-800",
      };
    case "researching":
      return {
        label: "Researching",
        className: "bg-purple-900/30 text-purple-300 border-purple-800",
      };
    case "recording":
      return {
        label: "Recording",
        className: "bg-blue-900/30 text-blue-300 border-blue-800",
      };
    case "editing":
      return {
        label: "Editing",
        className: "bg-amber-900/30 text-amber-300 border-amber-800",
      };
    case "published":
      return {
        label: "Published",
        className: "bg-emerald-900/30 text-emerald-300 border-emerald-800",
      };
  }
};

const safeId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto)
    return crypto.randomUUID();
  return Math.random().toString(36).slice(2);
};

// --- Component ---
export function TopicsAndSuggestions() {
  // local state (replace with server state later)
  const [topics, setTopics] = useState<Topic[]>(seedTopics);
  const [wip, setWip] = useState<WipItem[]>(seedWip);
  const [suggestions, setSuggestions] = useState<Suggestion[]>(seedSuggestions);

  // filters/sorting
  const [topicFilter, setTopicFilter] = useState<"all" | TopicStatus>("all");
  const [suggestionSort, setSuggestionSort] = useState<"votes" | "newest">(
    "votes"
  );
  const [query, setQuery] = useState("");

  // submit form
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [tags, setTags] = useState("");

  const filteredTopics = useMemo(() => {
    const q = query.trim().toLowerCase();
    return topics
      .filter((t) => (topicFilter === "all" ? true : t.status === topicFilter))
      .filter(
        (t) =>
          !q ||
          t.title.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
  }, [topics, topicFilter, query]);

  const sortedSuggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = suggestions.filter(
      (s) =>
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        (s.details && s.details.toLowerCase().includes(q))
    );
    if (suggestionSort === "votes") {
      arr = arr.sort((a, b) => b.votes - a.votes);
    } else {
      arr = arr.sort((a, b) => b.createdAt - a.createdAt);
    }
    return arr;
  }, [suggestions, suggestionSort, query]);

  function handleVote(id: string, dir: "up" | "down") {
    // optimistic UI
    setSuggestions((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        let delta = 0;
        // toggle logic
        if (!s.userVoted) {
          delta = dir === "up" ? 1 : -1;
          return { ...s, votes: s.votes + delta, userVoted: dir };
        }
        if (s.userVoted === dir) {
          // unvote
          delta = dir === "up" ? -1 : 1;
          return { ...s, votes: s.votes + delta, userVoted: null };
        }
        // switch vote
        delta = dir === "up" ? 2 : -2;
        return { ...s, votes: s.votes + delta, userVoted: dir };
      })
    );

    // TODO: POST /api/suggestions/{id}/vote {dir}
    // fetch(`/api/suggestions/${id}/vote`, { method: "POST", body: JSON.stringify({ dir }) });
  }

  function handleSubmitSuggestion() {
    const t = title.trim();
    if (!t) return;
    const newItem: Suggestion = {
      id: safeId(),
      title: t,
      details: details.trim() || undefined,
      tags: tags
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
      votes: 0,
      createdAt: Date.now(),
      userVoted: "up", // auto-upvote author for nice UX
    };
    setSuggestions((prev) => [newItem, ...prev]);
    setTitle("");
    setDetails("");
    setTags("");

    // TODO: POST /api/suggestions
    // await fetch("/api/suggestions", { method: "POST", body: JSON.stringify(newItem) })
  }

  return (
    <section className="mt-16 w-full">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">
            Topics & Suggestions
          </h2>
          <p className="mt-1 text-zinc-400">
            Vote on ideas, submit suggestions, and track what{" "}
            <span className="text-zinc-300">The Coding Kitty Project</span> is
            working on.
          </p>
        </div>
        <div className="flex gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics & suggestions…"
            className="w-56 border-zinc-800 bg-zinc-950 text-zinc-100 placeholder:text-zinc-500"
          />
        </div>
      </div>

      <Tabs defaultValue="topics" className="mt-6">
        <TabsList className="bg-zinc-900 text-zinc-200">
          <TabsTrigger value="topics">Topics</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          <TabsTrigger value="wip">Work in progress</TabsTrigger>
        </TabsList>

        {/* Topics */}
        <TabsContent value="topics" className="mt-6 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-400">Filter:</span>
              <Select
                value={topicFilter}
                onValueChange={(v: any) => setTopicFilter(v)}
              >
                <SelectTrigger className="w-44 border-zinc-800 bg-zinc-950 text-zinc-100">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent className="border-zinc-800 bg-zinc-950">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="idea">Idea</SelectItem>
                  <SelectItem value="queued">Queued</SelectItem>
                  <SelectItem value="researching">Researching</SelectItem>
                  <SelectItem value="recording">Recording</SelectItem>
                  <SelectItem value="editing">Editing</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <span className="text-sm text-zinc-500">
              {filteredTopics.length} items
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredTopics.map((t) => {
              const badge = statusToBadge(t.status);
              return (
                <Card
                  key={t.id}
                  className="border-zinc-800 bg-zinc-950/60 hover:bg-zinc-900/60"
                >
                  <CardHeader className="flex flex-row items-start justify-between space-y-0">
                    <div className="space-y-1">
                      <CardTitle className="text-base text-zinc-100">
                        {t.title}
                      </CardTitle>
                      <div className="flex flex-wrap gap-2">
                        {t.tags.map((tg) => (
                          <Badge
                            key={tg}
                            variant="outline"
                            className="border-zinc-800 text-zinc-300"
                          >
                            <Tag className="mr-1 h-3 w-3 opacity-70" />
                            {tg}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`border ${badge.className}`}
                    >
                      {badge.label}
                    </Badge>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Suggestions */}
        <TabsContent value="suggestions" className="mt-6 space-y-8">
          {/* Form */}
          <Card className="border-zinc-800 bg-zinc-950/60">
            <CardHeader>
              <CardTitle className="text-lg">Suggest a topic</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title (e.g., 'Intro to Unraid for homelab backups')"
                className="border-zinc-800 bg-zinc-950 text-zinc-100 placeholder:text-zinc-500"
              />
              <Textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Optional details (what problem should it solve, preferred stack, etc.)"
                className="min-h-[90px] border-zinc-800 bg-zinc-950 text-zinc-100 placeholder:text-zinc-500"
              />
              <Input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Tags (comma-separated), e.g., nextjs, postgres"
                className="border-zinc-800 bg-zinc-950 text-zinc-100 placeholder:text-zinc-500"
              />
            </CardContent>
            <CardFooter className="justify-between">
              <p className="text-xs text-zinc-500">
                Suggestions are public. Be constructive and specific. 🙏
              </p>
              <Button onClick={handleSubmitSuggestion} disabled={!title.trim()}>
                Submit
              </Button>
            </CardFooter>
          </Card>

          {/* Controls */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-400">Sort by:</span>
              <Select
                value={suggestionSort}
                onValueChange={(v: any) => setSuggestionSort(v)}
              >
                <SelectTrigger className="w-40 border-zinc-800 bg-zinc-950 text-zinc-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-zinc-800 bg-zinc-950">
                  <SelectItem value="votes">Top votes</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <span className="text-sm text-zinc-500">
              {sortedSuggestions.length} suggestions
            </span>
          </div>

          {/* List */}
          <div className="grid grid-cols-1 gap-4">
            {sortedSuggestions.map((s) => (
              <Card
                key={s.id}
                className="border-zinc-800 bg-zinc-950/60 hover:bg-zinc-900/60"
              >
                <CardContent className="flex items-start gap-4 p-4">
                  {/* Votes */}
                  <div className="flex w-16 flex-col items-center justify-center gap-1">
                    <Button
                      size="icon"
                      variant={s.userVoted === "up" ? "default" : "outline"}
                      className={`h-8 w-8 ${
                        s.userVoted === "up" ? "" : "border-zinc-800"
                      }`}
                      onClick={() => handleVote(s.id, "up")}
                      aria-label="Upvote"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <div className="text-sm font-medium text-zinc-200">
                      {s.votes}
                    </div>
                    <Button
                      size="icon"
                      variant={
                        s.userVoted === "down" ? "destructive" : "outline"
                      }
                      className={`h-8 w-8 ${
                        s.userVoted === "down" ? "" : "border-zinc-800"
                      }`}
                      onClick={() => handleVote(s.id, "down")}
                      aria-label="Downvote"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Body */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-base font-medium text-zinc-100">
                          {s.title}
                        </h4>
                        {s.details && (
                          <p className="mt-1 text-sm text-zinc-400">
                            {s.details}
                          </p>
                        )}
                        {!!s.tags.length && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {s.tags.map((tg) => (
                              <Badge
                                key={tg}
                                variant="outline"
                                className="border-zinc-800 text-zinc-300"
                              >
                                <Tag className="mr-1 h-3 w-3 opacity-70" />
                                {tg}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <span className="shrink-0 text-xs text-zinc-500">
                        {new Date(s.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Work in progress */}
        <TabsContent value="wip" className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {wip.map((item) => (
              <Card key={item.id} className="border-zinc-800 bg-zinc-950/60">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-base text-zinc-100">
                        {item.title}
                      </CardTitle>
                      <div className="flex flex-wrap gap-2">
                        <Badge
                          variant="outline"
                          className="border-zinc-800 text-zinc-300"
                        >
                          {item.stage}
                        </Badge>
                      </div>
                    </div>
                    <span className="text-sm text-zinc-400">
                      {item.progress}%
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Progress value={item.progress} className="h-2" />
                  {item.notes && (
                    <p className="text-sm text-zinc-400">{item.notes}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <Separator className="bg-zinc-800" />
          <p className="text-xs text-zinc-500">
            Work in progress reflects current videos being produced. Stages may
            change as the outline evolves.
          </p>
        </TabsContent>
      </Tabs>
    </section>
  );
}
