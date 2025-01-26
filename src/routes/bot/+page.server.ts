// src/routes/+page.server.ts

import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
// 1.
const response = await prisma.post.findFirst({
    where: {banned: false},  
  })

// 2.
return { paid: !!response };
}) satisfies PageServerLoad;

