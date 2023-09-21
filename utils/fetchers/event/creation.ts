import { QueryFunction } from "@tanstack/react-query";

const getServiceCategories = async () => {
    const CATEGORIES = [
        {
            id: "1",
            name: "Cultural"
        },
        {
            id: "2",
            name: "Education"
        },
        {
            id: "3",
            name: "Services"
        }
    ]

    await new Promise((res: any) => setTimeout(res, 1000));
    return CATEGORIES.map(cat => ({ value: cat.id, label: cat.name }));
};

const getProjectUnitGoals: QueryFunction<SelectOption<string>[], string[], any> = async ({ queryKey }) => {
    const [_, __, searchParam] = queryKey; 
    console.log(searchParam)

    const UNITS = [
        {
            id: "1",
            name: "bags"
        },
        {
            id: "2",
            name: "donated"
        },
        {
            id: "3",
            name: "planted"
        },
        {
            id: "4",
            name: "executed"
        },
    ];

    await new Promise((res: any) => setTimeout(res, 1000));
    return UNITS.map(unit => ({ value: unit.id, label: unit.name}))
}

export { getServiceCategories, getProjectUnitGoals }