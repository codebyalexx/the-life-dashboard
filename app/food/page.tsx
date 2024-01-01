import {frenchMonth} from "@/lib/date";
import {FoodCaloriesPanel} from "@/src/features/layout/food/FoodCaloriesPanel";

export default function Food() {
    const date = new Date()
    
    return (<div className={'px-4'}>
        <h2 className={'text-2xl font-semibold mb-4'}>
            Calories
            <span className={'block mt-1'}>
                d&apos;Aujourd&apos;hui&nbsp;&nbsp;
                <span className={'text-sm text-muted-foreground font-normal'}>{date.getDate()} {frenchMonth[date.getMonth()]} {date.getFullYear()}</span>
            </span>
        </h2>
        <FoodCaloriesPanel className={'mb-4'} />
    </div>)
}