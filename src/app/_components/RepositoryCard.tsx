import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RepositoryCardProps {
  id: string;
  name: string;
  updatedAt?: number;
  owner: string;
  description?: string;
  lib?: { id: string; name: string }[];
}

export function RepositoryCard({
  id,
  name,
  updatedAt,
  description,
  owner,
  lib,
}: RepositoryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold text-lg">
          <Link
            href={`/repositories/${id}`}
            className="text-primary hover:underline"
          >
            {name}
          </Link>
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-2">
          {description || "説明なし"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>
            更新:{" "}
            {new Date(updatedAt || Date.now()).toLocaleDateString("ja-JP")}
          </span>
        </div>
        {lib && (
          <div className="space-y-3 mt-3">
            <div>
              <p className="font-medium text-sm mb-2">検出された技術:</p>
              <div className="flex gap-2">
                {lib.map((tech) => (
                  <div className="flex flex-wrap gap-2" key={tech.id}>
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                      ✅ {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <CardAction>
          <Button variant="ghost" asChild>
            <a
              href={`https://github.com/${owner}/${name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub で見る →
            </a>
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
