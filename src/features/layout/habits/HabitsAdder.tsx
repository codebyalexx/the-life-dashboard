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
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, ShieldAlert, Tag } from "lucide-react";
import { Session } from "next-auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addHabit } from '../../../actions/habit.action';
import { addItem } from "./habitsSlice";

export const HabitsAdder = ({ className, session }: { className?: String, session: Session | null }) => {
  const dispatch = useDispatch()
  const {toast} = useToast()
  
  const [name, setName] = useState('')
  const [repeat, setRepeat] = useState('Daily')
  const [start, setStart] = useState()
  const [end, setEnd] = useState()
  const [error, setError] = useState('')

  return (
    <form className={cn("", className)} onSubmit={(e) => e.preventDefault()}>
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
      {error ? <p className="w-full text-red-500 font-medium my-2 flex items-center justify-center"><ShieldAlert className="mr-2" /> {error}</p> : ""}
      <Button className="w-full" variant={"secondary"} onClick={async () => {
        setError('')
        let err = ''

        if (name.length === 0) 
          err = 'Merci de remplir la champ "nom"'

        if (((end|| 1) < (start || 0)) || (end ? (end > Date.now()) : false)) 
          err = 'La date de début doit être antérieure à celle de fin ou à aujourd\'hui'

        setError(err)

        if (err.length > 0) return

        const habit = await addHabit({
          userId: session?.user?.id,
          name,
          repeatSchema: repeat,
          moment: 'AllDay',
          startAt: start,
          endsAt: end
        })

        dispatch(addItem({
          ...habit,
          createdAt: new Date(habit.createdAt).getTime(),
          startAt: new Date(habit.startAt).getTime(),
          endsAt: new Date(habit.endsAt as Date).getTime()
        }))

        toast({
          title: 'Mise à jour',
          description: 'Aliment ajouté avec succès !'
        })
      }}>
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
