import { initializeApp } from "firebase/app";
import Raxios from "../services/axiosHelper";
import { getToken, getMessaging } from "firebase/messaging";


const firebaseConfig = {
    apiKey: "AIzaSyCchWafOA9UwKogzLV53iHAGL5nq0O83RQ",
    authDomain: "epoch-e8bf1.firebaseapp.com",
    projectId: "epoch-e8bf1",
    storageBucket: "epoch-e8bf1.firebasestorage.app",
    messagingSenderId: "796262831550",
    appId: "1:796262831550:web:ae25640c7c6148bb1c15ef",
    measurementId: "G-TQFTS1DQME"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

const saveFcmToken = async (token) => {
    try {
        await Raxios.post("/save_fcm_token", {
            user_id: localStorage.getItem("user_id"),
            fcm_token: token
        });
    } catch (error) {
        console.error("Error saving FCM token:", error);
    }
};

export const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
        const token = await getToken(messaging, {
            vapidKey: "BA1SFa9Sps1SI1frr4P4KYW_bDokf_aTuauSG3v4aXBoNHa4SJbS5RJe8XjaKV34Y5IzrP3agzO-pPgEgeMajpU",
        });

        console.log("FCM Token:", token);
        await saveFcmToken(token);
        return token;
    }

    return null;
};


export default app;
