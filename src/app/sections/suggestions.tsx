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
  progress: number;
  notes?: string;
};

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

const statusToBadge = (s: TopicStatus) => {
  const theme = {
    idea: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-900/50 dark:text-sky-200",
    queued:
      "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-200",
    researching:
      "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-900/50 dark:text-violet-200",
    recording:
      "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/50 dark:text-blue-200",
    editing:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/50 dark:text-amber-200",
    published:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200",
  };
  return { label: s.charAt(0).toUpperCase() + s.slice(1), className: theme[s] };
};

const safeId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

export function TopicsAndSuggestions() {
  const [topics, setTopics] = useState(seedTopics);
  const [wip, setWip] = useState(seedWip);
  const [suggestions, setSuggestions] = useState(seedSuggestions);
  const [topicFilter, setTopicFilter] = useState<"all" | TopicStatus>("all");
  const [suggestionSort, setSuggestionSort] = useState<"votes" | "newest">(
    "votes"
  );
  const [query, setQuery] = useState("");
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
    return suggestionSort === "votes"
      ? arr.sort((a, b) => b.votes - a.votes)
      : arr.sort((a, b) => b.createdAt - a.createdAt);
  }, [suggestions, suggestionSort, query]);

  function handleVote(id: string, dir: "up" | "down") {
    setSuggestions((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        let delta = 0;
        if (!s.userVoted) delta = dir === "up" ? 1 : -1;
        else if (s.userVoted === dir) delta = dir === "up" ? -1 : 1;
        else delta = dir === "up" ? 2 : -2;
        return {
          ...s,
          votes: s.votes + delta,
          userVoted: s.userVoted === dir ? null : dir,
        };
      })
    );
  }

  function handleSubmitSuggestion() {
    if (!title.trim()) return;
    const newItem: Suggestion = {
      id: safeId(),
      title: title.trim(),
      details: details.trim() || undefined,
      tags: tags
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
      votes: 0,
      createdAt: Date.now(),
      userVoted: "up",
    };
    setSuggestions((prev) => [newItem, ...prev]);
    setTitle("");
    setDetails("");
    setTags("");
  }

  return (
    <section className="mt-16 w-full">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-sky-50">
            Topics & Suggestions
          </h2>
          <p className="mt-1 text-slate-600 dark:text-sky-200">
            Vote on ideas, submit suggestions, and track what{" "}
            <span className="text-slate-800 dark:text-sky-100">
              The Coding Kitty Project
            </span>{" "}
            is working on.
          </p>
        </div>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search topics & suggestions…"
          className="w-56 border-sky-200 bg-white text-slate-700 placeholder:text-slate-400 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-100 dark:placeholder:text-sky-400"
        />
      </div>

      <Tabs defaultValue="topics" className="mt-6">
        <TabsList className="bg-sky-50 text-slate-700 dark:bg-sky-900 dark:text-sky-100">
          <TabsTrigger value="topics">Topics</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          <TabsTrigger value="wip">Work in progress</TabsTrigger>
        </TabsList>

        {/* Topics */}
        <TabsContent value="topics" className="mt-6 space-y-4">
          {filteredTopics.map((t) => {
            const badge = statusToBadge(t.status);
            return (
              <Card
                key={t.id}
                className="border-sky-200 bg-white hover:bg-sky-50 dark:border-sky-800 dark:bg-sky-900 dark:hover:bg-sky-800/60"
              >
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div className="space-y-1">
                    <CardTitle className="text-base text-slate-900 dark:text-sky-50">
                      {t.title}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2">
                      {t.tags.map((tg) => (
                        <Badge
                          key={tg}
                          variant="outline"
                          className="border-sky-200 text-slate-700 dark:border-sky-700 dark:text-sky-100"
                        >
                          <Tag className="mr-1 h-3 w-3 opacity-70" />
                          {tg}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Badge variant="outline" className={badge.className}>
                    {badge.label}
                  </Badge>
                </CardHeader>
              </Card>
            );
          })}
        </TabsContent>

        {/* Suggestions */}
        <TabsContent value="suggestions" className="mt-6 space-y-8">
          <Card className="border-sky-200 bg-white dark:border-sky-800 dark:bg-sky-900">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900 dark:text-sky-50">
                Suggest a topic
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title (e.g., 'Intro to Unraid for homelab backups')"
                className="border-sky-200 bg-white text-slate-700 placeholder:text-slate-400 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-100 dark:placeholder:text-sky-400"
              />
              <Textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Optional details (what problem should it solve, preferred stack, etc.)"
                className="min-h-[90px] border-sky-200 bg-white text-slate-700 placeholder:text-slate-400 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-100 dark:placeholder:text-sky-400"
              />
              <Input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Tags (comma-separated), e.g., nextjs, postgres"
                className="border-sky-200 bg-white text-slate-700 placeholder:text-slate-400 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-100 dark:placeholder:text-sky-400"
              />
            </CardContent>
            <CardFooter className="justify-between">
              <p className="text-xs text-slate-500 dark:text-sky-300">
                Suggestions are public. Be constructive and specific. 🙏
              </p>
              <Button
                onClick={handleSubmitSuggestion}
                disabled={!title.trim()}
                className="rounded-full bg-sky-600 text-white hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400"
              >
                Submit
              </Button>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 gap-4">
            {sortedSuggestions.map((s) => (
              <Card
                key={s.id}
                className="border-sky-200 bg-white hover:bg-sky-50 dark:border-sky-800 dark:bg-sky-900 dark:hover:bg-sky-800/60"
              >
                <CardContent className="flex items-start gap-4 p-4">
                  {/* Votes */}
                  <div className="flex w-16 flex-col items-center justify-center gap-1">
                    <Button
                      size="icon"
                      variant={s.userVoted === "up" ? "default" : "outline"}
                      className={`h-8 w-8 rounded-full ${
                        s.userVoted === "up"
                          ? "bg-sky-600 text-white hover:bg-sky-700"
                          : "border-sky-200 text-slate-700 hover:border-sky-400 dark:border-sky-800 dark:text-sky-100"
                      }`}
                      onClick={() => handleVote(s.id, "up")}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <div className="text-sm font-medium text-slate-700 dark:text-sky-100">
                      {s.votes}
                    </div>
                    <Button
                      size="icon"
                      variant={
                        s.userVoted === "down" ? "destructive" : "outline"
                      }
                      className={`h-8 w-8 rounded-full ${
                        s.userVoted === "down"
                          ? "bg-rose-600 text-white hover:bg-rose-700"
                          : "border-sky-200 text-slate-700 hover:border-sky-400 dark:border-sky-800 dark:text-sky-100"
                      }`}
                      onClick={() => handleVote(s.id, "down")}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Suggestion content */}
                  <div className="min-w-0 flex-1">
                    <h4 className="text-base font-medium text-slate-900 dark:text-sky-50">
                      {s.title}
                    </h4>
                    {s.details && (
                      <p className="mt-1 text-sm text-slate-600 dark:text-sky-200">
                        {s.details}
                      </p>
                    )}
                    {!!s.tags.length && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {s.tags.map((tg) => (
                          <Badge
                            key={tg}
                            variant="outline"
                            className="border-sky-200 text-slate-700 dark:border-sky-700 dark:text-sky-100"
                          >
                            <Tag className="mr-1 h-3 w-3 opacity-70" />
                            {tg}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Work in progress */}
        <TabsContent value="wip" className="mt-6 space-y-4">
          {wip.map((item) => (
            <Card
              key={item.id}
              className="border-sky-200 bg-white dark:border-sky-800 dark:bg-sky-900"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base text-slate-900 dark:text-sky-50">
                      {item.title}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className="mt-1 border-sky-200 text-slate-700 dark:border-sky-700 dark:text-sky-100"
                    >
                      {item.stage}
                    </Badge>
                  </div>
                  <span className="text-sm text-slate-500 dark:text-sky-300">
                    {item.progress}%
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={item.progress} className="h-2" />
                {item.notes && (
                  <p className="mt-2 text-sm text-slate-600 dark:text-sky-200">
                    {item.notes}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
          <Separator className="bg-sky-200 dark:bg-sky-800" />
          <p className="text-xs text-slate-500 dark:text-sky-300">
            Work in progress reflects current videos being produced.
          </p>
        </TabsContent>
      </Tabs>
    </section>
  );
}
