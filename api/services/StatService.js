module.exports = {
  // total stars (int): [3,4,5,6,7], [8,9,10], [11,12,13,14,15]
  // ENUM: ['差评', '中评', '好评']
  getReviewClassification: ({professional, expressive, kind}) => {
    if (!professional || !expressive || !kind ) {
      return '未知'
    }
    const total = (professional + expressive + kind)
    if (total <= 7) {
      return '差评'
    } else if (total >= 11) {
      return '好评'
    } else if (total > 7 && total < 11) {
      return '中评'
    } else {
      return '未知'
    }
  }
}
