const capitalize = (text: string) => text.length === 0 ? "" : `${text.at(0)?.toUpperCase()}${text.substring(1).toLowerCase()}`;

export { capitalize }