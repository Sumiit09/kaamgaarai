export const matchService = (userService, services) => {

    if (!userService || !services.length) {
        return null;
    }

    const normalize = (text) =>
        text
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]/g, "")
            .replace(/\s+/g, "");

    const input = normalize(userService);

    // Exact Match
    for (const service of services) {

        if (normalize(service.name) === input) {
            return service;
        }

    }

    // Partial Match
    for (const service of services) {

        const db = normalize(service.name);

        if (
            db.includes(input) ||
            input.includes(db)
        ) {
            return service;
        }

    }

    return null;

};