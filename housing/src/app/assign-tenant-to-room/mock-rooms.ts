import { RoomWithTenants } from "../../interfaces/room-with-tenant";
import { TENANTS } from "./mock-tenants";

export const ROOMS: RoomWithTenants[] = [
    {
        id: "1",
        roomNumber: "2048",
        totalBeds: 4,
        tenants: [
            TENANTS[0]
        ]
    },

    {
        id: "2",
        roomNumber: "20B",
        totalBeds: 2,
        tenants: [
            TENANTS[1],
        ]
    },
    {
        id: "3",
        roomNumber: "1034",
        totalBeds: 2,
        tenants: [
            TENANTS[2],
        ]
    },
    {
        id: "4",
        roomNumber: "2045",
        totalBeds: 4,
        tenants: [
            TENANTS[3],
            TENANTS[4],
            TENANTS[5],
        ]
    },
    {
        id: "4",
        roomNumber: "3045",
        totalBeds: 4,
        tenants: [
            TENANTS[6],
            TENANTS[7],
        ]
    },
]