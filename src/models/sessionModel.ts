import { Document, model, Model, Schema } from 'mongoose';
import { ICustomError, CustomError } from '../utilities/error';

export interface ISession {
    email: string; // sent by client to initiate PKCE
    session: string; // sent by client to initiate PKCE
}

export interface IRefresh {
    token: string;
    Authorization: string;
}

export interface ISessionDocument extends ISession, Document {
    updatedAt: Date;
    createdAt: Date;
}

export interface SessionModel extends Model<ISessionDocument> {
    verify_session(email: string, session: string): Promise<boolean>;
}

const SessionSchema = new Schema<ISessionDocument, SessionModel>({
    email: {
        type: String,
    },
    session: {
        type: String,
    }
}, { timestamps: true });

SessionSchema.static('verify_session', async function verify_session(email: string, session: string) {
    
    await SESSION.findOne({session: session})
        .then((storedSession) => {
            if (!storedSession) {
                const error: ICustomError = {
                    code: 404,
                    type: 'Not Found',
                    message: 'Session does not exist',
                }; throw new CustomError(error);
            } else {
                return isMatch(storedSession.session, session);
            }
        })
        .catch(() => {
            const error: ICustomError = {
                code: 500,
                type: 'Internal Server Error',
                message: 'Something went wrong in SessionScheme.static.validate_session',
            }; throw new CustomError(error);
        });   
        
    function isMatch(input: string, challenge: string): boolean {
        return input === challenge;
    }
});


const SESSION = model<ISessionDocument, SessionModel>('Session', SessionSchema);
export default SESSION;


