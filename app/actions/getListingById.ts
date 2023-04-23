import prisma from "@/app/libs/prismadb";

interface ListingByIdParamProps {
    listingId?: string
}

export default async function getListingById(
    params: ListingByIdParamProps
) {
    try {
        const { listingId } = params;

        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                user: true
            }
        });

        if (!listing) {
            return null;
        }

        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            user: {
                ...listing.user,
                createAt: listing.user.createAt.toISOString(),
                updatedAt: listing.user.updatedAt.toISOString(),
                emailVerified:
                    listing.user.emailVerified?.toISOString() || null,
            }
        }

    } catch (error: any) {
        throw new Error(error);
    }
}