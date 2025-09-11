import { createTokenInput, JwtPayloadData, Tokens } from '../Entities/token.entity';
import { IJwtService } from '../../domain/Entities/Service.Entities/IJwtservice';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';



export class JwtService implements IJwtService {
    private _accessSecret: string;
    private _refreshSecret: string;

    constructor() {
        this._accessSecret = process.env.JWT_SECRET || '2a3e57b2c5300794701ff6a91cfef44336165a32aca038f1c56911cd6334bb65';
        this._refreshSecret = process.env.JWT_REFRESH_SECRET || 'e996f879ea38e356dd62b3e9682daec65f382c3e09836c8dd0295e26a5a0fa71';
    }
    createAccessToken(input: createTokenInput): string {
        const { _id, username, role } = input;
        const accessToken = jwt.sign(
            { _id: _id, username: username, role: role },
            this._accessSecret,
            { expiresIn: '15m' },
        );
        return accessToken;
    }

    generateTokens(id: string, email: string, role: string): Tokens {
        const accessToken = jwt.sign(
            { _id: id, username: email, role: role },
            this._accessSecret,
            { expiresIn: '15m' },
        );
        const refreshToken = jwt.sign(
            { _id: id, username: email, role: role },
            this._refreshSecret,
            { expiresIn: '7d' },
        );
        return { accessToken, refreshToken };
    }

    verifyAccessToken(token: string): JwtPayloadData | null {
        try {
            return jwt.verify(token, this._accessSecret) as JwtPayloadData;
        } catch (error: unknown) {
            if (error instanceof TokenExpiredError) {
                return null;
            }
            if (error instanceof JsonWebTokenError) {
                return null;
            }
            throw error;
        }
    }

    verifyRefreshToken(token: string): JwtPayloadData | null {
        try {
            const decoded = jwt.verify(token, this._refreshSecret);
            return typeof decoded === 'object' && decoded !== null
                ? (decoded as JwtPayloadData)
                : null;
        } catch (err: unknown) {
            console.log(err);
            return null;
        }
    }
}