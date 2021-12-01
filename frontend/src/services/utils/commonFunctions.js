import { format } from "date-fns"

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