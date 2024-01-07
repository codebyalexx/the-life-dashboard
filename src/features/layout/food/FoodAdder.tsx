"use client"

import { Input } from "@/components/ui/input"
import { Beef, EggFried, Tag, Wheat } from "lucide-react"
import {ChangeEvent, useState} from "react"
import { Button } from "@/components/ui/button"
import { Session } from "next-auth"
import { addFood } from "@/src/actions/food.action"

export const FoodAdder = ({session}: {session: Session | null}) => {
    const [nutriments, setNutriments] = useState({carbs: 0, fat: 0, proteins: 0})

    const onNutrimentChange = (e: ChangeEvent) => {
        const name = e.target.name;
        const value = e.target.value;
        
        setNutriments({
            ...nutriments,
            [name]: Number(value)
        })
    }

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <h3 className="text-lg font-semibold mb-2">Ajouter un aliment</h3>
            <div className="relative">
                <span className="absolute top-0 left-0 bottom-0 h-full p-2 flex items-center justify-center">
                    <Tag size={16} />
                </span>
                <Input placeholder="Nom de l'aliment (optionnel)" id="name" name="name" className="w-full mb-2 pl-8" />
            </div>
            <div className="grid grid-cols-3 gap-2 mb-2">
                <div className="relative">
                    <span className="absolute top-0 left-0 bottom-0 h-full p-2 flex items-center justify-center">
                        <Wheat size={16} />
                    </span>
                    <Input placeholder="Glucides" id="carbs" name="carbs" className="pl-8" type="number" min={0} max={1000} value={nutriments.carbs} onChange={onNutrimentChange} required />
                </div>
                <div className="relative">
                    <span className="absolute top-0 left-0 bottom-0 h-full p-2 flex items-center justify-center">
                        <EggFried size={16} />
                    </span>
                    <Input placeholder="Lipides" id="fat" name="fat" className="pl-8" type="number" min={0} max={1000} value={nutriments.fat} onChange={onNutrimentChange} required />
                </div>
                <div className="relative">
                    <span className="absolute top-0 left-0 bottom-0 h-full p-2 flex items-center justify-center">
                        <Beef size={16} />
                    </span>
                    <Input placeholder="Protéines" id="proteins" name="proteins" className="pl-8" type="number" min={0} max={1000} value={nutriments.proteins} onChange={onNutrimentChange} required />
                </div>
            </div>
            <Button className="w-full" variant={'secondary'} onClick={async () => {
                const {carbs,fat,proteins} = nutriments
                
                const results = await addFood({
                    userId: session?.user?.id,
                    carbs,
                    fat,
                    proteins
                })

                console.log(results);
                
            }}>
                Ajouter
            </Button>
        </form>
    )
}