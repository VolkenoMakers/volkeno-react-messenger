import moment from "moment";
import { IUser } from "./chatType";

export const formatDateHour = (date: any) => {
	return moment(date).format("DD/MM/YYYY à HH:mm:ss");
  };

export const truncateCaractere = (str:  any, nbr: any) => {
	return (str != null && str.length > nbr) ? str.substring(0, nbr) + "..." : str;
};

export function getUserPseudo(user?: IUser) {
	if (user) {
		return (user?.prenom?.charAt(0) +"."+ user?.nom?.charAt(0))?.toUpperCase();
	}
	return "Y.D";
  }