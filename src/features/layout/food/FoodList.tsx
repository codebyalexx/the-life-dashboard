"use client"

import { useDispatch, useSelector } from "react-redux"
import { removeItem, selectDate, selectTodayFood } from "./foodSlice"
import { getFoodOfDay, getTotalCaloriesFromNutriments } from "@/lib/food"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Beef, Calculator, EggFried, Frown, Trash, Trash2, Wheat } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"
import { deleteFood } from "@/src/actions/food.action"
import { Session } from "next-auth"

export const FoodList = ({ session }: { session: Session|null }) => {
    const food = useSelector(selectTodayFood)
    const date = new Date(useSelector(selectDate))
    const todayFood = getFoodOfDay(food, date)

    return (<div className="grid grid-cols-2 gap-2">
        {todayFood.length >= 1 
            ? todayFood.map((foodItem: any) => <FoodCard key={foodItem.id} session={session} foodItem={foodItem} />)
            : <p className="w-full col-span-3 text-muted-foreground flex items-center"><Frown size={26} className="mr-2" /> Oups, on dirait que vous n'avez pas encore ajouté d&apos;aliments pour aujourd&apos;hui.</p>}
    </div>)
}

export const FoodCard = ({session, foodItem}: {session: Session|null, foodItem: any}) => {
    return <Card>
        <CardHeader>
            <CardTitle>{foodItem.name}</CardTitle>
            <CardDescription>
                <p className="flex items-center text-muted-foreground">
                    <Calculator size={16} className="mr-1" /> {foodItem.calories || getTotalCaloriesFromNutriments({
                        carbs: foodItem.carbs,
                        fat: foodItem.fat,
                        proteins: foodItem.proteins
                    })} <span className="text-foreground mx-1">•</span>
                    <Wheat size={16} className="mr-1" /> {foodItem.carbs || '?'} <span className="text-foreground mx-1">•</span>
                    <EggFried size={16} className="mr-1" /> {foodItem.fat || '?'} <span className="text-foreground mx-1">•</span>
                    <Beef size={16} className="mr-1" /> {foodItem.proteins || '?'}
                </p> 
            </CardDescription>
        </CardHeader>
        <CardFooter>
            <FoodDeleteDialog session={session} foodItem={foodItem} />
        </CardFooter>
    </Card>
}

export const FoodDeleteDialog = ({ session, foodItem }: {session: Session|null, foodItem: any}) => {
    const {toast} = useToast()
    const dispatch = useDispatch()

    return <AlertDialog>
        <AlertDialogTrigger className="w-full">
            <Button variant={'outline'} className="w-full">
                <Trash2 size={16} className="mr-2" /> Supprimer
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Êtes vous sûr ?</AlertDialogTitle>
                <AlertDialogDescription>
                    Vous êtes sur le point de supprimer l&apos;aliment <span className="text-foreground font-bold">{foodItem.name}</span> pour un total de <span className="text-foreground font-bold">{foodItem.calories || getTotalCaloriesFromNutriments({
                        carbs: foodItem.carbs,
                        fat: foodItem.fat,
                        proteins: foodItem.proteins
                    })}</span> calories. Confirmer?
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={async () => {
                    await deleteFood({
                        userId: session?.user?.id,
                        id: foodItem.id
                    })

                    dispatch(removeItem(foodItem.id))

                    toast({
                        title: 'Mise à jour',
                        description: `L'aliment ${foodItem.name} a été supprimé`
                    })
                }}>Continuer</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
}