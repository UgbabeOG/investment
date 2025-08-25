"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function SecurityStatus() {
  const [session, setSession] = useState<{
    valid: boolean;
    user: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/security")
      .then((res) => res.json())
      .then((res) => {
        setSession(res.session);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Card>
        <CardContent>Checking security...</CardContent>
      </Card>
    );
  if (!session)
    return (
      <Card>
        <CardContent>No session data.</CardContent>
      </Card>
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Status</CardTitle>
        <CardDescription>Session and 2FA status</CardDescription>
      </CardHeader>
      <CardContent>
        <div>User: {session.user}</div>
        <div>Session valid: {session.valid ? "Yes" : "No"}</div>
        <div>
          2FA: <span className="text-muted-foreground">(Demo endpoint)</span>
        </div>
      </CardContent>
    </Card>
  );
}
