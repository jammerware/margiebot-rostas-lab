import fbAdmin from 'firebase-admin';

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

    async givePoint(userId: string) {
        await fbAdmin.firestore().collection('points').add({ userId });
    }
}
