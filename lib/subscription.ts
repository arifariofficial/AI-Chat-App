/* import { auth } from "@auth";
import prisma from "./prisma";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const session = await auth();
  if (!session?.user.id) return false;

  const userSubscription = await prisma.userPayment.findUnique({
    where: {
      userId: session.user.id,
    },
    select: {
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
      stripeSubscriptionId: true,
    },
  });

  if (!userSubscription) return false;

  const periodEndTime = userSubscription.stripeCurrentPeriodEnd?.getTime() ?? 0;

  const isValid =
    userSubscription.stripePriceId && periodEndTime + DAY_IN_MS > Date.now();

  return !!isValid;
};
 */
