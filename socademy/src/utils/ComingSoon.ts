import { Alert } from "react-native"; 

export function showComingSoon(feature : string) {
    Alert.alert(`${feature}-funksjonen er ikke tilgjengelig enda, men blir det i senere versjoner :)`);
}