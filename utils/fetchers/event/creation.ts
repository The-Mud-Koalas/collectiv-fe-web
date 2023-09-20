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
}

export { getServiceCategories }