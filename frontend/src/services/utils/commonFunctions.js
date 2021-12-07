import { format } from "date-fns"
import { Circle, Popup } from "react-leaflet";

export const numberFormatter = new Intl.NumberFormat("en-US", {maximumFractionDigits: 1})

export const dateFormatter = timestamp => format(new Date(timestamp), "dd-mm-yyyy hh:mm")

const SI_SYMBOL = ["", "K", "M", "G", "T", "P", "E"]

export const abbreviateNumber = number => {  
    // what tier? (determines SI symbol)
    var tier = Math.log10(Math.abs(number)) / 3 | 0;

    // if zero, we don't need a suffix
    if(tier == 0) return numberFormatter.format(number);

    // get suffix and determine scale
    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);

    // scale the number
    var scaled = number / scale;
    
    return numberFormatter.format(scaled) + " " + suffix
}

const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      rgb: "rgb(204, 16, 52)",
      half_op: "rgba(204, 16, 52, 0.5)",
      multiplier: 800,
    },
    recovered: {
      hex: "#7dd71d",
      rgb: "rgb(125, 215, 29)",
      half_op: "rgba(125, 215, 29, 0.5)",
      multiplier: 1200,
    },
    deaths: {
      hex: "#fb4443",
      rgb: "rgb(251, 68, 67)",
      half_op: "rgba(251, 68, 67, 0.5)",
      multiplier: 2000,
    },
  };

