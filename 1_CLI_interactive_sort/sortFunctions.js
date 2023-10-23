const getSortedAlphabetically = (arr) => {
    return arr
         .filter((item) => !/^[+-]?\d+(\.\d+)?$/.test(item))
         .sort((a, b) => a.localeCompare(b))
 }
 const getNumbersFromLesserToGreater = (arr) => {
     return arr
         .filter((item) => Number(item))
         .sort((a, b) => a - b)
         .map(item => +item)
         .join(" ")
 }
 const getNumbersFromBiggerToSmaller = (arr) => {
     return arr
         .filter((item) => Number(item))
         .sort((a, b) => b - a)
         .map(item => +item)
         .join(" ")
 }
 const getWordsAscendingByNumbersOfLetter = (arr) => {
     return arr
         .sort((a, b) => a.length - b.length)
         .join(" ")
 }
 const getUniqueWords = (arr) => {
    return Array.from(new Set(arr))
         .filter(item => !Number(item))
 }
 const getUniqueValuesOfWordsAndNumbers = (arr) => {
     return Array.from(new Set(arr))
 }

 export default {
    getSortedAlphabetically,
    getNumbersFromLesserToGreater,
    getNumbersFromBiggerToSmaller,
    getWordsAscendingByNumbersOfLetter,
    getUniqueWords,
    getUniqueValuesOfWordsAndNumbers
 }