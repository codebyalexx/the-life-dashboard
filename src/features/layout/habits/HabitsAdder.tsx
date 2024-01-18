"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Tag } from "lucide-react";
import React, { useState } from "react";

export const HabitsAdder = ({ className }: { className?: String }) => {
  const [name, setName] = useState('')
  const [repeat, setRepeat] = useState('Daily')
  const [start, setStart] = useState()
  const [end, setEnd] = useState()

  return (
    <form className={cn("", className)}>
      <h3 className="text-lg font-semibold mb-2">Ajouter une habitude</h3>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="mb-1">
            Nom
          </Label>
          <div className="relative">
            <span className="absolute top-0 left-0 bottom-0 h-full p-2 flex items-center justify-center">
              <Tag size={16} />
            </span>
            <Input
              placeholder="Nom"
              id="name"
              name="name"
              className="w-full pl-8"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="repeat" className="mb-1">
            Répéter
          </Label>
          <HabitSelector value={repeat} setValue={setRepeat} />
        </div>
        <div>
          <Label htmlFor="start" className="mb-1">
            Date de début ?
          </Label>
          <HabitDateSelector date={start} setDate={setStart} label="Aujourd'hui" />
        </div>
        <div>
          <Label htmlFor="end" className="mb-1">
            Date de fin ?
          </Label>
          <HabitDateSelector date={end} setDate={setEnd} label="Indéterminée" />
        </div>
      </div>
      <Button className="w-full" variant={"secondary"} onClick={async () => {}}>
        Ajouter
      </Button>
    </form>
  );
};

export const HabitSelector = ({ value, setValue }:{ value: string, setValue: any}) => {
  return (
    <Select onValueChange={setValue} defaultValue={value}>
      <SelectTrigger className="w-full">
        <SelectValue
          placeholder="Schéma de répétition"
        />
      </SelectTrigger>
      <SelectContent className="max-h-72">
        <SelectGroup>
          <SelectLabel>Répétitions</SelectLabel>
          <SelectItem value="Daily">Tous les jours</SelectItem>
          <SelectItem value="Weekly">Une fois par semaine</SelectItem>
          <SelectItem value="Mounthly">Une fois par mois</SelectItem>
          <SelectLabel>Jours de la semaine</SelectLabel>
          <SelectItem value="Monday">Tous les lundis</SelectItem>
          <SelectItem value="Tuesday">Tous les mardis</SelectItem>
          <SelectItem value="Wednesday">Tous les mercredis</SelectItem>
          <SelectItem value="Thursday">Tous les jeudis</SelectItem>
          <SelectItem value="Friday">Tous les vendredis</SelectItem>
          <SelectItem value="Saturday">Tous les samedis</SelectItem>
          <SelectItem value="Sunday">Tous les dimanches</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export const HabitDateSelector = ({ label, date, setDate }: { label?: string, date: Date|undefined, setDate: any }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP")
          ) : (
            <span>{label || "Sélectionnez une date"}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
