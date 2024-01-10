"use client"

import { Input } from "@/components/ui/input"
import { Beef, Calculator, EggFried, Tag, Wheat } from "lucide-react"
import {ChangeEvent, useState} from "react"
import { Button } from "@/components/ui/button"
import { Session } from "next-auth"
import { addFood } from "@/src/actions/food.action"
import { useToast } from "@/components/ui/use-toast"
import { useDispatch, useSelector } from "react-redux"
import { addItem, selectDate } from "./foodSlice"

export const FoodAdder = ({session}: {session: Session | null}) => {
    const {toast} = useToast()
    const dispatch = useDispatch()
    const date = useSelector(selectDate)

    const defaultNutriments = {calories: undefined, carbs: undefined, fat: undefined, proteins: undefined}

    const [name, setName] = useState(undefined)
    const [nutriments, setNutriments] = useState(defaultNutriments)

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
                <Input placeholder="Nom de l'aliment (optionnel)" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-8" />
            </div>
            <div className="p-3">
                <div className="relative">
                    <span className="absolute top-0 left-0 bottom-0 h-full p-2 flex items-center justify-center">
                        <Calculator size={16} />
                    </span>
                    <Input placeholder="Calories" id="calories" name="calories" type="number" min={0} max={10000}  value={nutriments.calories} onChange={onNutrimentChange} className="w-full pl-8" />
                </div>
                <div className="relative my-1">
                    <div aria-hidden="true" className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-muted-foreground" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-background text-muted-foreground">Ou</span>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-2">
                    <div className="relative">
                        <span className="absolute top-0 left-0 bottom-0 h-full p-2 flex items-center justify-center">
                            <Wheat size={16} />
                        </span>
                        <Input placeholder="Glucides" id="carbs" name="carbs" className="pl-8" type="number" min={0} max={1000} value={nutriments.carbs} onChange={onNutrimentChange} />
                    </div>
                    <div className="relative">
                        <span className="absolute top-0 left-0 bottom-0 h-full p-2 flex items-center justify-center">
                            <EggFried size={16} />
                        </span>
                        <Input placeholder="Lipides" id="fat" name="fat" className="pl-8" type="number" min={0} max={1000} value={nutriments.fat} onChange={onNutrimentChange} />
                    </div>
                    <div className="relative">
                        <span className="absolute top-0 left-0 bottom-0 h-full p-2 flex items-center justify-center">
                            <Beef size={16} />
                        </span>
                        <Input placeholder="Protéines" id="proteins" name="proteins" className="pl-8" type="number" min={0} max={1000} value={nutriments.proteins} onChange={onNutrimentChange} />
                    </div>
                </div>
            </div>
            <Button className="w-full" variant={'secondary'} onClick={async () => {
                const {calories,carbs,fat,proteins} = nutriments
                
                const res = await addFood({
                    userId: session?.user?.id,
                    name,
                    calories,
                    carbs,
                    fat,
                    proteins,
                    createdAt: date
                })

                setName('')
                setNutriments({calories: 0, carbs: 0, fat: 0, proteins: 0})
                dispatch(addItem(res))
                toast({
                    title: 'Mise à jour',
                    description: 'Aliment ajouté avec succès !'
                })
            }}>
                Ajouter
            </Button>
        </form>
    )
}