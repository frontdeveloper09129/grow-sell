type Product = {
    id: number;
    name: string;
    types_of_plants: string;
    price: number;
    description: string | null;
    stock_quantity: number;
    image_url: string | null;
    care_level: string | null;
    light_requirement: string | null;
    water_frequency: string | null;
    mature_size: string | null;
    is_available: boolean;
    created_at?: string;
    updated_at?: string;
};

export const products: Product[] = [
    {
        id: 1,
        name: "Snake Plant",
        types_of_plants: "Indoor Plant",
        price: 150.00,
        description: "A hardy indoor plant with upright green leaves.",
        stock_quantity: 20,
        image_url: null,
        care_level: "Easy",
        light_requirement: "Low to indirect light",
        water_frequency: "Every 2–3 weeks",
        mature_size: "30–120 cm",
        is_available: true,
    },
    {
        id: 2,
        name: "Monstera Deliciosa",
        types_of_plants: "Tropical Plant",
        price: 350.00,
        description: "A tropical plant with large, split leaves.",
        stock_quantity: 10,
        image_url: null,
        care_level: "Moderate",
        light_requirement: "Bright indirect light",
        water_frequency: "When the top soil dries",
        mature_size: "1–3 m indoors",
        is_available: true,
    },
    {
        id: 3,
        name: "Peace Lily",
        types_of_plants: "Flowering Plant",
        price: 200.00,
        description: "A leafy plant with elegant white flowers.",
        stock_quantity: 15,
        image_url: null,
        care_level: "Moderate",
        light_requirement: "Medium to bright indirect light",
        water_frequency: "When the top soil starts drying",
        mature_size: "30–90 cm",
        is_available: true,
    },
    {
        id: 4,
        name: "Aloe Vera",
        types_of_plants: "Succulent",
        price: 120.00,
        description: "A succulent with thick, fleshy green leaves.",
        stock_quantity: 25,
        image_url: null,
        care_level: "Easy",
        light_requirement: "Bright light",
        water_frequency: "Every 2–3 weeks, depending on soil dryness",
        mature_size: "30–60 cm",
        is_available: true,
    },
    {
        id: 5,
        name: "Golden Pothos",
        types_of_plants: "Hanging Plant",
        price: 180.00,
        description: "A trailing plant with green and golden leaves.",
        stock_quantity: 12,
        image_url: null,
        care_level: "Easy",
        light_requirement: "Low to bright indirect light",
        water_frequency: "When the top soil dries",
        mature_size: "Long trailing vines",
        is_available: true,
    },
];