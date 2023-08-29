const Intl = require('intl');
const Lookup = require('../models/lookup');
const CityContext = require('../models/city');
const StateContext = require('../models/state');
const CountryContext = require('../models/country');

/**
 * This function is used to calculate offset of data on pagination.
 * @param {number} destinationPage - next page that will be displayed.
 * @param {number} totalRow - the number of data per page.
 * @returns {number} offset
 */
exports.calculateOffset = (destinationPage, totalRow) => (destinationPage - 1) * totalRow;
/**
 * This function is used to format date
 * @param {date} date - input date that will be formatted.
 * @param {string} format - digit, short or long, 3 choice of formating.
 * @returns {string} formatted - the result in string.
 */
let dateFormat = (date, format) => {
    let options = {day: 'numeric', month: 'long', year: 'numeric'};
    switch(format){
        case 'digit': //30-06-2019
            options = {day: '2-digit', month: '2-digit', year: '2-digit'};
            break;
        case 'short': //30 Jun 2019
            options = {day: 'numeric', month: 'short', year: 'numeric'};
            break;
        case 'long': //30 Juni 2019
            options = {day: 'numeric', month: 'long', year: 'numeric'};
            break;
        default:
            options = {day: 'numeric', month: 'long', year: 'numeric'};
            break;            
    }
    let indonesia = new Intl.DateTimeFormat('id-ID', options);
    return indonesia.format(date);
}
exports.dateFormat = dateFormat;
/**
 * This function is used to format money into formatted string with rupiah currency.
 * @param {number} money - money input.
 * @returns {string} formatted - the result in string.
 */
exports.rupiahFormat = money => {
    let result = 'Free';
    if (money > 0){
        result = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(money);    
    }
    return result;
}
/**
 * This function is used format a word and in case the text is longer than the limit, it will replace the rest of the text with ...
 * @param {string} text - complete text.
 * @param {number} maxLength - maximum length it tolerates.
 * @returns {string} formatted - the result in string.
 */
exports.overflowText = (text, maxLength) => {
    return (text.length <= maxLength) ? text : `${text.substring(0, maxLength - 3)}...`
}
/**
 * This function is used to find the complete text of a lookup code.
 * @param {string} name - name/code/value you want find the text.
 * @param {string} value - jobTitle/ title/ gender/ employeeType/ majorType/ educationLevel/ educationHistoryLevel/ activityType/ paymentMethod/ paymentStatus/ grade
 * @returns {string} text
 */
exports.getLookUpText = (name, value) => {
    let options = Lookup[name];
    for(let option of options){
        if(option.value === value){
            return option.text;
        }
    }
}
/**
 * This function is used to find a country name with country id.
 * @param {number} countryID - PK of the country.
 * @returns {string} country name.
 */
let getCountryName = async(countryID) => {
    let country = await CountryContext.findByPk(countryID);
    return country.name;    
}
exports.getCountryName = getCountryName;
/**
 * This function is used to concate birth date and birth location and format it to become birth information
 * @param {date} date - birth date
 * @param {number} cityID - id of the birth city.
 */
exports.getBirthInformation = async (date, cityID) => {
    let formattedDate = dateFormat(date, 'long');
    let city = await CityContext.findByPk(cityID);
    let cityName = city.name;
    let state = await StateContext.findByPk(city.state_id);
    let stateName = state.name;
    let countryName = await getCountryName(state.country_id);
    return `${formattedDate}, ${cityName} - ${stateName} (${countryName})`;
}