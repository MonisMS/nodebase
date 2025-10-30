

import prisma from "@/lib/db";
import { useTRPC } from "@/trpc/client";
import { caller, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary, QueryClient, useQuery } from "@tanstack/react-query";
import { Client } from "./client";
import { getQueryClient } from "@/trpc/server";
import { Suspense } from "react";
const Page = () =>{

  //const users = await caller.getUsers()   this is how to  call server side function 
// const trpc = useTRPC();
// const { data: users} = useQuery(trpc.getUsers.queryOptions()) this is how to call client side function
  
const queryClient = getQueryClient(); 

void queryClient.prefetchQuery(trpc.getUsers.queryOptions())
return(
    <div className="text-3xl flex justify-center items-center h h-screen
     text-white bg-black">
   <HydrationBoundary state={dehydrate(queryClient)}>
    <Suspense fallback={<p>Loading.....</p>}> 

   <Client />
    </Suspense>
   </HydrationBoundary>
    </div>
  )
}

export default Page