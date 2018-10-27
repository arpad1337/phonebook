import { Profile } from "../models/profile";

export const ProfileUtils = {
    generateRandomColor: () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },
    validate: (model: Profile) => {
        return !(model.firstName.trim() == '' ||
        model.lastName.trim() == '' ||
        model.phoneNumber.trim() == '');
    }
}