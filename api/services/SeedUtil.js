module.exports = {
  //replace all roman numerals with English characters
  replaceRoman: (roman) => {
    let eng = roman
    eng = eng.replace(/Ⅰ/gi, "I")
          .replace(/Ⅱ/gi, "II")
          .replace(/Ⅲ/gi, "III")
          .replace(/Ⅳ/gi, "IV")
    return eng
  },

  getRateExam: (exam) => {
    let easyVal = 0
    if (exam.examprep) easyVal++
    if (exam.openbook) easyVal++
    if (exam.oldquestion) easyVal++
    if (exam.easymark) easyVal++
    return Math.round(5 - easyVal)
  },

}
