"use client"

import { Button } from '@/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { MinusIcon, Pencil, PlusIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adjustCaloriesGoal, selectGoal } from './foodSlice'
import { updateUserGoal } from '@/src/actions/food.action'
import { Session } from 'next-auth'
import { useToast } from '@/components/ui/use-toast'

export default function GoalDrawer({ session }: {session: Session}) {
  const [open, setOpen] = useState(false)
  const {toast} = useToast()
  const dispatch = useDispatch()
  const rGoal = useSelector(selectGoal)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={"ghost"}>
            <Pencil size={16} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
      <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Objectif de Calories</DrawerTitle>
            <DrawerDescription>Définissez votre objectif de calories.</DrawerDescription>
          </DrawerHeader>
          <div className='p-4 pb-auto'>
            <div className='flex items-center justify-center space-x-2'>
              <Button
                variant={'outline'}
                size={'icon'}
                className='h-8 w-8 shrink-0 rounded-full'
                onClick={() => dispatch(adjustCaloriesGoal(-25))}>
                  <MinusIcon className='h-4 w-4' />
                  <span className='sr-only'>Decrease</span>
                </Button>
                <div className='flex-1 text-center'>
                  <div className='text-7xl font-bold tracking-tighter'>
                    {rGoal.calories}
                  </div>
                  <div className='text-[0.70rem] uppercase text-muted-foreground'>
                    Calories/jour
                  </div>
                </div>
                <Button
                variant={'outline'}
                size={'icon'}
                className='h-8 w-8 shrink-0 rounded-full'
                onClick={() => dispatch(adjustCaloriesGoal(25))}>
                  <PlusIcon className='h-4 w-4' />
                  <span className='sr-only'>Augmenter</span>
                </Button>
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={async () => {
              const res = await updateUserGoal({
                userId: session?.user?.id,
                goalName: 'calories',
                goalValue: rGoal.calories
              })

              setOpen(false)
              
              toast({
                title: 'Mise à jour',
                description: 'Objectif de calories mis à jour'
              })
            }}>Sauvegarder</Button>
            <DrawerClose asChild>
              <Button variant={'outline'}>Annuler</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
