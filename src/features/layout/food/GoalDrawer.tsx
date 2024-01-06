"use client"

import { Button } from '@/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { MinusIcon, Pencil, PlusIcon } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adjustGoal, selectGoal } from './foodSlice'

export default function GoalDrawer() {
  const dispatch = useDispatch()
  const goal = useSelector(selectGoal)

  return (
    <Drawer>
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
                onClick={() => dispatch(adjustGoal(-25))}>
                  <MinusIcon className='h-4 w-4' />
                  <span className='sr-only'>Decrease</span>
                </Button>
                <div className='flex-1 text-center'>
                  <div className='text-7xl font-bold tracking-tighter'>
                    {goal}
                  </div>
                  <div className='text-[0.70rem] uppercase text-muted-foreground'>
                    Calories/jour
                  </div>
                </div>
                <Button
                variant={'outline'}
                size={'icon'}
                className='h-8 w-8 shrink-0 rounded-full'
                onClick={() => dispatch(adjustGoal(25))}>
                  <PlusIcon className='h-4 w-4' />
                  <span className='sr-only'>Augmenter</span>
                </Button>
            </div>
          </div>
          <DrawerFooter>
            <Button>Sauvegarder</Button>
            <DrawerClose asChild>
              <Button variant={'outline'}>Annuler</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
