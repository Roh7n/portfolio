import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || "Roh7n";

  if (!token) {
    return NextResponse.json(
      { error: "GitHub token not configured" },
      { status: 500 }
    );
  }

  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    };

    // Fetch user events (authenticated, so it includes private events if token has repo scope)
    const res = await fetch(`https://api.github.com/users/${username}/events`, {
      headers,
    });

    if (!res.ok) {
      throw new Error("Failed to fetch events");
    }

    const events = await res.json();
    const pushEvents = events.filter((e: any) => e.type === "PushEvent");

    const commitsToProcess: { repo: string; sha: string; msg: string }[] = [];

    for (const event of pushEvents) {
      if (event.payload) {
        if (event.payload.commits && event.payload.commits.length > 0) {
          // Commits are usually in chronological order in the payload; reverse to get newest first
          for (const commit of event.payload.commits.reverse()) {
            commitsToProcess.push({
              repo: event.repo.name,
              sha: commit.sha,
              msg: commit.message,
            });
            if (commitsToProcess.length >= 3) break;
          }
        } else if (event.payload.head) {
          commitsToProcess.push({
            repo: event.repo.name,
            sha: event.payload.head,
            msg: "", // We'll fetch the actual message when fetching the commit stats
          });
        }
      }
      if (commitsToProcess.length >= 3) break;
    }

    const finalCommits = await Promise.all(
      commitsToProcess.map(async (c) => {
        const cRes = await fetch(
          `https://api.github.com/repos/${c.repo}/commits/${c.sha}`,
          { headers }
        );
        
        if (!cRes.ok) {
          return null;
        }
        
        const data = await cRes.json();

        const date = new Date(data.commit.author.date);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHrs = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHrs / 24);

        let when = "";
        if (diffDays > 0) when = `${diffDays}d`;
        else if (diffHrs > 0) when = `${diffHrs}h`;
        else when = `${diffMins}m`;

        const message = c.msg || data.commit.message || "";
        
        return {
          repo: c.repo.split("/")[1] || c.repo,
          msg: message.split("\n")[0], // Only first line of commit message
          when,
          sha: c.sha.substring(0, 7),
          add: data.stats.additions,
          del: data.stats.deletions,
        };
      })
    );

    const validCommits = finalCommits.filter(Boolean);

    return NextResponse.json(validCommits);
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch commits" },
      { status: 500 }
    );
  }
}
