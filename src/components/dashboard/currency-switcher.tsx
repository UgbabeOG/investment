"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CurrencySwitcher({
  onChange,
}: {
  onChange: (currency: string) => void;
}) {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [selected, setSelected] = useState("USD");

  useEffect(() => {
    fetch("/api/portfolio/currency")
      .then((res) => res.json())
      .then((res) => setCurrencies(res.data));
  }, []);

  return (
    <Select
      value={selected}
      onValueChange={(val) => {
        setSelected(val);
        onChange(val);
      }}
    >
      <SelectTrigger className="w-32">
        <SelectValue placeholder="Currency" />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((c) => (
          <SelectItem key={c} value={c}>
            {c}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
