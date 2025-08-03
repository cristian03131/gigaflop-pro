import jwt from 'jsonwebtoken'
export const TOKEN_SECRET = process.env.TOKEN_SECRET || "default_secret_key";
export function creatAccesToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn:"1d",
            },
            (err,token) => {
                if (err) reject(err)
                resolve(token)
            }
            );
    });
}

