"use client"
import { Button } from '@/components/ui/button'
import { LayoutGrid, Search, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import GlobalApi from '../_utils/GlobalApi'

function Header() {
  const [CategoryList, setCategoryList] = useState([]);
  
  useEffect(() => {
    getCategoryList();
  }, [])
  
  const getCategoryList = () => {
    GlobalApi.getCategory().then(resp => {
      setCategoryList(resp.data.data);
    })
  }
  return (
    <div className='p-5 shadow-lg flex justify-between'>
      <div className='flex items-center gap-8'>
        <Image src='/logo.png' alt='logo' width={100} height={100} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2 className='hidden md:flex gap-2 items-center h-10 border rounded-full p-2 px-10 bg-slate-100 cursor-pointer'>
              <LayoutGrid className='h-5 w-5' />
              Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Fresh Produce</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {CategoryList.map((category, index) => (
              <DropdownMenuItem key={index} className="flex gap-2 items-center">
                <Image src={
                  process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                  category?.attributes?.icon?.data?.attributes?.url}
                  unoptimized={true}
                  alt='icon'
                  width={20}
                  height={20}
                />
                <h2>{category?.attributes?.name}</h2>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className='md:flex gap-3 items-center h-10 border rounded-full p-2 px-5 hidden'>
          <Search className='mt-1' />
          <input
            type='text'
            placeholder='Search'
            className='outline-none'
          />
        </div>
      </div>
      <div className='flex gap-5 items-center'>
        <h2 className='flex gap-1 items-center text-lg'>
          <ShoppingCart className='ml-5'/>0
        </h2>
        <Button>Login</Button>
      </div>
    </div>
  )
}

export default Header
