export const getTokenExpiry = () => {
    const expiry = new Date();
    expiry.setSeconds(
        expiry.getSeconds() + parseInt(process.env.TOKEN_ACCESS_EXPIRES_IN, 10),
    );

    return expiry;
};
