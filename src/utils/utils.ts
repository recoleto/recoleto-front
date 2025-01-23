import { router } from "expo-router";

export function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return Math.floor(distance * 100) / 100;
}

export function removeBlankSpaces(value: string): string {
    return value.replace(/\s/g, '');
}


export function redirectRole(role: string) {
    switch (role) {
        case 'EMPRESA':
            return router.push('/(app)/company/home');
        case 'ADMIN':
            // router.push('/admin');
        case 'USUARIO':
            return router.push('/(app)/user');
    }
}

export function formatUrbanSolidWasteCategory(category: string): string  | undefined {
    switch (category) {
        case 'OLEO_DE_COZINHA':
            return 'Óleo de Cozinha';
        case 'LIXO_ELETRONICO':
            return 'Lixo Eletrônico';
        case 'RESIDUOS_CONTAMINANTES':
            return 'Resíduos Contaminantes';
        case 'RESIDUOS_CORTANTES':
            return 'Resíduos Cortantes';
        case 'TODOS':
            return 'Todos';
    }
}