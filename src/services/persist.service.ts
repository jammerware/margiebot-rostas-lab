import fbAdmin from 'firebase-admin';
import { GivePoint } from '../models/give-point';

export class PersistService {
    constructor() {
        this.init();
    }

    init() {
        const serviceAccount = require("../../service-account-key.json");

        fbAdmin.initializeApp({
            credential: fbAdmin.credential.cert(serviceAccount),
            databaseURL: "https://margiebot-rostas-lab.firebaseio.com"
        });
    }

    async getPoints(): Promise<{ userId: string, points: number }[]> {
        const now = new Date();
        const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const firstOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1);

        const pointQuery = await fbAdmin
            .firestore()
            .collection('points')
            .where('givenOn', '>=', fbAdmin.firestore.Timestamp.fromDate(firstOfMonth))
            .where('givenOn', '<', fbAdmin.firestore.Timestamp.fromDate(firstOfNextMonth))
            .get();

        const retVal: { userId: string, points: number }[] = [];

        for (const doc of pointQuery.docs) {
            const usersPoints = retVal.find(up => up.userId === doc.data().userId);

            if (usersPoints) {
                usersPoints.points++;
            }
            else {
                retVal.push({
                    userId: doc.data().userId,
                    points: 1
                });
            }
        }

        return retVal;
    }

    async givePoint(args: GivePoint) {
        const doc: any = Object.assign({}, args);
        doc.givenOn = fbAdmin.firestore.Timestamp.now();
        if (!doc.reason) delete doc.reason;

        await fbAdmin
            .firestore()
            .collection('points')
            .add(doc);
    }
}
