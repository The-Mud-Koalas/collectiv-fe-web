const getListOfEvents = (filters: EventFilters, page: number) => {
  const filter = {
    tags: filters.tag?.value,
    location_id: filters.location?.value,
    status: filters.status?.value,
    category_id: filters.category?.value,
    type: filters.type?.value,
  };
  console.log(filter);
};

export { getListOfEvents };
