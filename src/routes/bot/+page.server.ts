// src/routes/+page.server.ts

//import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
// 1.
//const response = await prisma.post.findUnique({
    //where: {banned: false},  
  //})

// 2.

return { paid: true};
}) satisfies PageServerLoad;

