const getScore = ({ targetMean, actualMean, minReviewCount, reviewCount }) => {
  let C = targetMean || 3.5 // mean score which all score gravitates to (when votes are small)
  let r = actualMean // actual mean score of the review object
  let M = minReviewCount || 1// minimum # of votes to be considered effective
  let v = reviewCount // # of reviews
  const score = (v / (v + M)) * r + (M / (v + M)) * (C)
  return (reviewCount != 0) ? score: 0
}

module.exports = {
  getScoreOverall: ({ professional, expressive, kind, countReview }) => {
    return getScore({
      targetMean: 3.5,
      actualMean: (professional + expressive + kind) / 3,
      minReviewCount: 1,
      reviewCount: countReview
    })
  },
  getScoreHot: ({ countReview }) => {
    return countReview
  },
  getScoreRepute: ({ countNetGoodTag }) => {
    return countNetGoodTag
  },
  getScoreBirdy: ({ meanBirdy, countBird }) => {
    return getScore({
      targetMean: 3.5,
      actualMean: meanBirdy,
      minReviewCount: 1,
      reviewCount: countBird
    })
  },
  getScoreAttend: ({ meanAttend, countAttend }) => {
    return getScore({
      targetMean: 3.5,
      actualMean: meanAttend,
      minReviewCount: 1,
      reviewCount: countAttend
    })
  },
  getScoreExam: ({ meanExam, countExam }) => {
    return getScore({
      targetMean: 3.5,
      actualMean: meanExam,
      minReviewCount: 1,
      reviewCount: countExam
    })
  },
  getScoreHomework: ({ meanHomework, countHomework }) => {
    return getScore({
      targetMean: 3.5,
      actualMean: meanHomework,
      minReviewCount: 1,
      reviewCount: countHomework
    })
  },
}
