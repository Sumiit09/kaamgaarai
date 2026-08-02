export const execute = async (intentData, context) => {

    const { entities, missingFields, reply } = intentData;

    if (missingFields.length > 0) {

        return {
            success: false,

            reply,

            data: {
                missingFields
            }
        };

    }

    return {

        success: true,

        reply,

        data: {

            booking: entities

        }

    };

};