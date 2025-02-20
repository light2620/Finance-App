"use client"
import React from 'react'
import { toast } from 'sonner'
import { useState,useEffect } from 'react'

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from './ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { accountSchema } from '@/app/lib/schema'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import useFetch from '@/hooks/user-fetch'
import { createAccount } from '@/actions/dashboard'
import { Loader2 } from 'lucide-react'
const CreateAccountDrawer = ({ children }) => {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({
        resolver: zodResolver(accountSchema),
        default: {
            name: "",
            type: "CURRENT",
            balance: "",
            isDefault: false,
        }
    })
  
    const {data: newAccount,error,fn:createAccountFn,loading:createAccountLoading} = useFetch(createAccount)
    useEffect(()=>{ 
        if(newAccount && !createAccount){
            toast.success("Account created successfully");
            reset();
            setOpen(false);
        }
    },[createAccountLoading,newAccount])
    useEffect(()=>{
        if(error){
            toast.error(error.message || "Failed to create account");
        }
    },[error]);
   async function onSubmit(data){
        await createAccountFn(data);
    }
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>This action cannot be undone.</DrawerDescription>
                </DrawerHeader>
                <div className="px-4 pb-4">
                    <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-2 flex flex-col">
                            <label htmlFor="name" className="text-sm font-medium" >Account Name</label>
                            <input
                                id="name"
                                className="p-2"
                                placeholder='e.g., Main Checking'
                                {...register("name")}
                            />
                            {
                                errors.name && <p className='text-sm text-red-600'>{errors.name.message}</p>
                            }
                        </div>
                        <div className="space-y-2 flex flex-col">
                            <label htmlFor="type" className="text-sm font-medium" >Account Type</label>
                            <Select
                             onValueChange={(value) => setValue("type",value)}
                             defaultValue={watch("type")}
                            >
                                <SelectTrigger id="type">
                                    <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="CURRENT">CURRENT</SelectItem>
                                    <SelectItem value="SAVING">SAVING</SelectItem>
                                   
                                </SelectContent>
                            </Select>
                            {
                                errors.type && <p className='text-sm text-red-600'>{errors.type.message}</p>
                            }
                        </div>
                        <div className="space-y-2 flex flex-col">
                            <label htmlFor="balance" className="text-sm font-medium" >Initial Balance</label>
                            <input
                                id="balance"
                                className="p-2"
                                placeholder='e.g., Main Checking'
                                {...register("balance")}
                            />
                            {
                                errors.balance && <p className='text-sm text-red-600'>{errors.balance.message}</p>
                            }
                        </div>
                        <div className='flex items-center justify-between rounded-lg border p-3'>
                             <div className='space-y-0.5'>
                                <label
                                htmlFor='isDefault'
                                className="text-sm font-medium cursor-pointer"
                                >
                                   Set as Default
                                </label>
                                <p className="text-sm text-muted-foreground">This account will be selected by default for transactions</p>
                             </div>
                             <Switch 
                             id="isDefault"
                             onCheckedChange={(checked)=> setValue("isDefault",checked)}
                             checked={watch("isDefault")}
                             />
                        </div>
                        <div className='flex gap-4 pt-4'>
                            <DrawerClose asChild>
                                <Button type="button" variant="online" className="flex-1">Cancel</Button>
                            </DrawerClose>
                            <Button disabled={createAccountLoading} type="submit"  className="flex-1">{createAccountLoading ? <><Loader2
                            className='mr-2 h-4 w-4 animate-spin'
                            />Creating</> : "Create Account"}</Button>
                        </div>
                    </form>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default CreateAccountDrawer
