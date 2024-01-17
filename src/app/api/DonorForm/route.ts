import prisma from "@/app/libs/prismadb"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest, response: NextResponse) => {
    try {
        const body = await request.json();
        const { firstName, lastName, phone, email, bloodGroup, age, address, state, city, gender } = body;

        const newDonor = await prisma.donor.create({
            data: {
                firstName,
                lastName,
                phone,
                email,
                bloodGroup,
                age,
                address,
                state,
                city,
                gender
            }
        });
        response.headers.set("Access-Control-Allow-Origin", "*");
        response.headers.set("Access-Control-Allow-Methods", "*");
        response.headers.set("Access-Control-Allow-Headers", "*");

        return NextResponse.json(newDonor);
    } catch (err) {
        response.headers.set("Access-Control-Allow-Origin", "*");
        response.headers.set("Access-Control-Allow-Methods", "*");
        response.headers.set("Access-Control-Allow-Headers", "*");

        return NextResponse.json({ message: "POST Error", err }, { status: 500 })
    }
}

export const GET = async () => {
    try {
        const Donors = await prisma.donor.findMany()
        const response = NextResponse.json({
            message: "Donors fetched successfully",
            success: true,
            Donors,
          });
          response.headers.set("Access-Control-Allow-Origin", "*");
          response.headers.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
          response.headers.set("Access-Control-Allow-Headers", "Content-Type");
      
          return response;
    } catch (err) {
        return NextResponse.json({ message: "GET Error", err }, { status: 500 })
    }
}