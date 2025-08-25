"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface EducationItem {
  id: number;
  title: string;
  content: string;
}

export function EducationContent() {
  const [data, setData] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/education")
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Card>
        <CardContent>Loading education...</CardContent>
      </Card>
    );
  if (!data.length)
    return (
      <Card>
        <CardContent>No educational content.</CardContent>
      </Card>
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Learn Crypto</CardTitle>
        <CardDescription>Guides and explainers for investors</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc ml-4">
          {data.map((item) => (
            <li key={item.id} className="mb-2">
              <b>{item.title}</b>: {item.content}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
